import type { StandCategory } from "@/lib/types";

interface CategoryBadgeProps {
  category: StandCategory | "general";
  size?: number;
  showLabel?: boolean;
  className?: string;
}

const CATEGORY_CONFIG: Record<
  StandCategory | "general",
  { emoji: string; label: string; bg: string; text: string }
> = {
  tecnologia: { emoji: "", label: "Tecnología", bg: "bg-blue-100", text: "text-blue-700" },
  gastronomia: { emoji: "", label: "Gastronomía", bg: "bg-orange-100", text: "text-orange-700" },
  finanzas: { emoji: "", label: "Finanzas", bg: "bg-yellow-100", text: "text-yellow-700" },
  educacion: { emoji: "", label: "Educación", bg: "bg-purple-100", text: "text-purple-700" },
  startups: { emoji: "", label: "Startups", bg: "bg-green-100", text: "text-green-700" },
  industria: { emoji: "", label: "Industria", bg: "bg-teal-100", text: "text-teal-700" },
  general: { emoji: "", label: "General", bg: "bg-slate-100", text: "text-slate-600" },
};

/**
 * Small category pill/badge for mission cards and stand profiles.
 * Uses emoji + label; no external icon library needed.
 */
export function CategoryBadge({
  category,
  showLabel = true,
  className = "",
}: CategoryBadgeProps) {
  const config = CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG.general;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg border border-transparent px-2 py-0.5 text-xs font-bold ${config.bg} ${config.text} ${className}`}
      aria-label={config.label}
    >
      <span aria-hidden="true">{config.emoji}</span>
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}

export { CATEGORY_CONFIG };
