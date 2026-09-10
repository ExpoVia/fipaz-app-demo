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

// ─── Demo visits ───────────────────────────────────────────────────────────

export interface DemoVisit {
  standId: string;
  standName: string;
  timestamp: number;
}

// ─── Demo state ────────────────────────────────────────────────────────────

export interface DemoState {
  points: number;
  level: number;
  visitedStandIds: string[];
  favoriteStandIds: string[];
  missionProgress: Record<string, number>;
  /** Ids of missions where special action has been completed */
  specialActionsDone: string[];
  /** Ids of unlocked missions (initially empty; unlocked as base missions complete) */
  unlockedMissionIds: string[];
  recentVisits: DemoVisit[];
  redeemedRewardIds: string[];
  nfcStage: "idle" | "scanning" | "detected" | "success" | "duplicate";
  selectedStandId: string | null;
}
