"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

import type { DemoTab } from "@/config/navigation";

export interface AppShellContextValue {
  activeTab: DemoTab;
  navigate: (tab: DemoTab) => void;
  registerDismissable: (id: string, onDismiss: () => void) => () => void;
}

const AppShellContext = createContext<AppShellContextValue | null>(null);

interface AppShellProviderProps {
  value: AppShellContextValue;
  children: ReactNode;
}

export function AppShellProvider({ value, children }: AppShellProviderProps) {
  return (
    <AppShellContext.Provider value={value}>
      {children}
    </AppShellContext.Provider>
  );
}

export function useAppShell(): AppShellContextValue {
  const context = useContext(AppShellContext);

  if (!context) {
    throw new Error("useAppShell debe utilizarse dentro de AppShell.");
  }

  return context;
}

export function useAppShellDismissable(
  id: string,
  isOpen: boolean,
  onDismiss: () => void,
) {
  const { registerDismissable } = useAppShell();
  const onDismissRef = useRef(onDismiss);

  useEffect(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    return registerDismissable(id, () => onDismissRef.current());
  }, [id, isOpen, registerDismissable]);
}
