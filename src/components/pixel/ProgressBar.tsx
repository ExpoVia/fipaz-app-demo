"use client";

import { useEffect, useRef } from "react";
import { animate } from "motion";

interface ProgressBarProps {
  value: number;
  max: number;
  colorClass?: string;
  heightClass?: string;
  className?: string;
  showLabel?: boolean;
  id?: string;
}

/**
 * Accessible progress bar with animated spring fill via Motion.
 * Always includes role="progressbar" and aria attributes for screen readers.
 * Respects prefers-reduced-motion.
 */
export function ProgressBar({
  value,
  max,
  colorClass = "bg-[var(--expo-blue)]",
  heightClass = "h-3",
  className = "",
  showLabel = true,
  id,
}: ProgressBarProps) {
  const fillRef = useRef<HTMLDivElement>(null);
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const prevPct = useRef(pct);

  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      el.style.width = `${pct}%`;
      prevPct.current = pct;
      return;
    }

    // Animate the fill element's width directly via DOM animation
    animate(
      el,
      { width: `${pct}%` },
      { duration: 0.55, type: "spring", bounce: 0.3 },
    );
    prevPct.current = pct;
  }, [pct]);

  return (
    <div className={className}>
      <div
        id={id}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`Progreso: ${value} de ${max}`}
        className={`relative w-full overflow-hidden rounded-full bg-black/10 ${heightClass}`}
      >
        <div
          ref={fillRef}
          className={`${colorClass} h-full rounded-full transition-none`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <p className="mt-1 text-right text-[0.65rem] font-bold tabular-nums text-slate-500">
          {value}/{max}
        </p>
      )}
    </div>
  );
}
