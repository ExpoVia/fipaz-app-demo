"use client";

import { Cross, DoorOpen, Info, Landmark, LogOut, MapPin, Music, Utensils } from "lucide-react";
import type { KeyboardEvent } from "react";
import { categoryMeta, pois, userLocation, zones } from "../data/expoMapData";
import type { PoiType, RouteDefinition, Stand, StandCategory } from "../types";

interface ExpoMapSvgProps {
  stands: Stand[];
  selectedStandId: string | null;
  visitedStandIds: string[];
  activeCategories: StandCategory[];
  activePoiTypes: PoiType[];
  zoomLevel: "general" | "zone" | "stand";
  activeRoute: RouteDefinition | null;
  onZonePress: (zoneId: string) => void;
  onStandPress: (standId: string) => void;
}

const poiIcons = {
  entrance: DoorOpen,
  exit: LogOut,
  toilet: Landmark,
  food: Utensils,
  stage: Music,
  info: Info,
  health: Cross,
} satisfies Record<PoiType, typeof DoorOpen>;

function handleKeyPress(event: KeyboardEvent<SVGGElement>, action: () => void) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    action();
  }
}

export function ExpoMapSvg({
  stands,
  selectedStandId,
  visitedStandIds,
  activeCategories,
  activePoiTypes,
  zoomLevel,
  activeRoute,
  onZonePress,
  onStandPress,
}: ExpoMapSvgProps) {
  const visibleStands = stands.filter((stand) => activeCategories.includes(stand.category));
  const visiblePois = pois.filter((poi) => activePoiTypes.includes(poi.type));
  const selectedStand = stands.find((stand) => stand.id === selectedStandId);
  const showZoneDetails = zoomLevel !== "general";
  const showStandDetails = zoomLevel === "stand";

  return (
    <svg
      aria-label="Mapa demostrativo interactivo de ExpoVia"
      className="h-full w-full select-none"
      role="img"
      viewBox="0 0 900 680"
    >
      <defs>
        <pattern id="expo-map-grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" fill="none" stroke="#0f172a" strokeOpacity="0.05" strokeWidth="3" />
        </pattern>
        <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" floodColor="#172554" floodOpacity="0.16" stdDeviation="8" />
        </filter>
      </defs>

      <rect fill="#f8fbff" height="680" width="900" />
      <rect fill="url(#expo-map-grid)" height="680" opacity="0.7" width="900" />
      <path
        d="M48 42H850C871 42 884 58 879 79L838 626C835 645 820 658 801 658H76C55 658 42 642 45 621L22 382C20 365 31 352 48 350V42Z"
        fill="#ffffff"
        filter="url(#soft-shadow)"
        stroke="#172554"
        strokeOpacity="0.18"
        strokeWidth="8"
      />

      <path d="M421 76H483V620H421Z" fill="#eef2f7" stroke="#cbd5e1" strokeDasharray="12 12" strokeWidth="3" />
      <path d="M64 358H840" fill="none" stroke="#eef2f7" strokeLinecap="round" strokeWidth="60" />
      <path d="M64 358H840" fill="none" stroke="#cbd5e1" strokeDasharray="14 16" strokeLinecap="round" strokeWidth="3" />

      {zones.map((zone) => {
        const isFiltered = !activeCategories.includes(zone.category);

        return (
          <g
            aria-label={`${zone.name}: ${zone.description}`}
            className="cursor-pointer outline-none transition-opacity focus-visible:opacity-100"
            id={`zone-${zone.id}`}
            key={zone.id}
            onClick={() => onZonePress(zone.id)}
            onKeyDown={(event) => handleKeyPress(event, () => onZonePress(zone.id))}
            opacity={isFiltered ? 0.22 : 1}
            role="button"
            tabIndex={0}
          >
            <path d={zone.path} fill={zone.color} stroke={zone.borderColor} strokeWidth="8" />
            <path d={zone.path} fill="none" opacity="0.45" stroke="#ffffff" strokeWidth="16" />
            <text
              fill="#10233f"
              fontFamily="monospace"
              fontSize="24"
              fontWeight="900"
              textAnchor="middle"
              x={zone.labelX}
              y={zone.labelY}
            >
              {zone.name}
            </text>
            <text
              fill="#10233f"
              fontFamily="monospace"
              fontSize="16"
              fontWeight="800"
              textAnchor="middle"
              x={zone.labelX}
              y={zone.labelY + 28}
            >
              {zone.shortName}
            </text>
          </g>
        );
      })}

      {showZoneDetails ? (
        <g aria-label="Pasillos y filas">
          {["A", "B", "C", "D"].map((row, index) => (
            <g key={row}>
              <rect fill="#ffffff" height="24" opacity="0.76" rx="4" width="44" x={102 + index * 206} y="360" />
              <text fill="#334155" fontFamily="monospace" fontSize="14" fontWeight="900" textAnchor="middle" x={124 + index * 206} y="377">
                Fila {row}
              </text>
            </g>
          ))}
        </g>
      ) : null}

      {showZoneDetails
        ? visiblePois.map((poi) => {
            const Icon = poiIcons[poi.type];
            return (
              <g aria-label={poi.label} id={`poi-${poi.id}`} key={poi.id}>
                <rect fill="#26324d" height="42" rx="8" stroke="#ffffff" strokeWidth="4" width="42" x={poi.x - 21} y={poi.y - 21} />
                <Icon aria-hidden="true" color="#ffffff" size={24} strokeWidth={2.5} x={poi.x - 12} y={poi.y - 12} />
                {showStandDetails ? (
                  <text fill="#1f2937" fontFamily="sans-serif" fontSize="12" fontWeight="800" textAnchor="middle" x={poi.x} y={poi.y + 37}>
                    {poi.label}
                  </text>
                ) : null}
              </g>
            );
          })
        : null}

      {showZoneDetails
        ? visibleStands.map((stand) => {
            const isVisited = visitedStandIds.includes(stand.id);
            const isSelected = selectedStandId === stand.id;
            const category = categoryMeta.find((item) => item.id === stand.category);

            return (
              <g
                aria-label={`${stand.code}, ${stand.name}`}
                className="cursor-pointer outline-none"
                id={`stand-${stand.id}`}
                key={stand.id}
                onClick={() => onStandPress(stand.id)}
                onKeyDown={(event) => handleKeyPress(event, () => onStandPress(stand.id))}
                role="button"
                tabIndex={0}
              >
                <rect
                  fill={isSelected ? "#fff7ed" : "#ffffff"}
                  height={stand.height}
                  rx="8"
                  stroke={isSelected ? "#f97316" : isVisited ? "#0f9f6e" : "#475569"}
                  strokeDasharray={isVisited && !isSelected ? "8 5" : undefined}
                  strokeWidth={isSelected ? 6 : 3}
                  width={stand.width}
                  x={stand.x}
                  y={stand.y}
                />
                <rect fill="#0f172a" height="24" rx="5" width="32" x={stand.x + 8} y={stand.y + 8} />
                <text fill="#ffffff" fontFamily="monospace" fontSize="12" fontWeight="900" textAnchor="middle" x={stand.x + 24} y={stand.y + 24}>
                  {stand.logoText}
                </text>
                <text fill="#172554" fontFamily="monospace" fontSize="13" fontWeight="900" x={stand.x + 46} y={stand.y + 24}>
                  {stand.code}
                </text>
                {showStandDetails ? (
                  <>
                    <text fill="#334155" fontFamily="sans-serif" fontSize="12" fontWeight="800" x={stand.x + 10} y={stand.y + stand.height - 12}>
                      {stand.shortName}
                    </text>
                    <text fill="#64748b" fontFamily="monospace" fontSize="9" fontWeight="800" x={stand.x + stand.width - 31} y={stand.y + stand.height - 12}>
                      {category?.pattern}
                    </text>
                  </>
                ) : null}
              </g>
            );
          })
        : null}

      <g id="you-are-here">
        <circle cx={userLocation.x} cy={userLocation.y} fill="#0ea5e9" opacity="0.18" r="24" />
        <circle cx={userLocation.x} cy={userLocation.y} fill="#0284c7" r="10" stroke="#ffffff" strokeWidth="4" />
        {showZoneDetails ? (
          <>
            <MapPin aria-hidden="true" color="#075985" size={28} strokeWidth={3} x={userLocation.x + 12} y={userLocation.y - 38} />
            <text fill="#075985" fontFamily="sans-serif" fontSize="13" fontWeight="900" x={userLocation.x + 42} y={userLocation.y - 20}>
              Tu estas aqui
            </text>
          </>
        ) : null}
      </g>

      {activeRoute ? (
        <g aria-label="Ruta aproximada de demostracion">
          <polyline
            fill="none"
            points={activeRoute.points}
            stroke="#ef4444"
            strokeDasharray="14 10"
            strokeDashoffset="96"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="10"
          >
            <animate attributeName="stroke-dashoffset" dur="1.1s" fill="freeze" from="96" to="0" />
          </polyline>
          <text fill="#991b1b" fontFamily="sans-serif" fontSize="15" fontWeight="900" x="482" y="334">
            Ruta aproximada de demostracion
          </text>
        </g>
      ) : null}

      {selectedStand ? (
        <circle
          cx={selectedStand.x + selectedStand.width / 2}
          cy={selectedStand.y - 14}
          fill="#f97316"
          r="9"
          stroke="#ffffff"
          strokeWidth="4"
        />
      ) : null}

      {zoomLevel === "general" ? (
        <text fill="#475569" fontFamily="sans-serif" fontSize="18" fontWeight="900" textAnchor="middle" x="450" y="650">
          Acerca para ver los stands
        </text>
      ) : null}

      <text fill="#64748b" fontFamily="monospace" fontSize="14" fontWeight="900" x="64" y="70">
        Mapa demostrativo
      </text>
    </svg>
  );
}
