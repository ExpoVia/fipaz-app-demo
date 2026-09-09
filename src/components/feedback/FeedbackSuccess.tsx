"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Home, CheckCircle2 } from "lucide-react";

export function FeedbackSuccess() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto max-w-xl rounded-3xl border-3 border-[var(--expo-navy)] bg-white p-8 text-center shadow-[10px_10px_0_var(--expo-navy)] my-8"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-3 border-[var(--expo-navy)] bg-[var(--expo-yellow)] shadow-[3px_3px_0_var(--expo-navy)]">
        <CheckCircle2 className="h-10 w-10 text-[var(--expo-navy)]" />
      </div>

      <div className="mt-6">
        <span className="font-mono text-xs font-black uppercase text-[var(--expo-blue)] tracking-wider">
          ✦ TRANSMISIÓN EXITOSA ✦
        </span>

        <h2 className="mt-2 text-3xl font-black text-[var(--expo-navy)]">
          ¡Gracias por ayudarnos a mejorar ExpoVia!
        </h2>

        <p className="mt-3 text-base text-slate-600 font-medium">
          Tus respuestas anónimas han sido registradas y nos ayudarán a perfeccionar la experiencia antes de nuestra siguiente prueba de campo.
        </p>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/demo"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border-3 border-[var(--expo-navy)] bg-[var(--expo-yellow)] px-6 py-3.5 text-base font-black text-[var(--expo-navy)] shadow-[4px_4px_0_var(--expo-navy)] transition-all hover:-translate-y-0.5 hover:bg-[#FFE066]"
        >
          <span>Volver a la demo</span>
          <ArrowRight className="h-5 w-5 stroke-[3]" />
        </Link>

        <Link
          href="/"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border-3 border-[var(--expo-navy)] bg-white px-6 py-3.5 text-base font-bold text-[var(--expo-navy)] shadow-[4px_4px_0_var(--expo-navy)] transition-all hover:-translate-y-0.5 hover:bg-slate-50"
        >
          <Home className="h-4 w-4" />
          <span>Volver al inicio</span>
        </Link>
      </div>
    </motion.div>
  );
}
