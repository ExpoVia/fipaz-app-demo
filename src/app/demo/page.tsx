import Link from "next/link";

export default function DemoPage() {
  return (
    <main className="grid min-h-dvh place-items-center bg-[var(--expo-navy)] p-0 sm:p-6">
      <section className="flex min-h-dvh w-full max-w-[390px] flex-col justify-between overflow-hidden bg-[var(--expo-bg)] sm:min-h-[760px] sm:rounded-[32px] sm:border-8 sm:border-white sm:shadow-2xl">
        <header className="bg-[linear-gradient(90deg,var(--expo-blue),var(--expo-lilac))] p-5 text-center font-bold text-white">
          ExpoVia Demo
        </header>
        <div className="grid flex-1 place-items-center p-8 text-center">
          <div>
            <p className="font-mono text-sm font-bold uppercase tracking-widest text-[var(--expo-purple)]">
              Ruta preparada
            </p>
            <h1 className="mt-3 text-3xl font-black text-[var(--expo-navy)]">
              Aquí se integrará la app móvil
            </h1>
            <p className="mt-4 leading-7 text-slate-600">
              Inicio, mapa, NFC, misiones y perfil compartirán este viewport.
            </p>
          </div>
        </div>
        <footer className="border-t-2 border-[var(--expo-line)] bg-white p-4 text-center">
          <Link className="font-bold text-[var(--expo-blue)] underline" href="/">
            Volver a la landing
          </Link>
        </footer>
      </section>
    </main>
  );
}
