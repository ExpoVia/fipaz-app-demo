"use client";

import { Clock, MapPin } from "lucide-react";
import { getStandById } from "@/lib/demo-domain";
import type { Visit } from "@/types/demo";

interface RecentVisitsProps {
  visits: Visit[];
}

export function RecentVisits({ visits }: RecentVisitsProps) {
  if (visits.length === 0) {
    return (
      <div className="text-center py-6 text-slate-400 text-sm">
        <MapPin size={28} className="mx-auto mb-2 opacity-40" />
        <p>Aún no has visitado ningún stand.</p>
        <p className="mt-0.5">¡Escanea tu primer stand con NFC!</p>
      </div>
    );
  }

  return (
    <ol aria-label="Historial de visitas recientes" className="flex flex-col gap-2">
      {visits.map((visit, index) => {
        const stand = getStandById(visit.standId);
        const date = new Date(visit.visitedAt);
        const timeStr = date.toLocaleTimeString("es-BO", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const dateStr = date.toLocaleDateString("es-BO", {
          day: "numeric",
          month: "short",
        });

        return (
          <li
            key={visit.id}
            className="flex items-center gap-3 rounded-xl border border-[var(--expo-line)] bg-white px-3 py-2.5"
          >
            {/* Índice */}
            <span
              className="flex-shrink-0 flex items-center justify-center rounded-full bg-[var(--expo-bg)] text-xs font-bold text-[var(--expo-blue)] border border-[var(--expo-line)]"
              style={{ width: 28, height: 28 }}
              aria-hidden="true"
            >
              {index + 1}
            </span>

            {/* Info de stand */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[var(--expo-navy)] text-sm truncate">
                {stand?.name ?? visit.standId}
              </p>
              <p className="text-xs text-slate-400 font-mono">
                {stand?.boothCode}
              </p>
            </div>

            {/* Puntos y hora */}
            <div className="text-right flex-shrink-0">
              <p className="text-xs font-bold text-[var(--expo-blue)]">
                +{visit.pointsAwarded} pts
              </p>
              <p className="text-xs text-slate-400 flex items-center gap-0.5 justify-end">
                <Clock size={10} aria-hidden="true" />
                <span>
                  {dateStr}, {timeStr}
                </span>
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
