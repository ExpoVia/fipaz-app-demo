import type { ElementType } from "react";

export type StandCategory = "technology" | "health" | "food" | "finance";

export type PoiType =
  | "entrance"
  | "exit"
  | "toilet"
  | "food"
  | "stage"
  | "info"
  | "health";

export interface Zone {
  id: string;
  name: string;
  shortName: string;
  category: StandCategory;
  color: string;
  borderColor: string;
  labelX: number;
  labelY: number;
  path: string;
  description: string;
}

export interface Stand {
  id: string;
  code: string;
  name: string;
  shortName: string;
  category: StandCategory;
  zoneId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  logoText: string;
  summary: string;
  routeHint: string;
  featured?: boolean;
}

export interface Poi {
  id: string;
  type: PoiType;
  label: string;
  x: number;
  y: number;
}

export interface RouteDefinition {
  standId: string;
  points: string;
  instruction: string;
}

export interface CategoryMeta {
  id: StandCategory;
  label: string;
  pattern: string;
}

export interface PoiMeta {
  id: PoiType;
  label: string;
  icon: ElementType;
}

export interface ExpoMapProps {
  stands: Stand[];
  selectedStandId: string | null;
  visitedStandIds: string[];
  onSelectStand: (standId: string) => void;
  onOpenStand: (standId: string) => void;
  initialZoneId?: string | null;
}
