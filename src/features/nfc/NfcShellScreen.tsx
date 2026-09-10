"use client";

import { useEffect, useRef } from "react";
import { useAppShell } from "@/components/app-shell";
import { useDemoStore } from "@/store/demo-store";
import {
  selectResetNfcFlow,
  selectSetActiveTab,
} from "@/store/demo-selectors";
import type { DemoTab } from "@/config/navigation";
import { NfcScreen } from "./NfcScreen";

/**
 * Adaptador de integración para el shell de Omar.
 * Sincroniza ambas navegaciones y cancela el flujo si NFC queda oculto.
 */
export function NfcShellScreen() {
  const { activeTab, navigate } = useAppShell();
  const setActiveTab = useDemoStore(selectSetActiveTab);
  const resetNfcFlow = useDemoStore(selectResetNfcFlow);
  const previousTabRef = useRef<DemoTab>(activeTab);

  useEffect(() => {
    const previousTab = previousTabRef.current;
    setActiveTab(activeTab);

    if (previousTab === "scan" && activeTab !== "scan") {
      resetNfcFlow();
    }

    previousTabRef.current = activeTab;
  }, [activeTab, resetNfcFlow, setActiveTab]);

  return <NfcScreen onNavigate={navigate} />;
}
