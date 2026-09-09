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
    id: "blue",
    name: "Zona Azul",
    shortName: "Tecnologia",
    category: "technology",
    color: "#8dc7f2",
    borderColor: "#2f76bd",
    labelX: 222,
    labelY: 206,
    path: "M92 86H372C392 86 404 99 404 119V308C404 330 389 344 367 344H86C63 344 50 329 54 306L77 116C80 98 73 86 92 86Z",
    description: "Tecnologia y startups con demos, experiencias NFC y soluciones de movilidad.",
  },
  {
    id: "green",
    name: "Zona Verde",
    shortName: "Salud",
    category: "health",
    color: "#84d68b",
    borderColor: "#2f8f4e",
    labelX: 674,
    labelY: 196,
    path: "M522 76H785C813 76 831 95 826 123L792 316C788 337 771 350 750 350H500C478 350 464 335 469 314L505 102C508 86 509 76 522 76Z",
    description: "Salud y bienestar para visitantes, familias y empresas expositoras.",
  },
  {
    id: "yellow",
    name: "Zona Amarilla",
    shortName: "Gastronomia",
    category: "food",
    color: "#ffd15c",
    borderColor: "#d89b00",
    labelX: 234,
    labelY: 492,
    path: "M86 402H369C389 402 404 417 404 437V569C404 594 387 610 363 610H92C68 610 53 594 56 570L73 431C75 414 68 402 86 402Z",
    description: "Sabores locales, patio de comidas y experiencias rapidas para recargar energia.",
  },
  {
    id: "violet",
    name: "Zona Violeta",
    shortName: "Finanzas",
    category: "finance",
    color: "#c3a3ee",
    borderColor: "#7b58bd",
    labelX: 666,
    labelY: 502,
    path: "M501 399H755C778 399 794 415 794 438V569C794 594 777 610 753 610H498C475 610 459 594 463 571L485 429C488 411 487 399 501 399Z",
    description: "Finanzas, educacion, empleabilidad y herramientas para emprendedores.",
  },
];

export const expoStands: Stand[] = [
  { id: "tec-01", code: "A01", name: "Andes Cloud", shortName: "Cloud", category: "technology", zoneId: "blue", x: 116, y: 128, width: 64, height: 54, logoText: "AC", summary: "Plataforma ficticia para respaldos y analitica de visitantes.", routeHint: "Sigue el pasillo central y gira a la izquierda.", featured: true },
  { id: "tec-02", code: "A02", name: "Nexo AR", shortName: "AR", category: "technology", zoneId: "blue", x: 194, y: 128, width: 64, height: 54, logoText: "AR", summary: "Experiencias inmersivas para activaciones de marca.", routeHint: "Avanza al norte del pasillo central y entra por Zona Azul." },
  { id: "tec-03", code: "A03", name: "QR Labs", shortName: "QR", category: "technology", zoneId: "blue", x: 272, y: 128, width: 64, height: 54, logoText: "QR", summary: "Demo de credenciales efimeras y check-in con QR.", routeHint: "Cruza el corredor azul y busca la fila A." },
  { id: "tec-04", code: "A04", name: "Ruta IoT", shortName: "IoT", category: "technology", zoneId: "blue", x: 145, y: 232, width: 70, height: 60, logoText: "IO", summary: "Sensores ficticios para microlocalizacion en recintos.", routeHint: "Toma el pasillo central y gira a la izquierda.", featured: true },
  { id: "sal-01", code: "B01", name: "Vita Check", shortName: "Vita", category: "health", zoneId: "green", x: 547, y: 128, width: 68, height: 54, logoText: "VC", summary: "Punto informativo de bienestar y prevencion.", routeHint: "Sigue derecho hasta Zona Verde y toma el pasillo superior." },
  { id: "sal-02", code: "B02", name: "Bio Feria", shortName: "Bio", category: "health", zoneId: "green", x: 632, y: 128, width: 68, height: 54, logoText: "BF", summary: "Productos naturales y habitos saludables.", routeHint: "Entra por el corredor derecho y sube a la fila B." },
  { id: "sal-03", code: "B03", name: "Pulse Lab", shortName: "Pulse", category: "health", zoneId: "green", x: 706, y: 226, width: 62, height: 58, logoText: "PL", summary: "Medicion demostrativa de actividad y retos diarios.", routeHint: "Desde tu ubicacion, bordea informacion y gira a la derecha.", featured: true },
  { id: "gas-01", code: "C01", name: "Sabor Paceño", shortName: "Sabor", category: "food", zoneId: "yellow", x: 114, y: 446, width: 76, height: 56, logoText: "SP", summary: "Menu ficticio de platos paceños en formato feria.", routeHint: "Baja por el pasillo central hasta el patio de comidas.", featured: true },
  { id: "gas-02", code: "C02", name: "Cafe Altura", shortName: "Cafe", category: "food", zoneId: "yellow", x: 210, y: 446, width: 76, height: 56, logoText: "CA", summary: "Cafe de altura y degustaciones rapidas.", routeHint: "Dobla a la izquierda despues del punto de informacion." },
  { id: "gas-03", code: "C03", name: "Dulce Feria", shortName: "Dulce", category: "food", zoneId: "yellow", x: 302, y: 508, width: 58, height: 56, logoText: "DF", summary: "Postres y promociones con canje de puntos.", routeHint: "Continua por el corredor inferior amarillo." },
  { id: "fin-01", code: "D01", name: "EduFin", shortName: "Edu", category: "finance", zoneId: "violet", x: 520, y: 452, width: 72, height: 56, logoText: "EF", summary: "Mini charlas de educacion financiera para jovenes.", routeHint: "Sigue el pasillo central y gira a la derecha.", featured: true },
  { id: "fin-02", code: "D02", name: "Billetera 360", shortName: "Wallet", category: "finance", zoneId: "violet", x: 612, y: 452, width: 72, height: 56, logoText: "B3", summary: "Simulacion de pagos y beneficios para visitantes.", routeHint: "Avanza hacia la Zona Violeta por el corredor inferior." },
  { id: "fin-03", code: "D03", name: "Impulso Pyme", shortName: "Pyme", category: "finance", zoneId: "violet", x: 704, y: 520, width: 58, height: 56, logoText: "IP", summary: "Herramientas de gestion para stands y empresas.", routeHint: "Bordea el escenario y sigue al bloque D." },
];

