"use client";

import { LocateFixed, Minus, Plus, RotateCcw, Route, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { categoryMeta, expoStands, poiMeta, routeDefinitions, zones } from "../data/expoMapData";
import type { ExpoMapProps, PoiType, RouteDefinition, StandCategory } from "../types";
import { ExpoMapSvg } from "./ExpoMapSvg";

type ZoomLevel = "general" | "zone" | "stand";
type ZoomToElement = (node: string, scale?: number, animationTime?: number) => void;

const allCategories = categoryMeta.map((category) => category.id);
const allPoiTypes = poiMeta.map((poi) => poi.id);

function getZoomLevel(scale: number): ZoomLevel {
  if (scale >= 2.4) {
    return "stand";
  }

  if (scale >= 1.5) {
    return "zone";
  }

  return "general";
}

function toggleItem<T extends string>(items: T[], item: T, fallback: T[]) {
  if (items.includes(item)) {
    const nextItems = items.filter((current) => current !== item);
    return nextItems.length > 0 ? nextItems : fallback;
  }

  return [...items, item];
}

function InitialZoneFocus({
  initialZoneId,
  zoomToElement,
}: {
  initialZoneId: string | null;
  zoomToElement: ZoomToElement;
}) {
  const appliedRef = useRef(false);

  useEffect(() => {
    if (!initialZoneId || appliedRef.current) {
      return;
    }

    appliedRef.current = true;
    window.setTimeout(() => zoomToElement(`zone-${initialZoneId}`, 1.85, 0), 50);
  }, [initialZoneId, zoomToElement]);

  return null;
}

export function ExpoInteractiveMap({
  stands,
  selectedStandId,
  visitedStandIds,
  onSelectStand,
  onOpenStand,
  initialZoneId = null,
}: ExpoMapProps) {
  const [scale, setScale] = useState(1);
  const [activeCategories, setActiveCategories] = useState<StandCategory[]>(allCategories);
  const [activePoiTypes, setActivePoiTypes] = useState<PoiType[]>(allPoiTypes);
  const [activeRoute, setActiveRoute] = useState<RouteDefinition | null>(null);
  const [sheetStandId, setSheetStandId] = useState<string | null>(selectedStandId);

  const selectedStand = useMemo(
    () => stands.find((stand) => stand.id === sheetStandId) ?? null,
    [sheetStandId, stands],
  );

  return (
    <section className="relative flex h-full min-h-[720px] w-full flex-col overflow-hidden bg-[#eef7fb] text-[#12213a]">
      <TransformWrapper
        centerOnInit
        doubleClick={{ mode: "zoomIn" }}
        initialScale={1}
        maxScale={4}
        minScale={1}
        onTransform={(_, state) => setScale(state.scale)}
        wheel={{ step: 0.16 }}
      >
        {({ resetTransform, zoomIn, zoomOut, zoomToElement }) => {
          const focusZone = (zoneId: string) => {
            setActiveRoute(null);
            zoomToElement(`zone-${zoneId}`, 1.85, 420);
          };

          const focusStand = (standId: string) => {
            setActiveRoute(null);
            setSheetStandId(standId);
            onSelectStand(standId);
            onOpenStand(standId);
            zoomToElement(`stand-${standId}`, 2.75, 360);
          };

          const routeToStand = (standId: string) => {
            const route = routeDefinitions.find((item) => item.standId === standId) ?? routeDefinitions[0];
            setActiveRoute(route);
            zoomToElement("you-are-here", 2.25, 360);
          };

          return (
            <>
              <InitialZoneFocus initialZoneId={initialZoneId} zoomToElement={zoomToElement} />
              <div className="z-20 border-b border-[#d8e3ef] bg-white/95 px-3 py-3 shadow-sm backdrop-blur">
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {categoryMeta.map((category) => {
                    const isActive = activeCategories.includes(category.id);
                    return (
                      <button
                        aria-pressed={isActive}
                        className={`min-h-10 shrink-0 border px-3 text-sm font-black transition ${
                          isActive
                            ? "border-[#152442] bg-[#152442] text-white"
                            : "border-[#cbd5e1] bg-white text-[#34435f]"
                        }`}
                        key={category.id}
                        onClick={() => setActiveCategories((items) => toggleItem(items, category.id, allCategories))}
                        type="button"
                      >
                        {category.label}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2 flex items-center gap-2 overflow-x-auto pb-1">
                  {poiMeta.map((poi) => {
                    const Icon = poi.icon;
                    const isActive = activePoiTypes.includes(poi.id);
                    return (
                      <button
                        aria-label={`Filtrar ${poi.label}`}
                        aria-pressed={isActive}
                        className={`grid h-10 w-10 shrink-0 place-items-center border transition ${
                          isActive
                            ? "border-[#0067d8] bg-[#e7f1ff] text-[#0056b3]"
                            : "border-[#cbd5e1] bg-white text-[#526071]"
                        }`}
                        key={poi.id}
                        onClick={() => setActivePoiTypes((items) => toggleItem(items, poi.id, allPoiTypes))}
                        title={poi.label}
                        type="button"
                      >
                        <Icon aria-hidden="true" size={20} strokeWidth={2.5} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="relative min-h-0 flex-1">
                <TransformComponent
                  contentClass="!h-full !w-full"
                  wrapperClass="!h-full !w-full cursor-grab active:cursor-grabbing"
                >
                  <ExpoMapSvg
                    activeCategories={activeCategories}
                    activePoiTypes={activePoiTypes}
                    activeRoute={activeRoute}
                    onStandPress={focusStand}
                    onZonePress={focusZone}
                    selectedStandId={selectedStandId}
                    stands={stands}
                    visitedStandIds={visitedStandIds}
                    zoomLevel={getZoomLevel(scale)}
                  />
                </TransformComponent>

                <div className="pointer-events-none absolute inset-x-3 bottom-4 z-20 flex items-end justify-between gap-3">
                  <div className="pointer-events-auto flex items-center gap-2 border border-[#cbd5e1] bg-white p-1 shadow-[4px_4px_0_#172554]">
                    <button aria-label="Acercar" className="grid h-10 w-10 place-items-center bg-[#e7f1ff] text-[#0056b3]" onClick={() => zoomIn(0.55)} type="button">
                      <Plus aria-hidden="true" size={20} strokeWidth={3} />
                    </button>
                    <button aria-label="Alejar" className="grid h-10 w-10 place-items-center bg-[#f8fafc] text-[#334155]" onClick={() => zoomOut(0.55)} type="button">
                      <Minus aria-hidden="true" size={20} strokeWidth={3} />
                    </button>
                    <button aria-label="Centrar" className="grid h-10 w-10 place-items-center bg-[#f8fafc] text-[#334155]" onClick={() => resetTransform(320)} type="button">
                      <RotateCcw aria-hidden="true" size={18} strokeWidth={2.6} />
                    </button>
                  </div>
                  <button
                    aria-label="¿Dónde estoy?"
                    className="pointer-events-auto inline-flex min-h-11 items-center gap-2 border border-[#0284c7] bg-white px-3 text-sm font-black text-[#075985] shadow-[4px_4px_0_#0c4a6e]"
                    onClick={() => zoomToElement("you-are-here", 2.2, 360)}
                    type="button"
                  >
                    <LocateFixed aria-hidden="true" size={18} strokeWidth={2.8} />
                    ¿Dónde estoy?
                  </button>
                </div>

                <div className="absolute left-3 top-3 z-10 rounded-sm border border-[#d8e3ef] bg-white/90 px-3 py-2 text-xs font-black uppercase text-[#526071]">
                  Zoom {scale.toFixed(1)}x
                </div>
              </div>

              <aside className="z-10 border-t border-[#d8e3ef] bg-white px-3 py-3">
                <div className="flex gap-2 overflow-x-auto">
                  {zones.map((zone) => (
                    <button
                      className="min-h-10 shrink-0 border border-[#cbd5e1] bg-[#f8fafc] px-3 text-sm font-black text-[#24324c]"
                      key={zone.id}
                      onClick={() => focusZone(zone.id)}
                      type="button"
                    >
                      {zone.name}
                    </button>
                  ))}
                </div>
              </aside>

              {selectedStand ? (
                <div className="absolute inset-x-0 bottom-0 z-30 border-t-2 border-[#172554] bg-white shadow-2xl">
                  <div className="bg-[linear-gradient(90deg,#eef7ff,#fff4cd)] px-4 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="grid h-12 w-12 shrink-0 place-items-center border-2 border-[#172554] bg-[#172554] font-mono text-sm font-black text-white">
                          {selectedStand.logoText}
                        </div>
                        <div className="min-w-0">
                          <p className="font-mono text-xs font-black uppercase text-[#526071]">{selectedStand.code}</p>
                          <h2 className="truncate text-xl font-black text-[#12213a]">{selectedStand.name}</h2>
                        </div>
                      </div>
                      <button
                        aria-label="Cerrar ficha"
                        className="grid h-10 w-10 shrink-0 place-items-center border border-[#cbd5e1] bg-white text-[#334155]"
                        onClick={() => {
                          setSheetStandId(null);
                          setActiveRoute(null);
                        }}
                        type="button"
                      >
                        <X aria-hidden="true" size={20} strokeWidth={2.6} />
                      </button>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#475569]">{selectedStand.summary}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <button
                        className="inline-flex min-h-11 items-center gap-2 border-2 border-[#172554] bg-[#ffe08a] px-3 text-sm font-black text-[#172554] shadow-[3px_3px_0_#172554]"
                        onClick={() => routeToStand(selectedStand.id)}
                        type="button"
                      >
                        <Route aria-hidden="true" size={18} strokeWidth={2.8} />
                        Como llegar
                      </button>
                      {activeRoute ? (
                        <button
                          className="min-h-11 border border-[#fecaca] bg-[#fff1f2] px-3 text-sm font-black text-[#991b1b]"
                          onClick={() => setActiveRoute(null)}
                          type="button"
                        >
                          Cancelar ruta
                        </button>
                      ) : null}
                    </div>
                    {activeRoute ? (
                      <p className="mt-3 border-l-4 border-[#ef4444] bg-white px-3 py-2 text-sm font-bold text-[#334155]">
                        Ruta aproximada de demostracion. {activeRoute.instruction}
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </>
          );
        }}
      </TransformWrapper>
    </section>
  );
}

export function ExpoMapDemoScreen() {
  const [selectedStandId, setSelectedStandId] = useState<string | null>(null);

  return (
    <ExpoInteractiveMap
      onOpenStand={setSelectedStandId}
      onSelectStand={setSelectedStandId}
      selectedStandId={selectedStandId}
      stands={expoStands}
      visitedStandIds={["tec-02", "gas-02", "fin-01"]}
    />
  );
}
