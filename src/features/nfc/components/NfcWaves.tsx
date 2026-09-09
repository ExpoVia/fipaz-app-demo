"use client";

/**
 * @file NfcWaves.tsx
 * Animación de ondas NFC construida con CSS puro (no requiere Motion).
 * Respeta prefers-reduced-motion: muestra el símbolo estático sin animación.
 * aria-hidden porque es decorativa; el estado NFC se anuncia vía aria-live.
 */

import Image from "next/image";

interface NfcWavesProps {
  /** `true` mientras nfcStage === "searching" */
  active?: boolean;
}

export function NfcWaves({ active = false }: NfcWavesProps) {
  return (
    <div
      aria-hidden="true"
      className="relative flex items-center justify-center"
      style={{ width: 160, height: 160 }}
    >
      {/* Ondas expansivas — ocultas si prefers-reduced-motion: reduce */}
      {active && (
        <>
          <span className="nfc-wave nfc-wave-1" />
          <span className="nfc-wave nfc-wave-2" />
          <span className="nfc-wave nfc-wave-3" />
        </>
      )}

      {/* Símbolo NFC central */}
      <Image
        className="relative z-10 drop-shadow-lg"
        src="/assets/nfc/nfc-symbol.svg"
        alt=""
        width={72}
        height={72}
        priority
      />

      {/* Estilos de las ondas — inline para no depender de config de Tailwind */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .nfc-wave {
            position: absolute;
            border-radius: 50%;
            border: 2.5px solid var(--expo-blue);
            opacity: 0;
            animation: nfc-pulse 2s ease-out infinite;
          }
          .nfc-wave-1 { width: 96px;  height: 96px;  animation-delay: 0s; }
          .nfc-wave-2 { width: 128px; height: 128px; animation-delay: 0.5s; }
          .nfc-wave-3 { width: 160px; height: 160px; animation-delay: 1s; }

          @keyframes nfc-pulse {
            0%   { transform: scale(0.85); opacity: 0.7; }
            100% { transform: scale(1);    opacity: 0; }
          }
        }
      `}</style>
    </div>
  );
}
