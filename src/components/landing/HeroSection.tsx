"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown, Compass, Gift, Smartphone, Award } from "lucide-react";
import { pixelifyFont, pressStartFont } from "./fonts";

const benefits = [
  { icon: <Compass className="h-4 w-4 text-[var(--expo-blue)]" />, text: "Explora el evento" },
  { icon: <Smartphone className="h-4 w-4 text-[var(--expo-green)]" />, text: "Stands con NFC" },
  { icon: <Award className="h-4 w-4 text-[var(--expo-purple)]" />, text: "Completa misiones" },
  { icon: <Gift className="h-4 w-4 text-[var(--expo-coral)]" />, text: "Desbloquea recompensas" },
];

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden bg-[#eaf6fa] py-12 sm:py-16 lg:min-h-[calc(100vh-72px)] lg:py-10"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_78%_32%,#d8eff6_0%,transparent_32%),linear-gradient(135deg,#f4fafc_0%,#e9f4fb_55%,#eee5f4_100%)]" />
      <video autoPlay loop muted playsInline className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover">
        <source src="/videos/landing%20page.mp4" type="video/mp4" />
        <source src="/videos/landing page.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(244,250,252,0.97)_0%,rgba(244,250,252,0.88)_33%,rgba(244,250,252,0.42)_59%,rgba(244,250,252,0.08)_100%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 sm:px-10 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="max-w-2xl lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mb-5 inline-block">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--expo-navy)] bg-white/95 px-4 py-2 shadow-[3px_3px_0_var(--expo-navy)]">
              <span className="text-xs font-black text-[var(--expo-blue)]">✦</span>
              <span className={`${pressStartFont.className} text-[9px] uppercase tracking-wider text-[var(--expo-navy)] sm:text-[10px]`}>
                Ferias más vivas, visitas con sentido
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className={`${pixelifyFont.className} text-5xl leading-[0.96] font-bold tracking-tight text-[var(--expo-navy)] sm:text-7xl lg:text-8xl`}
          >
            Explora. <br />
            Conecta. <br />
            <span className="relative inline-block bg-gradient-to-r from-[var(--expo-blue)] via-[var(--expo-purple)] to-[var(--expo-lilac)] bg-clip-text pb-2 text-transparent">
              Vive Expo.
              <span className="absolute bottom-0 left-0 -z-10 h-2.5 w-full -rotate-1 rounded-sm bg-[var(--expo-yellow)]/85" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-7 max-w-xl text-base leading-relaxed font-medium text-slate-700 sm:text-xl"
          >
            ExpoVia convierte las ferias físicas en experiencias digitales navegables, interactivas y medibles. Descubre stands, encuentra tu ruta, registra visitas con NFC, completa misiones y conecta con lo que buscas.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.15 }} className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/demo" className="group inline-flex items-center gap-3 border-3 border-[var(--expo-navy)] bg-[var(--expo-yellow)] px-7 py-3.5 text-lg font-black text-[var(--expo-navy)] shadow-[5px_5px_0_var(--expo-navy)] transition-all hover:-translate-y-1 hover:bg-[#ffe066] active:translate-x-1 active:translate-y-1 active:shadow-none">
              Probar demo
              <ArrowRight className="h-5 w-5 stroke-[3] transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="#problema" className="inline-flex items-center gap-2 border-3 border-[var(--expo-navy)] bg-white/95 px-6 py-3.5 text-base font-extrabold text-[var(--expo-navy)] shadow-[5px_5px_0_var(--expo-navy)] transition-all hover:-translate-y-1 hover:bg-white active:translate-x-1 active:translate-y-1 active:shadow-none">
              Conoce más
              <ChevronDown className="h-5 w-5 stroke-[2.5]" />
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.2 }} className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {benefits.map((item) => (
              <div key={item.text} className="flex items-center gap-2 rounded-lg border-2 border-[var(--expo-line)] bg-white/92 p-2.5 shadow-sm backdrop-blur-sm">
                {item.icon}
                <span className="text-xs leading-tight font-bold text-[var(--expo-navy)]">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
