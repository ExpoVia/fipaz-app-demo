"use client";

import { AppShell, type AppShellScreens } from "@/components/app-shell";
import { MissionsScreen } from "@/features/missions/MissionsScreen";
import { RewardsScreen } from "@/features/rewards/RewardsScreen";

// Import placeholder + existing screens
import { Compass, MapPinned, ScanLine, UserRound } from "lucide-react";
import { ModulePlaceholder } from "@/components/shared";

/**
 * Client-side demo app wrapper.
 * Mounts Zustand store and wires screens that need client interactivity.
 * Screens that don't need the store are passed as static JSX.
 */
export function DemoAppClient() {
  const screens: AppShellScreens = {
    home: (
      <ModulePlaceholder
        eyebrow="Experiencia visitante"
        title="Tu feria, a tu manera"
        description="Aquí se integrarán el resumen, las recomendaciones y los accesos rápidos de Saul."
        icon={<Compass aria-hidden="true" size={25} strokeWidth={2.5} />}
        accent="blue"
      >
        <div className="pixel-card p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="pixel-label text-[var(--expo-purple)]">Tu progreso</p>
              <p className="mt-1 text-2xl font-black text-[var(--expo-navy)]">
                150 puntos
              </p>
            </div>
            <span className="grid size-12 place-items-center rounded-xl bg-[#ffe7a0] text-2xl" aria-hidden="true">
              ★
            </span>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-2/5 bg-[var(--expo-blue)]" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="pixel-card min-h-28 p-4">
            <p className="pixel-label text-[var(--expo-green)]">Siguiente</p>
            <p className="mt-2 font-bold text-[var(--expo-navy)]">Explora el mapa</p>
          </div>
          <div className="pixel-card min-h-28 p-4">
            <p className="pixel-label text-[var(--expo-coral)]">Misión</p>
            <p className="mt-2 font-bold text-[var(--expo-navy)]">Visita 3 de 5 stands</p>
          </div>
        </div>
      </ModulePlaceholder>
    ),
    map: (
      <ModulePlaceholder
        eyebrow="Croquis interactivo"
        title="Encuentra cada experiencia"
        description="El mapa de Franco ocupará este panel con zoom, zonas, filtros y rutas simuladas."
        icon={<MapPinned aria-hidden="true" size={25} strokeWidth={2.5} />}
        accent="green"
      >
        <div className="pixel-card relative h-80 overflow-hidden bg-[#e8f7ee] p-4">
          <div className="absolute left-5 top-6 h-24 w-32 rounded-xl border-4 border-white bg-[var(--expo-sky)] shadow-[3px_3px_0_#2f2d4c33]" />
          <div className="absolute right-5 top-10 h-36 w-32 rounded-xl border-4 border-white bg-[var(--expo-green)] shadow-[3px_3px_0_#2f2d4c33]" />
          <div className="absolute bottom-7 left-10 h-28 w-36 rounded-xl border-4 border-white bg-[var(--expo-yellow)] shadow-[3px_3px_0_#2f2d4c33]" />
          <div className="absolute bottom-8 right-7 grid size-12 place-items-center rounded-full border-4 border-white bg-[var(--expo-blue)] text-white shadow-md">
            <MapPinned aria-hidden="true" size={22} />
          </div>
          <span className="pixel-label absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-2 text-[var(--expo-navy)] shadow-md">
            Mapa demo
          </span>
        </div>
      </ModulePlaceholder>
    ),
    scan: (
      <ModulePlaceholder
        eyebrow="Simulación NFC"
        title="Acerca tu teléfono"
        description="Erick conectará aquí la detección, confirmación, puntos y control de duplicados."
        icon={<ScanLine aria-hidden="true" size={25} strokeWidth={2.5} />}
        accent="yellow"
      >
        <div className="pixel-card grid min-h-80 place-items-center overflow-hidden p-6 text-center">
          <div>
            <div className="nfc-pulse mx-auto grid size-28 place-items-center rounded-3xl border-4 border-[var(--expo-navy)] bg-[var(--expo-blue)] text-white shadow-[7px_7px_0_var(--expo-navy)]">
              <ScanLine aria-hidden="true" size={52} strokeWidth={2} />
            </div>
            <p className="mt-8 font-black text-[var(--expo-navy)]">Escáner preparado</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Este flujo estará identificado siempre como una simulación.
            </p>
          </div>
        </div>
      </ModulePlaceholder>
    ),
    missions: <MissionsScreen />,
    profile: <RewardsScreen />,
  };

  return <AppShell screens={screens} />;
}
