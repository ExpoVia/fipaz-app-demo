// ─── Categorías de stands ──────────────────────────────────────────────────

export type StandCategory =
  | "tecnologia"
  | "gastronomia"
  | "finanzas"
  | "educacion"
  | "startups"
  | "industria";

// ─── Misiones ──────────────────────────────────────────────────────────────

export type MissionStatus = "locked" | "active" | "completed";

export interface MissionStand {
  standId: string;
  standName: string;
  visited: boolean;
}

export interface Mission {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: StandCategory | "general";
  target: number;
  rewardPoints: number;
  standIds?: string[];
  /** Missions that must be completed before this unlocks */
  unlockedBy?: string;
  /** Special action type beyond stand visits */
  specialAction?: "selfie" | "share" | "agenda";
  emoji: string;
  color: string;         // Tailwind bg color token
  accentColor: string;   // Tailwind text/border color token
}

// ─── Rewards ───────────────────────────────────────────────────────────────

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  imagePath: string;
  stockLabel?: string;
  emoji: string;
}
