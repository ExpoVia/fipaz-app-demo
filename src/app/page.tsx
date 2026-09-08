import Link from "next/link";

export default function Home() {
  return (
    <main className="grid min-h-dvh place-items-center bg-[linear-gradient(135deg,#f4fafc_0%,#e7d9f5_52%,#ffe6a6_100%)] p-6">
      <section className="w-full max-w-xl border-4 border-[var(--expo-navy)] bg-white p-8 shadow-[8px_8px_0_var(--expo-navy)]">
        <p className="mb-3 font-mono text-sm font-bold uppercase tracking-[0.18em] text-[var(--expo-blue)]">
          Base técnica lista
        </p>
        <h1 className="text-5xl font-black tracking-tight text-[var(--expo-navy)]">
          ExpoVia
        </h1>
        <p className="mt-4 max-w-lg text-lg leading-8 text-slate-700">
          El equipo ya puede construir la landing y la simulación móvil. Las
          tareas individuales están enlazadas desde el README del proyecto.
        </p>
        <Link
          className="mt-8 inline-flex min-h-12 items-center justify-center border-2 border-[var(--expo-navy)] bg-[var(--expo-yellow)] px-6 font-bold text-[var(--expo-navy)] shadow-[4px_4px_0_var(--expo-navy)] transition-transform hover:-translate-y-0.5 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[var(--expo-blue)] active:translate-x-1 active:translate-y-1 active:shadow-none"
          href="/demo"
        >
          Abrir base de la demo
        </Link>
      </section>
    </main>
  );
}
