"use client";

import React from "react";
import Link from "next/link";
import { PixelLogo, PixelStar } from "../landing/PixelIcons";
import { ArrowLeft } from "lucide-react";

export function FeedbackHeader() {
  return (
    <header className="border-b-2 border-[var(--expo-line)] bg-white py-6">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-bold text-slate-600 transition-colors hover:text-[var(--expo-blue)]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver al inicio</span>
          </Link>

          <PixelLogo />
        </div>

        <div className="mt-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--expo-yellow)] px-3 py-1 font-mono text-xs font-black text-[var(--expo-navy)] border-2 border-[var(--expo-navy)] shadow-[2px_2px_0_var(--expo-navy)] mb-3">
            <PixelStar className="w-3.5 h-3.5" />
            FEEDBACK ANÓNIMO
          </div>

          <h1 className="text-3xl font-black tracking-tight text-[var(--expo-navy)] sm:text-5xl">
            Tu experiencia puede mejorar ExpoVia.
          </h1>

          <p className="mt-3 text-base sm:text-lg text-slate-600 font-medium max-w-2xl">
            Esta es una simulación temprana. Queremos saber qué funcionó, qué te confundió y qué deberíamos priorizar en las siguientes versiones.
          </p>
        </div>
      </div>
    </header>
  );
}
