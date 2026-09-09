import {
  Cross,
  DoorOpen,
  Info,
  Landmark,
  LogOut,
  Music,
  Utensils,
} from "lucide-react";
import type { CategoryMeta, Poi, PoiMeta, RouteDefinition, Stand, Zone } from "../types";

export const categoryMeta: CategoryMeta[] = [
  { id: "technology", label: "Tecnologia", pattern: "TEC" },
  { id: "health", label: "Salud", pattern: "SAL" },
  { id: "food", label: "Gastronomia", pattern: "GAS" },
  { id: "finance", label: "Finanzas", pattern: "FIN" },
];

export const zones: Zone[] = [
  {
    id: "red",
    name: "Bloque Rojo",
    shortName: "Chuquisaca / Potosi",
    category: "technology",
    color: "#f05a3a",
    borderColor: "#b91c1c",
    labelX: 204,
    labelY: 226,
    path: "M72 150H320C338 150 350 162 350 180V468C350 486 338 498 320 498H72Z",
    description: "Bloque inspirado en los salones Chuquisaca y Potosi, con filas tipo feria del libro.",
  },
  {
    id: "yellow",
    name: "Bloque Amarillo",
    shortName: "Arena La Paz / Cochabamba",
    category: "food",
    color: "#f3c434",
    borderColor: "#c88900",
    labelX: 524,
    labelY: 222,
    path: "M394 134H674C694 134 708 148 708 168V474C708 492 696 504 678 504H390C372 504 360 492 360 474V168C360 148 374 134 394 134Z",
    description: "Bloque central con salones Arena La Paz y Cochabamba, conectado por plazas y pasarelas.",
  },
  {
    id: "green",
    name: "Bloque Verde",
    shortName: "Murillo / Santa Cruz / Illimani",
    category: "health",
    color: "#3fb467",
    borderColor: "#087a3a",
    labelX: 832,
    labelY: 226,
    path: "M754 150H948V498H742C724 498 712 486 712 468V180C712 162 724 150 754 150Z",
    description: "Bloque inspirado en los salones Murillo y Santa Cruz, junto al Teatro Auditorio Illimani.",
  },
];

export const expoStands: Stand[] = [
  { id: "red-01", code: "R01", name: "Altiplano Tech", shortName: "Altiplano", category: "technology", zoneId: "red", x: 104, y: 252, width: 72, height: 54, logoText: "AT", summary: "Demo ficticia de analitica para ferias y visitantes.", routeHint: "Cruza la pasarela roja y toma la calle 2.", featured: true },
  { id: "red-02", code: "R02", name: "Nexo QR", shortName: "Nexo", category: "technology", zoneId: "red", x: 190, y: 252, width: 86, height: 54, logoText: "QR", summary: "Credenciales efimeras, check-in y lectura rapida en stand.", routeHint: "Sube por el corredor central del Bloque Rojo." },
  { id: "red-03", code: "R03", name: "Kipu Editorial", shortName: "Kipu", category: "finance", zoneId: "red", x: 104, y: 346, width: 86, height: 56, logoText: "KP", summary: "Editorial ficticia con actividades y canjes de puntos.", routeHint: "Avanza por la calle 1 hasta el modulo rojo.", featured: true },
  { id: "red-04", code: "R04", name: "Made With Love", shortName: "MWL", category: "food", zoneId: "red", x: 204, y: 346, width: 92, height: 56, logoText: "ML", summary: "Degustaciones y merch artesanal para visitantes.", routeHint: "Busca el modulo inferior del Bloque Rojo." },
  { id: "yellow-01", code: "A01", name: "Sabor Costanera", shortName: "Sabor", category: "food", zoneId: "yellow", x: 400, y: 250, width: 96, height: 52, logoText: "SC", summary: "Menu ficticio de feria con promociones por puntos.", routeHint: "Desde informacion, gira hacia el Bloque Amarillo.", featured: true },
  { id: "yellow-02", code: "A02", name: "Cafe Illimani", shortName: "Cafe", category: "food", zoneId: "yellow", x: 514, y: 250, width: 96, height: 52, logoText: "CI", summary: "Cafe de altura y recargas rapidas entre pabellones.", routeHint: "Toma la calle 3 del bloque central." },
  { id: "yellow-03", code: "A03", name: "Ruta IoT", shortName: "IoT", category: "technology", zoneId: "yellow", x: 414, y: 342, width: 74, height: 58, logoText: "IO", summary: "Sensores ficticios para microlocalizacion en interiores.", routeHint: "Sigue el pasillo central y entra al bloque amarillo.", featured: true },
  { id: "yellow-04", code: "A04", name: "Billetera 360", shortName: "Wallet", category: "finance", zoneId: "yellow", x: 502, y: 342, width: 82, height: 58, logoText: "B3", summary: "Simulacion de pagos, premios y validacion de canjes.", routeHint: "Gira a la derecha en Plaza Interaccion." },
  { id: "yellow-05", code: "A05", name: "EduFin Bolivia", shortName: "EduFin", category: "finance", zoneId: "yellow", x: 598, y: 342, width: 72, height: 58, logoText: "EF", summary: "Mini charlas de educacion financiera para jovenes.", routeHint: "Avanza por la calle 2 del Bloque Amarillo.", featured: true },
  { id: "green-01", code: "V01", name: "Vita Check", shortName: "Vita", category: "health", zoneId: "green", x: 746, y: 252, width: 82, height: 56, logoText: "VC", summary: "Punto ficticio de bienestar, prevencion y orientacion.", routeHint: "Cruza la pasarela Amarillo-Verde y sube al primer modulo.", featured: true },
  { id: "green-02", code: "V02", name: "Bio Feria", shortName: "Bio", category: "health", zoneId: "green", x: 842, y: 252, width: 74, height: 56, logoText: "BF", summary: "Productos naturales y retos de habitos saludables.", routeHint: "Entra por el corredor del Bloque Verde." },
  { id: "green-03", code: "V03", name: "Patino Lab", shortName: "Lab", category: "technology", zoneId: "green", x: 746, y: 356, width: 78, height: 58, logoText: "PL", summary: "Taller ficticio para familias y experiencias interactivas.", routeHint: "Baja por Boulevard Encantado y gira a la izquierda." },
  { id: "green-04", code: "V04", name: "Infantil Colectiva", shortName: "Colectiva", category: "health", zoneId: "green", x: 842, y: 356, width: 78, height: 58, logoText: "IC", summary: "Espacio demostrativo inspirado en pabellones infantiles.", routeHint: "Sigue hacia el Teatro Illimani.", featured: true },
];

