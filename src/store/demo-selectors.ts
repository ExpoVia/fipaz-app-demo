

import type { DemoStore } from "@/types/demo";

// ─── Selectores primitivos ────────────────────────────────────────────────────

export const selectActiveTab = (state: DemoStore) => state.activeTab;
export const selectPoints = (state: DemoStore) => state.points;
export const selectLevel = (state: DemoStore) => state.level;
export const selectSelectedStandId = (state: DemoStore) =>
  state.selectedStandId;
export const selectSelectedZoneId = (state: DemoStore) => state.selectedZoneId;
export const selectNfcStage = (state: DemoStore) => state.nfcStage;
export const selectHasHydrated = (state: DemoStore) => state.hasHydrated;

// ─── Selectores de arrays (referencias estables por identidad) ─────────────────

export const selectVisitedStandIds = (state: DemoStore) =>
  state.visitedStandIds;
export const selectFavoriteStandIds = (state: DemoStore) =>
  state.favoriteStandIds;
export const selectRecentVisits = (state: DemoStore) => state.recentVisits;
export const selectLastKnownLocation = (state: DemoStore) =>
  state.lastKnownLocation;

// ─── Selectores de acciones ───────────────────────────────────────────────────

export const selectSetActiveTab = (state: DemoStore) => state.setActiveTab;
export const selectSelectStand = (state: DemoStore) => state.selectStand;
export const selectSelectZone = (state: DemoStore) => state.selectZone;
export const selectToggleFavorite = (state: DemoStore) => state.toggleFavorite;
export const selectStartNfcScan = (state: DemoStore) => state.startNfcScan;
export const selectMarkNfcDetected = (state: DemoStore) =>
  state.markNfcDetected;
export const selectBeginNfcConfirmation = (state: DemoStore) =>
  state.beginNfcConfirmation;
export const selectConfirmVisit = (state: DemoStore) => state.confirmVisit;
export const selectFailNfcScan = (state: DemoStore) => state.failNfcScan;
export const selectResetNfcFlow = (state: DemoStore) => state.resetNfcFlow;
export const selectResetDemo = (state: DemoStore) => state.resetDemo;
