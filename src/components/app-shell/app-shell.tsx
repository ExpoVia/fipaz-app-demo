"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  DEFAULT_DEMO_TAB,
  DEMO_NAVIGATION,
  getDemoNavigationItem,
  isDemoTab,
  type DemoTab,
} from "@/config/navigation";

import {
  AppShellProvider,
  type AppShellContextValue,
} from "./app-shell-context";
import { BottomNavigation } from "./bottom-navigation";
import { MobileViewport } from "./mobile-viewport";
import { TopBar } from "./top-bar";

export type AppShellScreens = Partial<Record<DemoTab, ReactNode>>;

interface AppShellProps {
  screens: AppShellScreens;
  initialTab?: DemoTab;
  onTabChange?: (tab: DemoTab) => void;
}

interface DismissableEntry {
  id: string;
  onDismiss: () => void;
}

const HISTORY_KEY = "__expoviaDemo";

function urlForTab(tab: DemoTab) {
  const url = new URL(window.location.href);
  url.searchParams.set("tab", tab);
  return `${url.pathname}${url.search}${url.hash}`;
}

export function AppShell({
  screens,
  initialTab = DEFAULT_DEMO_TAB,
  onTabChange,
}: AppShellProps) {
  const [activeTab, setActiveTab] = useState<DemoTab>(initialTab);
  const activeTabRef = useRef(activeTab);
  const dismissablesRef = useRef<DismissableEntry[]>([]);

  const commitTab = useCallback(
    (tab: DemoTab) => {
      activeTabRef.current = tab;
      setActiveTab(tab);
      onTabChange?.(tab);
    },
    [onTabChange],
  );

  const navigate = useCallback(
    (tab: DemoTab) => {
      if (tab === activeTabRef.current) {
        return;
      }

      window.history.pushState(
        { ...window.history.state, [HISTORY_KEY]: true, tab },
        "",
        urlForTab(tab),
      );
      commitTab(tab);
    },
    [commitTab],
  );

  const registerDismissable = useCallback(
    (id: string, onDismiss: () => void) => {
      dismissablesRef.current = [
        ...dismissablesRef.current.filter((entry) => entry.id !== id),
        { id, onDismiss },
      ];

      return () => {
        dismissablesRef.current = dismissablesRef.current.filter(
          (entry) => entry.id !== id,
        );
      };
    },
    [],
  );

  useEffect(() => {
    window.history.replaceState(
      {
        ...window.history.state,
        [HISTORY_KEY]: true,
        tab: activeTabRef.current,
      },
      "",
      urlForTab(activeTabRef.current),
    );
  }, []);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const topLayer = dismissablesRef.current.at(-1);

      if (topLayer) {
        topLayer.onDismiss();
        window.history.pushState(
          {
            ...window.history.state,
            [HISTORY_KEY]: true,
            tab: activeTabRef.current,
          },
          "",
          urlForTab(activeTabRef.current),
        );
        return;
      }

      const previousTab = event.state?.[HISTORY_KEY]
        ? event.state.tab
        : null;

      if (isDemoTab(previousTab)) {
        commitTab(previousTab);
        return;
      }

      window.history.pushState(
        {
          ...window.history.state,
          [HISTORY_KEY]: true,
          tab: activeTabRef.current,
        },
        "",
        urlForTab(activeTabRef.current),
      );
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [commitTab]);

  const activeNavigationItem = getDemoNavigationItem(activeTab);
  const contextValue = useMemo<AppShellContextValue>(
    () => ({ activeTab, navigate, registerDismissable }),
    [activeTab, navigate, registerDismissable],
  );

  return (
    <AppShellProvider value={contextValue}>
      <MobileViewport>
        <div className="flex min-h-0 flex-1 flex-col bg-[var(--expo-bg)]">
          <TopBar
            title={activeNavigationItem.title}
            description={activeNavigationItem.description}
          />

          <main
            id="demo-content"
            className="app-screen-stack"
            tabIndex={-1}
          >
            {DEMO_NAVIGATION.map((item) => (
              <section
                key={item.id}
                id={`demo-panel-${item.id}`}
                className="min-h-full"
                role="tabpanel"
                aria-label={item.label}
                hidden={activeTab !== item.id}
              >
                {screens[item.id] ?? (
                  <div className="grid min-h-full place-items-center p-6 text-center">
                    <p className="max-w-xs text-sm font-semibold text-slate-600">
                      El módulo {item.label} está listo para recibir el componente
                      de su responsable.
                    </p>
                  </div>
                )}
              </section>
            ))}
          </main>

          <BottomNavigation activeTab={activeTab} onNavigate={navigate} />
        </div>
      </MobileViewport>
    </AppShellProvider>
  );
}