export const pois: Poi[] = [
  { id: "entrance-main", type: "entrance", label: "Ingreso Bloque", x: 508, y: 610 },
  { id: "entrance-red", type: "entrance", label: "Ingreso Rojo", x: 72, y: 520 },
  { id: "exit-green", type: "exit", label: "Salida Verde", x: 950, y: 520 },
  { id: "exit-north", type: "exit", label: "Salida Costanera", x: 508, y: 74 },
  { id: "toilet-red", type: "toilet", label: "Banos Rojo", x: 326, y: 188 },
  { id: "toilet-yellow", type: "toilet", label: "Banos Amarillo", x: 384, y: 188 },
  { id: "toilet-green", type: "toilet", label: "Banos Verde", x: 728, y: 188 },
  { id: "food-court", type: "food", label: "Plaza de comida", x: 626, y: 530 },
  { id: "info-main", type: "info", label: "Informacion", x: 508, y: 546 },
  { id: "health-aid", type: "health", label: "Posta medica", x: 772, y: 154 },
  { id: "main-stage", type: "stage", label: "Teatro Illimani", x: 890, y: 444 },
];

export const poiMeta: PoiMeta[] = [
  { id: "entrance", label: "Entradas", icon: DoorOpen },
  { id: "exit", label: "Salidas", icon: LogOut },
  { id: "toilet", label: "Banos", icon: Landmark },
  { id: "food", label: "Comida", icon: Utensils },
  { id: "stage", label: "Escenario", icon: Music },
  { id: "info", label: "Info", icon: Info },
  { id: "health", label: "Salud", icon: Cross },
];

export const routeDefinitions: RouteDefinition[] = [
  { standId: "red-01", points: "508,546 508,512 364,512 334,374 140,278", instruction: "Cruza la pasarela roja y toma la calle 2." },
  { standId: "red-03", points: "508,546 360,546 316,430 148,374", instruction: "Sigue el pasillo inferior y entra al Bloque Rojo." },
  { standId: "yellow-01", points: "508,546 508,452 448,398 448,276", instruction: "Sigue el pasillo central del Bloque Amarillo." },
  { standId: "yellow-05", points: "508,546 560,498 636,448 636,374", instruction: "Avanza por la calle 2 y gira hacia Arena La Paz." },
  { standId: "green-01", points: "508,546 690,520 724,402 786,280", instruction: "Cruza la pasarela Amarillo-Verde y entra al Bloque Verde." },
  { standId: "green-04", points: "508,546 712,546 808,468 882,386", instruction: "Sigue hasta Teatro Illimani y gira al modulo verde." },
];

export const userLocation = { x: 508, y: 546 };
