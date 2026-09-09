

"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { standsById } from "@/data/demo-data";
import {
  getLevelForPoints,
  resolveTargetStand,
} from "@/lib/demo-domain";
import {
  clearPersistedState,
  cloneInitialPersistedState,
  parsePersistedState,
  safeDemoStorage,
  STORAGE_KEY,
  VISIT_POINTS,
} from "@/lib/demo-storage";
import type { DemoTab } from "@/config/navigation";
import type { DemoState, DemoStore, NfcStage, PersistedDemoStateV1, Visit } from "@/types/demo";

// ─── Estado inicial efímero ───────────────────────────────────────────────────

const INITIAL_EPHEMERAL = {
  activeTab: "home" as DemoTab,
  nfcStage: "idle" as NfcStage,
  hasHydrated: false,
} satisfies Pick<DemoState, "activeTab" | "nfcStage" | "hasHydrated">;

// ─── Estado inicial completo ──────────────────────────────────────────────────

const INITIAL_STATE: DemoState = {
  ...cloneInitialPersistedState(),
  ...INITIAL_EPHEMERAL,
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useDemoStore = create<DemoStore>()(
  persist(
    (set, get) => ({
      // ── Estado inicial ───────────────────────────────────────────────────────
      ...INITIAL_STATE,

      setHasHydrated: () => set({ hasHydrated: true }),

      // ── Navegación ───────────────────────────────────────────────────────────
      setActiveTab: (tab) => set({ activeTab: tab }),

      // ── Selección ────────────────────────────────────────────────────────────
      selectStand: (standId) => set({ selectedStandId: standId }),
      selectZone: (zoneId) => set({ selectedZoneId: zoneId }),

      toggleFavorite: (standId) =>
        set((state) => {
          if (!standsById.has(standId)) return {};

          const isFav = state.favoriteStandIds.includes(standId);
          return {
            favoriteStandIds: isFav
              ? state.favoriteStandIds.filter((id) => id !== standId)
              : [...state.favoriteStandIds, standId],
          };
        }),

      // ── Flujo NFC ─────────────────────────────────────────────────────────────

      startNfcScan: (standId) => {
        const state = get();

        if (standId && !standsById.has(standId)) {
          set({ nfcStage: "error", selectedStandId: null });
          return;
        }

        // Un escaneo genérico no debe quedar atrapado en el último stand ya
        // visitado. Los duplicados siguen siendo demostrables pasando su ID
        // explícitamente desde la ficha del stand.
        const reusableSelectedStandId =
          state.selectedStandId &&
          !state.visitedStandIds.includes(state.selectedStandId)
            ? state.selectedStandId
            : null;

        const target = resolveTargetStand(
          standId,
          reusableSelectedStandId,
          state.visitedStandIds
        );

        if (!target) {
          set({ nfcStage: "error", selectedStandId: null });
          return;
        }

        set({
          nfcStage: "searching",
          selectedStandId: target.id,
        });
      },

      markNfcDetected: () =>
        set((state) => {
          if (state.nfcStage !== "searching") return {};
          return { nfcStage: "detected" };
        }),

      beginNfcConfirmation: () =>
        set((state) => {
          if (state.nfcStage !== "detected") return {};
          return { nfcStage: "confirming" };
        }),

      /**
       * Transición atómica de confirmación de visita.
       * Toda la lógica ocurre dentro de un único set() para garantizar
       * consistencia aunque se llame dos veces seguidas (doble toque).
       */
      confirmVisit: (standId) =>
        set((state) => {
          const stand = standsById.get(standId);

          // Stand inválido → error sin mutación durable
          if (!stand) {
            return { nfcStage: "error" };
          }

          // Visita duplicada → sin puntos
          if (state.visitedStandIds.includes(standId)) {
            return { nfcStage: "duplicate" };
          }

          const pointsAwarded: typeof VISIT_POINTS = stand.points;
          const nextPoints = state.points + pointsAwarded;

          const visit: Visit = {
            id: `visit-${standId}-${Date.now()}`,
            standId,
            visitedAt: new Date().toISOString(),
            pointsAwarded,
          };

          return {
            visitedStandIds: [...state.visitedStandIds, standId],
            recentVisits: [visit, ...state.recentVisits].slice(0, 10),
            points: nextPoints,
            level: getLevelForPoints(nextPoints),
            selectedStandId: standId,
            nfcStage: "success",
          };
        }),

      failNfcScan: () => set({ nfcStage: "error" }),

      resetNfcFlow: () => set({ nfcStage: "idle" }),

      // ── Reinicio de demo ──────────────────────────────────────────────────────

      resetDemo: () => {
        set({
          ...cloneInitialPersistedState(),
          ...INITIAL_EPHEMERAL,
          // Forzar hidratación completada para evitar parpadeo post-reset
          hasHydrated: true,
        });
        // `set` activa el middleware persist; limpiar después garantiza que la
        // clave quede eliminada al finalizar el reinicio.
        clearPersistedState();
      },
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      // Next.js prerenderiza Client Components en el servidor. La hidratación
      // se inicia desde las pantallas cliente para evitar HTML divergente.
      skipHydration: true,
      storage: createJSONStorage(() => safeDemoStorage),

      /**
       * Solo persiste estado durable.
       * Excluidos: activeTab, nfcStage, hasHydrated, todas las acciones.
       */
      partialize: (state): PersistedDemoStateV1 => ({
        points: state.points,
        level: state.level,
        selectedStandId: state.selectedStandId,
        selectedZoneId: state.selectedZoneId,
        visitedStandIds: state.visitedStandIds,
        favoriteStandIds: state.favoriteStandIds,
        recentVisits: state.recentVisits,
        lastKnownLocation: state.lastKnownLocation,
      }),

      /** Valida y normaliza el estado antes de incorporarlo al store. */
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...parsePersistedState(persistedState),
      }),

      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated();
        }
      },
    }
  )
);
