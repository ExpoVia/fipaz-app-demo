"use client";

/**
 * @file NfcScreen.tsx
 * Pantalla de simulación NFC de ExpoVia.
 *
 * - Gestiona el temporizador de 1700 ms (searching → detected).
 * - Cancela el temporizador al desmontarse o cambiar de etapa.
 * - Conecta el store a NfcStatusCard y NfcWaves.
 * - Anuncia cambios de etapa vía aria-live="polite".
 * - Etiqueta visible "Simulación NFC" siempre presente.
 */

import { useEffect, useRef, useState } from "react";
import { useDemoStore } from "@/store/demo-store";
import {
  selectBeginNfcConfirmation,
  selectConfirmVisit,
  selectFailNfcScan,
  selectHasHydrated,
  selectMarkNfcDetected,
  selectNfcStage,
  selectPoints,
  selectResetNfcFlow,
  selectSelectStand,
  selectSelectedStandId,
  selectSetActiveTab,
  selectStartNfcScan,
  selectVisitedStandIds,
} from "@/store/demo-selectors";
import { missions } from "@/data/demo-data";
import { getMissionProgress, getStandById } from "@/lib/demo-domain";
import { NfcWaves } from "./components/NfcWaves";
import { NfcStatusCard } from "./components/NfcStatusCard";
import type { FeatureScreenProps } from "@/config/navigation";

/** Duración del timer de simulación NFC en milisegundos (1.7 s). */
const SCAN_DELAY_MS = 1700;

/** Procesamiento visual posterior a la confirmación del usuario (1.3 s). */
const CONFIRM_DELAY_MS = 1300;

