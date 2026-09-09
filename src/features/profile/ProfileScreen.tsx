"use client";

import { useEffect } from "react";
import { useDemoStore } from "@/store/demo-store";
import {
  selectFavoriteStandIds,
  selectHasHydrated,
  selectLevel,
  selectPoints,
  selectRecentVisits,
  selectResetDemo,
  selectVisitedStandIds,
} from "@/store/demo-selectors";
import { getStandById } from "@/lib/demo-domain";
import { ProfileStats } from "./components/ProfileStats";
import { RecentVisits } from "./components/RecentVisits";
import { Heart, History, RotateCcw, User } from "lucide-react";
import type { FeatureScreenProps } from "@/config/navigation";

export function ProfileScreen({ onNavigate }: FeatureScreenProps) {
  // ── Store ──────────────────────────────────────────────────────────────────
  const hasHydrated = useDemoStore(selectHasHydrated);
  const points = useDemoStore(selectPoints);
  const level = useDemoStore(selectLevel);
  const visitedStandIds = useDemoStore(selectVisitedStandIds);
  const favoriteStandIds = useDemoStore(selectFavoriteStandIds);
  const recentVisits = useDemoStore(selectRecentVisits);
  const resetDemo = useDemoStore(selectResetDemo);

  useEffect(() => {
    if (!useDemoStore.persist.hasHydrated()) {
      void useDemoStore.persist.rehydrate();
    }
  }, []);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleReset = () => {
    const confirmed = window.confirm(
      "¿Reiniciar la demostración?\n\nSe borrará tu progreso y se restaurará el estado inicial."
    );
    if (!confirmed) return;
    resetDemo();
    onNavigate?.("home");
  };

  // ── Carga inicial ──────────────────────────────────────────────────────────

  if (!hasHydrated) {
    return (
      <div className="flex items-center justify-center py-16">
        <span className="text-sm text-slate-400">Cargando perfil&hellip;</span>
      </div>
    );
  }

  // ── Favoritos ──────────────────────────────────────────────────────────────

  const favoriteStands = favoriteStandIds
    .map((id) => getStandById(id))
    .filter(Boolean);

  return (
    <section className="flex flex-col gap-5 px-4 py-6">
      {/* Encabezado */}
      <header className="flex flex-col items-center gap-2 text-center">
        {/* Avatar genérico */}
        <div
          className="flex items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--expo-blue),var(--expo-lilac))] text-white shadow-md"
          style={{ width: 72, height: 72 }}
          aria-hidden="true"
        >
          <User size={36} strokeWidth={1.5} />
        </div>

        {/* Nombre */}
        <h1 className="text-lg font-black text-[var(--expo-navy)]">
          Explorador ExpoVia
        </h1>

        {/* Badge de simulación */}
        <span className="rounded-full border border-[var(--expo-lilac)] bg-[color-mix(in_srgb,var(--expo-lilac)_15%,white)] px-3 py-0.5 text-xs font-bold text-[var(--expo-purple)]">
          Datos simulados
        </span>
      </header>

      {/* Estadísticas */}
      <ProfileStats
        points={points}
        level={level}
        visitedCount={visitedStandIds.length}
      />

      {/* Historial de visitas */}
      <div>
        <h2 className="mb-2 font-bold text-[var(--expo-navy)] flex items-center gap-1.5">
          <History size={15} className="text-[var(--expo-blue)]" aria-hidden="true" />
          Visitas recientes
        </h2>
        <RecentVisits visits={recentVisits} />
      </div>

      {/* Favoritos */}
      <div>
        <h2 className="mb-2 font-bold text-[var(--expo-navy)] flex items-center gap-1.5">
          <Heart
            size={15}
            className="text-[var(--expo-pink)] fill-[var(--expo-pink)]"
            aria-hidden="true"
          />
          Favoritos
        </h2>

        {favoriteStands.length === 0 ? (
          <p className="text-sm text-slate-400 py-3 text-center">
            Aún no tienes favoritos. Agrega stands desde el mapa.
          </p>
        ) : (
          <ul className="flex flex-col gap-2" aria-label="Stands favoritos">
            {favoriteStands.map((stand) => (
              <li
                key={stand!.id}
                className="flex items-center gap-3 rounded-xl border border-[var(--expo-line)] bg-white px-3 py-2.5"
              >
                <Heart
                  size={14}
                  className="text-[var(--expo-pink)] fill-[var(--expo-pink)] flex-shrink-0"
                  aria-hidden="true"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[var(--expo-navy)] text-sm truncate">
                    {stand!.name}
                  </p>
                  <p className="text-xs text-slate-400 font-mono">
                    {stand!.boothCode}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Reiniciar demo */}
      <div className="pt-2 border-t border-[var(--expo-line)]">
        <button
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-[var(--expo-coral)] bg-white px-4 py-3 text-sm font-bold text-[var(--expo-coral)] transition-colors hover:bg-[color-mix(in_srgb,var(--expo-coral)_8%,white)]"
          style={{ minHeight: 44 }}
        >
          <RotateCcw size={15} aria-hidden="true" />
          Reiniciar demostración
        </button>
        <p className="mt-1.5 text-center text-xs text-slate-400">
          Vuelve al estado inicial de la demo
        </p>
      </div>
    </section>
  );
}
