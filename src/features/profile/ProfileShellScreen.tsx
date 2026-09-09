"use client";

import { useAppShell } from "@/components/app-shell";
import { ProfileScreen } from "./ProfileScreen";

/** Adaptador para montar Perfil dentro del AppShell sin acoplar su UI. */
export function ProfileShellScreen() {
  const { navigate } = useAppShell();

  return <ProfileScreen onNavigate={navigate} />;
}