export const pois: Poi[] = [
  { id: "entrance-south", type: "entrance", label: "Entrada sur", x: 430, y: 631 },
  { id: "entrance-west", type: "entrance", label: "Entrada oeste", x: 40, y: 350 },
  { id: "exit-east", type: "exit", label: "Salida este", x: 837, y: 353 },
  { id: "exit-north", type: "exit", label: "Salida norte", x: 454, y: 41 },
  { id: "toilet-blue", type: "toilet", label: "Baños norte", x: 420, y: 170 },
  { id: "toilet-food", type: "toilet", label: "Baños patio", x: 425, y: 518 },
  { id: "food-court", type: "food", label: "Patio de comidas", x: 248, y: 374 },
  { id: "info-main", type: "info", label: "Informacion", x: 440, y: 350 },
  { id: "health-aid", type: "health", label: "Primeros auxilios", x: 520, y: 350 },
  { id: "main-stage", type: "stage", label: "Escenario", x: 636, y: 348 },
];

export const poiMeta: PoiMeta[] = [
  { id: "entrance", label: "Entradas", icon: DoorOpen },
  { id: "exit", label: "Salidas", icon: LogOut },
  { id: "toilet", label: "Baños", icon: Landmark },
  { id: "food", label: "Comida", icon: Utensils },
  { id: "stage", label: "Escenario", icon: Music },
  { id: "info", label: "Info", icon: Info },
  { id: "health", label: "Salud", icon: Cross },
];

export const routeDefinitions: RouteDefinition[] = [
  { standId: "tec-01", points: "456,382 456,250 338,250 286,184 148,184", instruction: "Sigue el pasillo central y gira a la izquierda." },
  { standId: "tec-04", points: "456,382 456,286 350,286 310,262 180,262", instruction: "Sube por el pasillo central y entra al bloque azul." },
  { standId: "sal-03", points: "456,382 538,382 636,326 736,256", instruction: "Sigue el pasillo central y gira a la derecha." },
  { standId: "gas-01", points: "456,382 354,382 278,426 152,474", instruction: "Baja al patio de comidas y toma la fila C." },
  { standId: "fin-01", points: "456,382 512,414 556,480", instruction: "Cruza al corredor violeta y entra por la primera fila." },
];

export const userLocation = { x: 456, y: 382 };
