import type { Metadata } from "next";

import { DemoAppClient } from "@/features/missions/DemoAppClient";

export const metadata: Metadata = {
  title: "Probar demo",
  description:
    "Simulación móvil de ExpoVia para recorrer una feria, visitar stands y completar misiones.",
};

export default function DemoPage() {
  return <DemoAppClient />;
}
