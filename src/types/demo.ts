// ─── Navegación ───────────────────────────────────────────────────────────────

// Omar publica estos contratos desde la configuración del shell. Reexportarlos
// evita mantener una segunda unión de tabs que pueda divergir al integrar.
import type {
  DemoTab,
  FeatureScreenProps,
} from "@/config/navigation";

export type { DemoTab, FeatureScreenProps };

// ─── Estado NFC ───────────────────────────────────────────────────────────────

export type NfcStage =
  | "idle"
  | "searching"
  | "detected"
  | "confirming"
  | "success"
  | "duplicate"
  | "error";

// ─── Categorías ───────────────────────────────────────────────────────────────

export type StandCategory =
  | "technology"
  | "health"
  | "finance"
  | "gastronomy"
  | "education"
  | "startups";

// ─── Entidades del dominio ────────────────────────────────────────────────────

export interface DemoEvent {
  id: string;
  name: string;
  city: string;
  startsAt: string;
  endsAt: string;
  /** Marca explícita de que este evento es simulado. */
  isSimulated: true;
}

export interface Category {
  id: StandCategory;
  label: string;
  /** Token de color CSS, e.g. "var(--expo-blue)". */
  colorToken: string;
}

export interface Zone {
  id: string;
  name: string;
  shortCode: string;
  categoryIds: StandCategory[];
}

export interface Stand {
  id: string;
  name: string;
  category: StandCategory;
  description: string;
  zoneId: string;
  boothCode: string;
  logoPath: string;
  tags: string[];
  activity?: string;
  promotion?: string;
  /** Fijo en 50 para la versión 1 de la demo. */
  points: 50;
  featured?: boolean;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  /** IDs de stands que cuentan para esta misión. */
  standIds: string[];
  /** Número de stands distintos que deben visitarse para completarla. */
  requiredVisits: number;
  rewardId: string;
  featured?: boolean;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  requiredPoints: number;
  imagePath?: string;
}

export interface Activity {
  id: string;
  standId: string;
  title: string;
  /** ISO 8601 */
  startsAt: string;
}

export interface DemoNotification {
  id: string;
  title: string;
  message: string;
  /** ISO 8601 */
  createdAt: string;
}

export interface DemoLocation {
  zoneId: string;
  x: number;
  y: number;
  label: string;
}

export interface Visit {
  id: string;
  standId: string;
  /** ISO 8601 */
  visitedAt: string;
  pointsAwarded: number;
}

// ─── Estado del store ─────────────────────────────────────────────────────────

export interface DemoState {
  activeTab: DemoTab;
  points: number;
  level: number;
  selectedStandId: string | null;
  selectedZoneId: string | null;
  visitedStandIds: string[];
  favoriteStandIds: string[];
  recentVisits: Visit[];
  lastKnownLocation: DemoLocation;
  nfcStage: NfcStage;
  /** true después de que el middleware persist hidrata desde localStorage. */
  hasHydrated: boolean;
}

// ─── Acciones del store ───────────────────────────────────────────────────────

export interface DemoActions {
  /** Marca que la lectura inicial de localStorage terminó. */
  setHasHydrated(): void;
  setActiveTab(tab: DemoTab): void;
  selectStand(standId: string | null): void;
  selectZone(zoneId: string | null): void;
  toggleFavorite(standId: string): void;

  /** Inicia el flujo NFC con un stand opcional; resuelve el stand objetivo. */
  startNfcScan(standId?: string): void;
  /** Avanza de `searching` a `detected`. Lo llama el temporizador de NfcScreen. */
  markNfcDetected(): void;
  /** Avanza de `detected` a `confirming`. */
  beginNfcConfirmation(): void;
  /**
   * Transición atómica: valida el stand, registra la visita, suma puntos,
   * recalcula nivel, persiste y avanza a `success` o `duplicate`/`error`.
   */
  confirmVisit(standId: string): void;
  /** Avanza cualquier estado a `error`. */
  failNfcScan(): void;
  /** Resetea el flujo NFC a `idle` sin tocar datos de visitas. */
  resetNfcFlow(): void;
  /** Restaura el estado inicial completo y limpia la clave de localStorage. */
  resetDemo(): void;
}

export type DemoStore = DemoState & DemoActions;

// ─── Estado persistido ────────────────────────────────────────────────────────

/**
 * Subconjunto serializable del estado que se guarda en localStorage.
 * NO incluye: activeTab, nfcStage, hasHydrated, acciones ni catálogo.
 */
export interface PersistedDemoStateV1 {
  points: number;
  level: number;
  selectedStandId: string | null;
  selectedZoneId: string | null;
  visitedStandIds: string[];
  favoriteStandIds: string[];
  recentVisits: Visit[];
  lastKnownLocation: DemoLocation;
}
