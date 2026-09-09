import type { ReactNode } from "react";

interface ModulePlaceholderProps {
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
  accent?: "blue" | "green" | "yellow" | "purple" | "pink";
  children?: ReactNode;
}

const accentStyles = {
  blue: "bg-[var(--expo-sky)] text-[var(--expo-navy)]",
  green: "bg-[var(--expo-mint)] text-[var(--expo-navy)]",
  yellow: "bg-[#ffe7a0] text-[var(--expo-navy)]",
  purple: "bg-[#e3d2ef] text-[var(--expo-navy)]",
  pink: "bg-[#fbdbe7] text-[var(--expo-navy)]",
} as const;

export function ModulePlaceholder({
  eyebrow,
  title,
  description,
  icon,
  accent = "blue",
  children,
}: ModulePlaceholderProps) {
  return (
    <div className="min-h-full px-4 py-5 sm:px-5">
      <section
        className={`pixel-panel relative overflow-hidden p-5 ${accentStyles[accent]}`}
      >
        <span className="absolute -right-5 -top-5 size-24 rotate-12 border-8 border-white/30" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="pixel-label opacity-75">{eyebrow}</p>
            <h2 className="mt-2 text-2xl font-black leading-tight">{title}</h2>
            <p className="mt-2 max-w-xs text-sm font-medium leading-6 opacity-80">
              {description}
            </p>
          </div>
          <span className="grid size-12 shrink-0 place-items-center border-2 border-current bg-white/75 shadow-[3px_3px_0_current]">
            {icon}
          </span>
        </div>
      </section>

      <div className="mt-4 grid gap-3">
        {children ?? (
          <>
            <div className="pixel-card h-24 animate-pulse" />
            <div className="grid grid-cols-2 gap-3">
              <div className="pixel-card h-28 animate-pulse" />
              <div className="pixel-card h-28 animate-pulse" />
            </div>
            <div className="pixel-card h-36 animate-pulse" />
          </>
        )}
      </div>
    </div>
  );
}
