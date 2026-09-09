"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { MISSIONS, INITIAL_VISIBLE_MISSION_IDS } from "@/data/missions";
import type { DemoState, DemoVisit } from "@/lib/types";

// ─── State version — bump if shape changes to avoid hydration errors ────────
const STATE_VERSION = 1;

// ─── Initial state ──────────────────────────────────────────────────────────

function buildInitialState(): DemoState {
  return {
    points: 150,
    level: 2,
    visitedStandIds: [],
    favoriteStandIds: [],
    /**
     * Seed: "Ruta tecnológica" starts at 2/5 so the NFC scan demo shows
     * progress going 2→3.
     */
    // Seed ruta-tecnologica at 2/3 — one more simulated visit completes it in the demo
    missionProgress: { "ruta-tecnologica": 2 },
    specialActionsDone: [],
    unlockedMissionIds: [],
    recentVisits: [],
    redeemedRewardIds: [],
    nfcStage: "idle",
    selectedStandId: null,
  };
}

// ─── Store shape ────────────────────────────────────────────────────────────

interface DemoStore extends DemoState {
  // ── Stand visits ──────────────────────────────────────────────────────────
  visitStand: (standId: string, standName: string) => void;
  toggleFavorite: (standId: string) => void;

  // ── Missions ──────────────────────────────────────────────────────────────
  completeMissionSpecialAction: (missionId: string) => void;
  /** Returns current progress count for a mission */
  getMissionProgress: (missionId: string) => number;
  /** Returns list of visible mission ids (8 initial + any unlocked) */
  getVisibleMissionIds: () => string[];

  // ── Rewards ───────────────────────────────────────────────────────────────
  redeemReward: (rewardId: string, cost: number) => string | null;

  // ── NFC simulation ────────────────────────────────────────────────────────
  setNfcStage: (stage: DemoState["nfcStage"]) => void;

  // ── Reset ─────────────────────────────────────────────────────────────────
  resetDemo: () => void;
}

// ─── Helper: compute points for visiting a stand ────────────────────────────

const NFC_VISIT_POINTS = 50;

// ─── Helper: check if a mission just completed and unlock dependents ─────────

function checkAndUnlock(
  missionId: string,
  progress: number,
  state: DemoState,
): string[] {
  const mission = MISSIONS.find((m) => m.id === missionId);
  if (!mission) return state.unlockedMissionIds;

  const isComplete =
    progress >= mission.target ||
    (mission.specialAction && state.specialActionsDone.includes(missionId));

  if (!isComplete) return state.unlockedMissionIds;

  const toUnlock = MISSIONS.filter(
    (m) =>
      m.unlockedBy === missionId &&
      !state.unlockedMissionIds.includes(m.id),
  ).map((m) => m.id);

  return [...state.unlockedMissionIds, ...toUnlock];
}

// ─── Store ───────────────────────────────────────────────────────────────────

export const useDemoStore = create<DemoStore>()(
  persist(
    (set, get) => ({
      ...buildInitialState(),

      // ── Stand visits ────────────────────────────────────────────────────

      visitStand(standId, standName) {
        const state = get();

        if (state.visitedStandIds.includes(standId)) return;

        const newVisit: DemoVisit = {
          standId,
          standName,
          timestamp: Date.now(),
        };

        // Update mission progress: any mission whose standIds include this stand
        const newProgress = { ...state.missionProgress };
        let newUnlocked = [...state.unlockedMissionIds];

        MISSIONS.forEach((mission) => {
          if (!mission.standIds?.includes(standId)) return;
          const prev = newProgress[mission.id] ?? 0;
          const next = Math.min(prev + 1, mission.target);
          newProgress[mission.id] = next;
          newUnlocked = checkAndUnlock(mission.id, next, {
            ...state,
            unlockedMissionIds: newUnlocked,
          });
        });

        // Also update "explorador-expovia" (any stand)
        const explorerPrev = newProgress["explorador-expovia"] ?? 0;
        const explorerNext = Math.min(
          explorerPrev + 1,
          MISSIONS.find((m) => m.id === "explorador-expovia")?.target ?? 5,
        );
        newProgress["explorador-expovia"] = explorerNext;
        newUnlocked = checkAndUnlock("explorador-expovia", explorerNext, {
          ...state,
          unlockedMissionIds: newUnlocked,
        });

        // "primer-contacto" — first NFC visit
        if (state.visitedStandIds.length === 0) {
          newProgress["primer-contacto"] = 1;
          newUnlocked = checkAndUnlock("primer-contacto", 1, {
            ...state,
            unlockedMissionIds: newUnlocked,
          });
        }

        set({
          visitedStandIds: [...state.visitedStandIds, standId],
          points: state.points + NFC_VISIT_POINTS,
          missionProgress: newProgress,
          unlockedMissionIds: newUnlocked,
          recentVisits: [newVisit, ...state.recentVisits].slice(0, 20),
        });
      },

      toggleFavorite(standId) {
        const { favoriteStandIds } = get();
        set({
          favoriteStandIds: favoriteStandIds.includes(standId)
            ? favoriteStandIds.filter((id) => id !== standId)
            : [...favoriteStandIds, standId],
        });
      },

      // ── Missions ─────────────────────────────────────────────────────────

      completeMissionSpecialAction(missionId) {
        const state = get();
        if (state.specialActionsDone.includes(missionId)) return;

        const mission = MISSIONS.find((m) => m.id === missionId);
        if (!mission) return;

        const newSpecialDone = [...state.specialActionsDone, missionId];
        const newProgress = { ...state.missionProgress, [missionId]: mission.target };
        const newUnlocked = checkAndUnlock(missionId, mission.target, {
          ...state,
          specialActionsDone: newSpecialDone,
        });

        set({
          specialActionsDone: newSpecialDone,
          missionProgress: newProgress,
          unlockedMissionIds: newUnlocked,
          points: state.points + mission.rewardPoints,
        });
      },

      getMissionProgress(missionId) {
        return get().missionProgress[missionId] ?? 0;
      },

      getVisibleMissionIds() {
        const { unlockedMissionIds } = get();
        return [...INITIAL_VISIBLE_MISSION_IDS, ...unlockedMissionIds];
      },

      // ── Rewards ───────────────────────────────────────────────────────────

      redeemReward(rewardId, cost) {
        const state = get();
        if (state.points < cost) return null;
        if (state.redeemedRewardIds.includes(rewardId)) return null;

        // Generate a short demo code
        const code = `DEMO-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

        set({
          points: state.points - cost,
          redeemedRewardIds: [...state.redeemedRewardIds, rewardId],
        });

        return code;
      },

      // ── NFC ──────────────────────────────────────────────────────────────

      setNfcStage(stage) {
        set({ nfcStage: stage });
      },

      // ── Reset ─────────────────────────────────────────────────────────────

      resetDemo() {
        set(buildInitialState());
      },
    }),
    {
      name: "expovia-demo-v" + STATE_VERSION,
      version: STATE_VERSION,
    },
  ),
);
