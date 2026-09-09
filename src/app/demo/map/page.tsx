import { ExpoMapDemoScreen } from "@/features/map";

export default function DemoMapPage() {
  return (
    <main className="grid min-h-dvh place-items-center bg-[#0f172a] p-0 sm:p-6">
      <section className="h-dvh w-full max-w-[430px] overflow-hidden bg-white sm:h-[820px] sm:border-8 sm:border-white sm:shadow-2xl">
        <ExpoMapDemoScreen />
      </section>
    </main>
  );
}