export function NfcScreen({ onNavigate }: FeatureScreenProps) {
  // ── Store ──────────────────────────────────────────────────────────────────
  const nfcStage = useDemoStore(selectNfcStage);
  const hasHydrated = useDemoStore(selectHasHydrated);
  const selectedStandId = useDemoStore(selectSelectedStandId);
  const totalPoints = useDemoStore(selectPoints);
  const visitedStandIds = useDemoStore(selectVisitedStandIds);

  const startNfcScan = useDemoStore(selectStartNfcScan);
  const markNfcDetected = useDemoStore(selectMarkNfcDetected);
  const beginNfcConfirmation = useDemoStore(selectBeginNfcConfirmation);
  const confirmVisit = useDemoStore(selectConfirmVisit);
  const failNfcScan = useDemoStore(selectFailNfcScan);
  const resetNfcFlow = useDemoStore(selectResetNfcFlow);
  const selectStand = useDemoStore(selectSelectStand);
  const setActiveTab = useDemoStore(selectSetActiveTab);
  const [confirmationRequested, setConfirmationRequested] = useState(false);

  useEffect(() => {
    if (!useDemoStore.persist.hasHydrated()) {
      void useDemoStore.persist.rehydrate();
    }
  }, []);

  // ── Datos ──────────────────────────────────────────────────────────────────
  const targetStand = selectedStandId
    ? getStandById(selectedStandId)
    : undefined;
  const featuredMission = missions.find((mission) => mission.featured);
  const featuredMissionProgress = featuredMission
    ? getMissionProgress(featuredMission, visitedStandIds)
    : undefined;

  // ── Temporizador searching → detected ──────────────────────────────────────
  const scanTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (nfcStage === "searching") {
      scanTimerRef.current = setTimeout(() => {
        markNfcDetected();
      }, SCAN_DELAY_MS);
    }

    return () => {
      if (scanTimerRef.current !== null) {
        clearTimeout(scanTimerRef.current);
        scanTimerRef.current = null;
      }
    };
  }, [nfcStage, markNfcDetected]);

  // ── Temporizador confirming → confirmVisit ─────────────────────────────────
  const confirmTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (
      nfcStage === "confirming" &&
      selectedStandId &&
      confirmationRequested
    ) {
      confirmTimerRef.current = setTimeout(() => {
        confirmVisit(selectedStandId);
      }, CONFIRM_DELAY_MS);
    }

    return () => {
      if (confirmTimerRef.current !== null) {
        clearTimeout(confirmTimerRef.current);
        confirmTimerRef.current = null;
      }
    };
  }, [nfcStage, selectedStandId, confirmationRequested, confirmVisit]);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleStart = () => {
    setConfirmationRequested(false);
    startNfcScan();
  };

  const handleContinue = () => {
    setConfirmationRequested(false);
    beginNfcConfirmation();
  };

  const handleConfirm = () => {
    if (
      nfcStage !== "confirming" ||
      !selectedStandId ||
      confirmationRequested
    ) {
      return;
    }

    setConfirmationRequested(true);
  };

  const handleNavigateProgress = () => {
    resetNfcFlow();
    onNavigate?.("profile");
    setActiveTab("profile");
  };

  const handleNavigateMissions = () => {
    resetNfcFlow();
    onNavigate?.("missions");
    setActiveTab("missions");
  };

  const handleReturnToStand = () => {
    setConfirmationRequested(false);
    resetNfcFlow();
    onNavigate?.("map");
    setActiveTab("map");
  };

  const handleRetry = () => {
    setConfirmationRequested(false);
    startNfcScan(selectedStandId ?? undefined);
  };

  const handleScanAnother = () => {
    setConfirmationRequested(false);
    selectStand(null);
    startNfcScan();
  };

  const handleSimulateError = () => failNfcScan();

  // ── Etiqueta de accesibilidad por etapa ────────────────────────────────────
  const stageAnnouncement: Record<string, string> = {
    idle: "Listo para escanear",
    searching: "Buscando señal NFC",
    detected: targetStand
      ? `Stand detectado: ${targetStand.name}`
      : "Stand detectado",
    confirming: confirmationRequested
      ? "Registrando visita"
      : "Esperando confirmación de la visita",
    success: `Visita registrada. Se sumaron 50 puntos. Total: ${totalPoints}`,
    duplicate: "Stand ya registrado. No se suman puntos.",
    error: "Error al escanear. Inténtalo de nuevo.",
  };

  if (!hasHydrated) {
    return (
      <div className="flex items-center justify-center py-16" aria-live="polite">
        <span className="text-sm text-slate-400">
          Preparando simulación&hellip;
        </span>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center gap-6 px-4 py-6 min-h-full">
      {/* Encabezado con etiqueta de simulación */}
      <header className="w-full text-center">
        <span className="inline-block rounded-full bg-[var(--expo-yellow)] px-3 py-0.5 text-xs font-bold uppercase tracking-widest text-[var(--expo-navy)]">
          Simulación NFC
        </span>
        <h1 className="mt-2 text-xl font-black text-[var(--expo-navy)]">
          Escanear stand
        </h1>
      </header>

      {/* Icono / animación NFC */}
      <div className="flex-shrink-0">
        <NfcWaves active={nfcStage === "searching"} />
      </div>

      {/* Anuncio accesible de estado — solo para lectores de pantalla */}
      <p
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {stageAnnouncement[nfcStage] ?? ""}
      </p>

      {/* Contenido del estado actual */}
      <div className="w-full max-w-xs flex-1 flex items-center">
        <div className="w-full">
          <NfcStatusCard
            stage={nfcStage}
            targetStand={targetStand}
            totalPoints={totalPoints}
            missionTitle={featuredMission?.title}
            missionProgress={featuredMissionProgress}
            confirmationRequested={confirmationRequested}
            onStart={handleStart}
            onContinue={handleContinue}
            onConfirm={handleConfirm}
            onNavigateProgress={handleNavigateProgress}
            onNavigateMissions={handleNavigateMissions}
            onReturnToStand={handleReturnToStand}
            onRetry={handleRetry}
            onScanAnother={handleScanAnother}
            onSimulateError={handleSimulateError}
          />
        </div>
      </div>

      {/* Estilos de botones compartidos */}
      <style>{`
        .nfc-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 0.75rem 1.5rem;
          background: var(--expo-blue);
          color: white;
          font-weight: 700;
          border-radius: 0.75rem;
          border: none;
          cursor: pointer;
          transition: opacity 0.15s;
          font-size: 0.95rem;
        }
        .nfc-btn-primary:hover:not(:disabled) { opacity: 0.88; }
        .nfc-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 0.75rem 1.5rem;
          background: transparent;
          color: var(--expo-blue);
          font-weight: 600;
          border-radius: 0.75rem;
          border: 2px solid var(--expo-blue);
          cursor: pointer;
          transition: background 0.15s;
          font-size: 0.95rem;
        }
        .nfc-btn-secondary:hover { background: color-mix(in srgb, var(--expo-blue) 8%, transparent); }
      `}</style>
    </section>
  );
}
