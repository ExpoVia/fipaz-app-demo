"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { pixelifyFont, pressStartFont } from "./fonts";
import {
  PixelStar,
  PixelNfcPlaque,
  PixelCharacter,
  PixelRewardChest,
  PixelTrophy,
} from "./PixelIcons";
import { MapPin, ArrowRight, ChevronDown, Compass, Smartphone, Gift, Award } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-100/70 via-[#f4fafc] to-[#e8dcf4]/40 pt-8 pb-16 md:pt-14 md:pb-24"
    >
      {/* Background Pixel Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#d8e5ec_1px,transparent_1px),linear-gradient(to_bottom,#d8e5ec_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* LEFT COLUMN: Main copy */}
          <div className="lg:col-span-7">
            {/* Top Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-block mb-4"
            >
              <div className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--expo-navy)] bg-white px-4 py-2 shadow-[3px_3px_0_var(--expo-navy)]">
                <span className="animate-pulse text-xs text-[var(--expo-blue)] font-black">✦</span>
                <span className={`${pressStartFont.className} text-[9px] sm:text-[11px] text-[var(--expo-navy)] uppercase tracking-wider`}>
                  FERIAS MÁS VIVAS, VISITAS CON SENTIDO
                </span>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`${pixelifyFont.className} text-5xl font-bold tracking-tight text-[var(--expo-navy)] sm:text-7xl lg:text-8xl leading-[0.95] sm:leading-[0.95]`}
            >
              Explora. <br />
              Conecta. <br />
              <span className="relative inline-block bg-gradient-to-r from-[var(--expo-blue)] via-[var(--expo-purple)] to-[var(--expo-lilac)] bg-clip-text text-transparent pb-1">
                Vive Expo.
                <span className="absolute -bottom-1 left-0 h-2.5 w-full bg-[var(--expo-yellow)]/80 -z-10 rounded-xs transform -rotate-1" />
              </span>
            </motion.h1>

            {/* Subtitle / Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-xl font-medium"
            >
              ExpoVia convierte las ferias físicas en experiencias digitales navegables, interactivas y medibles. Descubre stands, encuentra tu ruta, registra visitas con NFC, completa misiones y conecta con lo que buscas.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/demo"
                className="group inline-flex items-center gap-3 border-3 border-[var(--expo-navy)] bg-[var(--expo-yellow)] px-7 py-3.5 text-lg font-black text-[var(--expo-navy)] shadow-[5px_5px_0_var(--expo-navy)] transition-all hover:-translate-y-1 hover:bg-[#FFE066] active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <span>Probar demo</span>
                <ArrowRight className="h-5 w-5 stroke-[3] transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#problema"
                className="inline-flex items-center gap-2 border-3 border-[var(--expo-navy)] bg-white px-6 py-3.5 text-base font-bold text-[var(--expo-navy)] shadow-[5px_5px_0_var(--expo-navy)] transition-all hover:-translate-y-1 hover:bg-slate-50 active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <span>Conoce más</span>
                <ChevronDown className="h-5 w-5 stroke-[2.5]" />
              </a>
            </motion.div>

            {/* 4 Mini Benefits Chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-2xl"
            >
              {[
                { icon: <Compass className="h-4 w-4 text-[var(--expo-blue)]" />, text: "Explora el evento" },
                { icon: <Smartphone className="h-4 w-4 text-[var(--expo-green)]" />, text: "Stands con NFC" },
                { icon: <Award className="h-4 w-4 text-[var(--expo-purple)]" />, text: "Completa misiones" },
                { icon: <Gift className="h-4 w-4 text-[var(--expo-coral)]" />, text: "Desbloquea premios" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-lg border-2 border-[var(--expo-line)] bg-white p-2.5 shadow-sm"
                >
                  <div className="shrink-0">{item.icon}</div>
                  <span className="text-xs font-bold text-[var(--expo-navy)] leading-tight">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Mobile Phone Visual Representation */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            
            {/* Floating Pixel Elements Around Phone */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-4 z-20 hidden sm:block"
            >
              <div className="flex items-center gap-2 rounded-lg border-2 border-[var(--expo-navy)] bg-white p-2 shadow-[3px_3px_0_var(--expo-navy)]">
                <PixelNfcPlaque className="w-7 h-7" />
                <div>
                  <p className="font-mono text-[10px] font-black uppercase text-[var(--expo-blue)]">Tap NFC</p>
                  <p className="text-xs font-black text-[var(--expo-navy)]">+50 Puntos</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -right-6 z-20 hidden sm:block"
            >
              <div className="flex items-center gap-2 rounded-lg border-2 border-[var(--expo-navy)] bg-[var(--expo-yellow)] p-2.5 shadow-[3px_3px_0_var(--expo-navy)]">
                <PixelTrophy className="w-6 h-6" />
                <span className="text-xs font-black text-[var(--expo-navy)]">¡Misión lista!</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-2 z-20"
            >
              <PixelCharacter className="w-16 h-16 drop-shadow-[3px_3px_0_rgba(0,0,0,0.2)]" />
            </motion.div>

            {/* Simulated Phone Shell */}
            <div className="relative w-full max-w-[320px] rounded-[36px] border-4 border-[var(--expo-navy)] bg-[var(--expo-navy)] p-3 shadow-[12px_12px_0_rgba(47,45,76,0.15)] sm:max-w-[340px]">
              
              {/* Phone Speaker Notch */}
              <div className="absolute top-4 left-1/2 h-3.5 w-24 -translate-x-1/2 rounded-full bg-[var(--expo-navy)] z-30 flex items-center justify-center">
                <div className="h-1.5 w-8 rounded-full bg-slate-700" />
              </div>

              {/* Screen Content Container */}
              <div className="relative h-[560px] w-full overflow-hidden rounded-[28px] bg-[var(--expo-bg)] pt-6 pb-2 flex flex-col justify-between">
                
                {/* App Header Bar inside Phone */}
                <div className="bg-[var(--expo-blue)] p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono text-[10px] font-black uppercase text-sky-200 tracking-wider">
                        EXPOVIA APP
                      </p>
                      <h3 className="text-lg font-black tracking-tight">FIPAZ 2026</h3>
                    </div>
                    <span className="rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-extrabold backdrop-blur-xs">
                      La Paz
                    </span>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-3 grid grid-cols-4 gap-1 text-center text-[10px] font-bold">
                    {["Mapa", "Stands", "Misiones", "Premios"].map((act, i) => (
                      <div
                        key={i}
                        className={`rounded py-1 ${i === 0 ? "bg-white text-[var(--expo-navy)] font-black" : "bg-white/10 hover:bg-white/20"}`}
                      >
                        {act}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated App Body */}
                <div className="p-3.5 space-y-3 flex-1 overflow-y-auto">
                  
                  {/* Progress Card */}
                  <div className="rounded-xl border-2 border-[var(--expo-line)] bg-white p-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[var(--expo-navy)]">Tu progreso</span>
                      <span className="font-mono text-xs font-extrabold text-[var(--expo-blue)]">2 / 5 misiones</span>
                    </div>
                    <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 border border-slate-200">
                      <div className="h-full w-2/5 bg-gradient-to-r from-[var(--expo-blue)] to-[var(--expo-lilac)] rounded-full" />
                    </div>
                  </div>

                  {/* Next Stand Banner */}
                  <div className="rounded-xl border-2 border-[var(--expo-navy)] bg-[var(--expo-pink)]/20 p-3 shadow-[2px_2px_0_var(--expo-navy)]">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono text-[10px] font-black uppercase text-[var(--expo-purple)]">
                          ¡SIGUE EXPLORANDO!
                        </span>
                        <p className="mt-0.5 text-xs font-extrabold text-[var(--expo-navy)]">
                          Visita 3 stands más para desbloquear una recompensa.
                        </p>
                      </div>
                      <PixelRewardChest className="w-8 h-8 shrink-0 ml-1" />
                    </div>
                  </div>

                  {/* Mini Map Sample inside phone */}
                  <div className="relative rounded-xl border-2 border-[var(--expo-line)] bg-emerald-50/50 p-2.5 overflow-hidden">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-black text-slate-800 flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
                        Pabellón B — Innovación
                      </span>
                      <span className="text-[9px] font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-slate-300">
                        120m
                      </span>
                    </div>
                    <div className="h-20 w-full rounded-lg border border-emerald-200 bg-[radial-gradient(#62BE5A_1px,transparent_1px)] [background-size:8px_8px] relative flex items-center justify-center">
                      <div className="absolute left-4 top-3 rounded bg-white px-2 py-1 text-[9px] font-black text-slate-700 border border-slate-300 shadow-xs">
                        Stand B-117
                      </div>
                      <div className="absolute right-4 bottom-2 rounded bg-[var(--expo-blue)] px-2 py-0.5 text-[9px] font-bold text-white shadow-xs">
                        Tu Ruta →
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Bottom Navigation */}
                <div className="border-t border-slate-200 bg-white px-3 py-2 grid grid-cols-5 text-center text-[9px] font-bold text-slate-500">
                  <div className="text-[var(--expo-blue)] font-black">Inicio</div>
                  <div>Mapa</div>
                  <div className="font-black text-[var(--expo-purple)]">NFC</div>
                  <div>Misiones</div>
                  <div>Perfil</div>
                </div>
              </div>
            </div>

            {/* Mandatory Tag Label */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[var(--expo-navy)] bg-white px-3.5 py-1 text-xs font-black text-[var(--expo-navy)] shadow-[3px_3px_0_var(--expo-navy)] font-mono">
                <PixelStar className="w-3.5 h-3.5" />
                Demo conceptual para FIPAZ 2026
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
