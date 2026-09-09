import type { Metadata } from "next";
import { Compass, MapPinned, ScanLine, Trophy, UserRound } from "lucide-react";

import { AppShell, type AppShellScreens } from "@/components/app-shell";
import { ModulePlaceholder } from "@/components/shared";

export const metadata: Metadata = {
  title: "Probar demo",
  description:
    "Simulación móvil de ExpoVia para recorrer una feria, visitar stands y completar misiones.",
};

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
  missions: (
    <ModulePlaceholder
      eyebrow="Gamificación"
      title="Misiones y premios"
      description="Fabricio integrará categorías, progreso y recompensas en este espacio."
      icon={<Trophy aria-hidden="true" size={25} strokeWidth={2.5} />}
      accent="purple"
    >
      <div className="space-y-3">
        {[
          ["Ruta tecnológica", "2/5", "bg-[var(--expo-sky)]", "w-2/5"],
          ["Sabores de la feria", "1/2", "bg-[#ffe7a0]", "w-1/2"],
          ["Primer contacto", "Completa", "bg-[var(--expo-mint)]", "w-full"],
        ].map(([title, progress, color, width]) => (
          <article key={title} className={`pixel-card p-4 ${color}`}>
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-black text-[var(--expo-navy)]">{title}</h3>
              <span className="font-mono text-xs font-bold">{progress}</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-white/80">
              <div className={`h-full rounded-full bg-[var(--expo-purple)] ${width}`} />
            </div>
          </article>
        ))}
      </div>
    </ModulePlaceholder>
  ),
  profile: (
    <ModulePlaceholder
      eyebrow="Perfil de prueba"
      title="Explorador ExpoVia"
      description="El perfil de Erick mostrará puntos, favoritos, historial y reinicio de la demostración."
      icon={<UserRound aria-hidden="true" size={25} strokeWidth={2.5} />}
      accent="pink"
    >
      <div className="pixel-card p-5">
        <div className="flex items-center gap-4">
          <div className="grid size-16 place-items-center rounded-2xl border-2 border-[var(--expo-navy)] bg-[var(--expo-pink)]">
            <UserRound aria-hidden="true" size={34} strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-lg font-black text-[var(--expo-navy)]">Nivel 2</p>
            <p className="text-sm font-medium text-slate-600">2 stands visitados</p>
          </div>
        </div>
      </div>
      <div className="pixel-card p-5">
        <p className="pixel-label text-[var(--expo-purple)]">Integración pendiente</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          El shell conserva esta pantalla montada aunque cambies de pestaña.
        </p>
      </div>
    </ModulePlaceholder>
  ),
};

export default function DemoPage() {
  return <AppShell screens={screens} />;
}
