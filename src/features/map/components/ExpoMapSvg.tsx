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

const venueLabels = [
  { label: "Salon Chuquisaca", x: 142, y: 138 },
  { label: "Salon Potosi", x: 270, y: 138 },
  { label: "Plaza Interaccion", x: 354, y: 334 },
  { label: "Salon Arena La Paz", x: 470, y: 124 },
  { label: "Salon Cochabamba", x: 604, y: 124 },
  { label: "Plaza Encuentro", x: 710, y: 334 },
  { label: "Salon Murillo", x: 770, y: 138 },
  { label: "Salon Santa Cruz", x: 872, y: 138 },
  { label: "Teatro Illimani", x: 884, y: 480 },
];

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
      aria-label="Mapa demostrativo interactivo inspirado en Campo Ferial Chuquiago Marka"
      className="h-full w-full select-none"
      role="img"
      viewBox="0 0 1020 680"
    >
      <defs>
        <pattern id="expo-map-grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" fill="none" stroke="#0f172a" strokeOpacity="0.05" strokeWidth="3" />
        </pattern>
        <pattern id="glass-grid" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 0H12V12H0Z" fill="none" stroke="#172554" strokeOpacity="0.26" strokeWidth="1.5" />
        </pattern>
        <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" floodColor="#172554" floodOpacity="0.16" stdDeviation="8" />
        </filter>
        <marker id="arrow" markerHeight="8" markerWidth="10" orient="auto" refX="8" refY="4">
          <path d="M0 0L8 4L0 8Z" fill="#0f172a" />
        </marker>
      </defs>

      <rect fill="#f8fbff" height="680" width="1020" />
      <rect fill="url(#expo-map-grid)" height="680" opacity="0.65" width="1020" />
      <path
        d="M42 76H966C986 76 998 90 994 110L968 602C966 622 952 636 932 636H78C58 636 44 622 42 602L22 110C20 90 32 76 42 76Z"
        fill="#ffffff"
        filter="url(#soft-shadow)"
        stroke="#172554"
        strokeOpacity="0.18"
        strokeWidth="8"
      />

      <path d="M350 296H360V376H350Z" fill="#dbe7ef" />
      <path d="M708 296H718V376H708Z" fill="#dbe7ef" />
      <path d="M356 326H362L394 326" fill="none" stroke="#cbd5e1" strokeDasharray="10 8" strokeWidth="8" />
      <path d="M708 326H714L742 326" fill="none" stroke="#cbd5e1" strokeDasharray="10 8" strokeWidth="8" />

      {zones.map((zone) => {
        const isFiltered = !visibleStands.some((stand) => stand.zoneId === zone.id);

        return (
          <g
            aria-label={`${zone.name}: ${zone.description}`}
            className="cursor-pointer outline-none transition-opacity focus-visible:opacity-100"
            id={`zone-${zone.id}`}
            key={zone.id}
            onClick={() => onZonePress(zone.id)}
            onKeyDown={(event) => handleKeyPress(event, () => onZonePress(zone.id))}
            opacity={isFiltered ? 0.24 : 1}
            role="button"
            tabIndex={0}
          >
            <path d={zone.path} fill={zone.color} stroke={zone.borderColor} strokeWidth="7" />
            <path d={zone.path} fill="url(#glass-grid)" opacity="0.42" />
            <path d={zone.path} fill="none" opacity="0.42" stroke="#ffffff" strokeWidth="14" />
            <text
              fill="#10233f"
              fontFamily="monospace"
              fontSize="23"
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
              fontSize="13"
              fontWeight="800"
              textAnchor="middle"
              x={zone.labelX}
              y={zone.labelY + 26}
            >
              {zone.shortName}
            </text>
          </g>
        );
      })}

      <g aria-label="Torres y pasarelas">
        <rect fill="#f8fafc" height="390" rx="8" stroke="#cbd5e1" strokeWidth="4" width="36" x="336" y="124" />
        <rect fill="#f8fafc" height="390" rx="8" stroke="#cbd5e1" strokeWidth="4" width="36" x="684" y="124" />
        <path d="M350 118H720" fill="none" stroke="#f8fafc" strokeLinecap="round" strokeWidth="24" />
        <path d="M350 118H720" fill="none" stroke="#cbd5e1" strokeDasharray="16 12" strokeLinecap="round" strokeWidth="4" />
        {showZoneDetails ? (
          <>
            <text fill="#334155" fontFamily="sans-serif" fontSize="13" fontWeight="900" textAnchor="middle" x="356" y="292">
              Pasarela Rojo-Amarillo
            </text>
            <text fill="#334155" fontFamily="sans-serif" fontSize="13" fontWeight="900" textAnchor="middle" x="714" y="292">
              Pasarela Amarillo-Verde
            </text>
          </>
        ) : null}
      </g>

      {showZoneDetails ? (
        <g aria-label="Calles internas y salones">
          {venueLabels.map((item) => (
            <text fill="#24324c" fontFamily="sans-serif" fontSize="13" fontWeight="900" key={item.label} textAnchor="middle" x={item.x} y={item.y}>
              {item.label}
            </text>
          ))}
          <text fill="#475569" fontFamily="monospace" fontSize="20" letterSpacing="6" textAnchor="middle" x="212" y="332">
            CALLE 2
          </text>
          <text fill="#475569" fontFamily="monospace" fontSize="20" letterSpacing="6" textAnchor="middle" x="212" y="432">
            CALLE 1
          </text>
          <text fill="#475569" fontFamily="monospace" fontSize="20" letterSpacing="6" textAnchor="middle" x="534" y="326">
            CALLE 3
          </text>
          <text fill="#475569" fontFamily="monospace" fontSize="20" letterSpacing="6" textAnchor="middle" x="534" y="430">
            CALLE 2
          </text>
          <text fill="#475569" fontFamily="monospace" fontSize="16" letterSpacing="3" textAnchor="middle" x="828" y="342">
            BOULEVARD ENCANTADO
          </text>
          <path d="M112 560H912" fill="none" stroke="#0f172a" strokeOpacity="0.7" strokeWidth="4" />
          <path d="M430 584H594" fill="none" markerEnd="url(#arrow)" stroke="#0f172a" strokeWidth="8" />
          <text fill="#1f2937" fontFamily="sans-serif" fontSize="20" fontWeight="900" textAnchor="middle" x="504" y="592">
            RAMPAS DE SUBIDA Y BAJADA
          </text>
          <rect fill="#eef2f7" height="52" rx="8" stroke="#94a3b8" strokeWidth="3" width="170" x="540" y="506" />
          <text fill="#334155" fontFamily="sans-serif" fontSize="17" fontWeight="900" textAnchor="middle" x="625" y="538">
            Plaza de comida
          </text>
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
                  fill={isSelected ? "#fff7ed" : "#fffdf4"}
                  height={stand.height}
                  rx="5"
                  stroke={isSelected ? "#f97316" : isVisited ? "#0f9f6e" : "#1f2937"}
                  strokeDasharray={isVisited && !isSelected ? "8 5" : undefined}
                  strokeWidth={isSelected ? 6 : 3}
                  width={stand.width}
                  x={stand.x}
                  y={stand.y}
                />
                <rect fill="#0f172a" height="24" rx="3" width="32" x={stand.x + 8} y={stand.y + 8} />
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
          <text fill="#991b1b" fontFamily="sans-serif" fontSize="15" fontWeight="900" x="536" y="520">
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
        <text fill="#475569" fontFamily="sans-serif" fontSize="18" fontWeight="900" textAnchor="middle" x="510" y="650">
          Acerca para ver stands, calles y servicios
        </text>
      ) : null}

      <text fill="#64748b" fontFamily="monospace" fontSize="14" fontWeight="900" x="64" y="108">
        Mapa demostrativo inspirado en Chuquiago Marka
      </text>
    </svg>
  );
}
