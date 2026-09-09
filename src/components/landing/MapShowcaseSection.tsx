"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { PixelMapPin } from "./PixelIcons";
import { Navigation, ArrowRight, Utensils, Compass } from "lucide-react";

export function MapShowcaseSection() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const categories = ["Todos", "Tecnología", "Salud", "Gastronomía", "Finanzas"];

  return (
    <section id="mapa" className="bg-white py-16 md:py-24 border-t-2 border-[var(--expo-line)] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-emerald-800 border border-emerald-300 mb-3">
            <Compass className="h-3.5 w-3.5 text-emerald-600" />
            NAVEGACIÓN PRECISA
          </div>

          <h2 className="text-3xl font-black tracking-tight text-[var(--expo-navy)] sm:text-5xl">
            Encuentra lo que buscas antes de perderte entre los pasillos.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            Representación digital del campo ferial con búsqueda instantánea por pabellones, categorías y servicios.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`rounded-full border-2 border-[var(--expo-navy)] px-4 py-1.5 text-xs font-extrabold transition-all ${
                activeFilter === cat
                  ? "bg-[var(--expo-blue)] text-white shadow-[3px_3px_0_var(--expo-navy)]"
                  : "bg-white text-[var(--expo-navy)] hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Map Vector Graphic Card Box */}
        <div className="mt-10 relative rounded-3xl border-3 border-[var(--expo-navy)] bg-slate-900 p-4 sm:p-8 shadow-[10px_10px_0_var(--expo-navy)] overflow-hidden">
          
          {/* Top Bar inside Map Frame */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 text-white">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-xs font-black text-emerald-400 uppercase tracking-widest">
                FIPAZ 2026 — VISTA PANORÁMICA
              </span>
            </div>

            {/* Mandatory Tag Label */}
            <span className="font-mono text-[10px] font-black uppercase text-amber-300 bg-amber-950/60 px-3 py-1 rounded-md border border-amber-500/40">
              Mapa conceptual · Datos ilustrativos
            </span>
          </div>

          {/* Map Graphic Canvas */}
          <div className="relative mt-6 h-[340px] sm:h-[420px] w-full rounded-2xl border-2 border-slate-700 bg-[#0f172a] p-4 overflow-hidden">
            
            {/* Floor Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-60" />

            {/* Fair Pavilions SVG & Route Visual */}
            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
              {/* Route Path (Animated Dash Line) */}
              <path
                d="M 80 340 Q 180 240, 280 260 T 480 180 T 650 140"
                fill="none"
                stroke="#62BE5A"
                strokeWidth="4"
                strokeDasharray="8 6"
                className="animate-[dash_20s_linear_infinite]"
              />

              {/* Walking Dots */}
              <circle cx="80" cy="340" r="7" fill="#82B5E3" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="650" cy="140" r="9" fill="#FFC21A" stroke="#FFFFFF" strokeWidth="2.5" />
            </svg>

            {/* Pavilion Blocks */}
            {/* Pavilion A */}
            <div className="absolute top-8 left-8 sm:left-14 rounded-xl border-2 border-sky-400/40 bg-sky-950/70 p-3 text-white backdrop-blur-xs w-36 sm:w-48 shadow-lg">
              <span className="font-mono text-[9px] font-black uppercase tracking-wider text-sky-400">
                PABELLÓN A
              </span>
              <p className="text-xs sm:text-sm font-black text-white">Tecnología e Innovación</p>
              <div className="mt-2 grid grid-cols-2 gap-1 text-[9px] font-mono text-sky-200">
                <span className="bg-sky-900/60 p-1 rounded">Stand A-01</span>
                <span className="bg-sky-900/60 p-1 rounded">Stand A-04</span>
              </div>
            </div>

            {/* Pavilion B (Target) */}
            <div className="absolute top-1/3 right-8 sm:right-20 rounded-xl border-2 border-emerald-400 bg-emerald-950/80 p-3 text-white backdrop-blur-xs w-44 sm:w-56 shadow-xl ring-2 ring-emerald-400/30">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] font-black uppercase tracking-wider text-emerald-400">
                  PABELLÓN B
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs sm:text-sm font-black text-white">Comercio & Soluciones</p>
              <div className="mt-2 grid grid-cols-2 gap-1 text-[9px] font-mono">
                <span className="bg-emerald-800/80 p-1 rounded text-white font-bold border border-emerald-400">
                  ★ Stand B-117
                </span>
                <span className="bg-emerald-900/60 p-1 rounded text-emerald-200">Stand B-120</span>
              </div>
            </div>

            {/* Pavilion C */}
            <div className="absolute bottom-6 left-1/3 rounded-xl border-2 border-purple-400/40 bg-purple-950/70 p-3 text-white backdrop-blur-xs w-40 sm:w-52 shadow-lg">
              <span className="font-mono text-[9px] font-black uppercase tracking-wider text-purple-400">
                PABELLÓN C
              </span>
              <p className="text-xs sm:text-sm font-black text-white">Gastronomía & Servicios</p>
              <div className="mt-2 grid grid-cols-2 gap-1 text-[9px] font-mono text-purple-200">
                <span className="bg-purple-900/60 p-1 rounded">Food Court</span>
                <span className="bg-purple-900/60 p-1 rounded">Stand C-12</span>
              </div>
            </div>

            {/* Landmarks Pins */}
            <div className="absolute bottom-6 left-6 flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-600 text-xs font-bold text-slate-200">
              <Navigation className="h-3.5 w-3.5 text-sky-400" />
              Entrada Principal
            </div>

            <div className="absolute top-6 right-6 hidden sm:flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-600 text-xs font-bold text-slate-200">
              <Utensils className="h-3.5 w-3.5 text-amber-400" />
              Patio de Comidas
            </div>

            {/* Visitor Pin Marker */}
            <div className="absolute bottom-16 left-20 animate-bounce">
              <div className="flex flex-col items-center">
                <span className="bg-[var(--expo-yellow)] text-[var(--expo-navy)] font-mono text-[9px] font-black px-2 py-0.5 rounded border border-[var(--expo-navy)] shadow-xs">
                  Tu Ubicación
                </span>
                <PixelMapPin className="w-7 h-7" color="#FFC21A" />
              </div>
            </div>

            {/* Floating Sample Stand Info Card overlay */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="absolute right-4 bottom-4 z-20 max-w-[260px] sm:max-w-xs rounded-xl border-2 border-[var(--expo-navy)] bg-white p-3.5 shadow-[4px_4px_0_var(--expo-navy)] text-[var(--expo-navy)]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-black uppercase text-[var(--expo-blue)] bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                  Stand B-117
                </span>
                <span className="font-mono text-[10px] font-bold text-slate-500">120 m</span>
              </div>

              <h4 className="mt-1 text-sm font-black text-[var(--expo-navy)]">
                TERRAGRID Demo
              </h4>

              <p className="text-[11px] text-slate-600">
                Soluciones de agrotecnología y sensores inteligentes.
              </p>

              <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  ✦ Check-in NFC Disponible
                </span>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-1 bg-[var(--expo-yellow)] px-2.5 py-1 text-[11px] font-black text-[var(--expo-navy)] rounded border border-[var(--expo-navy)] hover:bg-[#FFE066]"
                >
                  Cómo llegar
                </Link>
              </div>
            </motion.div>

          </div>

          {/* Bottom CTA Bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800 text-white">
            <p className="text-xs sm:text-sm font-medium text-slate-300 text-center sm:text-left">
              Experimenta la navegación interactiva completa con zoom, rutas y búsqueda de stands en la demo móvil.
            </p>

            <Link
              href="/demo"
              className="inline-flex shrink-0 items-center gap-2 border-2 border-white bg-[var(--expo-blue)] px-6 py-2.5 text-sm font-black text-white shadow-[3px_3px_0_#FFFFFF] transition-all hover:bg-sky-600 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explorar el mapa en la demo</span>
              <ArrowRight className="h-4 w-4 stroke-[3]" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
