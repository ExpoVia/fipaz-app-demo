import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/shared";

interface TopBarProps {
  title: string;
  description: string;
}

export function TopBar({ title, description }: TopBarProps) {
  return (
    <header className="app-topbar">
      <Link
        className="app-topbar-action"
        href="/"
        aria-label="Volver al sitio de ExpoVia"
      >
        <ArrowLeft aria-hidden="true" size={18} strokeWidth={2.5} />
        <span className="hidden min-[360px]:inline">Sitio</span>
      </Link>

      <div className="min-w-0 text-center" aria-live="polite">
        <p className="truncate text-sm font-black text-white">{title}</p>
        <p className="sr-only">{description}</p>
      </div>

      <BrandMark compact inverse />
    </header>
  );
}
