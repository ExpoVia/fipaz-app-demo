"use client";

import { type AppShellScreens } from "@/components/app-shell";
import { useAppShell } from "@/components/app-shell/app-shell-context";
import { MissionsScreen } from "@/features/missions/MissionsScreen";
import { RewardsScreen } from "@/features/rewards/RewardsScreen";

/**
 * Client-side screens that require interactivity and Zustand store access.
 * Exported as a partial screens object that gets merged in demo/page.tsx.
 */
export function useDemoClientScreens(): Partial<AppShellScreens> {
  const { navigate } = useAppShell();

  return {
    missions: <MissionsScreen onNavigateToMap={() => navigate("map")} />,
    profile: <RewardsScreen />,
  };
}
