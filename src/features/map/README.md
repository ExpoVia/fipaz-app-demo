# Mapa FIPAZ 2026

Actualizacion de la demo a partir de las siete imagenes proporcionadas por Franco.
SVG inline, sin mapas externos ni capturas como fondo. La numeracion y la
disposicion se transcriben de las referencias; las formas se simplifican.
Se mantiene la etiqueta "Mapa demostrativo": no es un plano oficial validado.

## Planos incluidos

| planId | Bloque / espacio | Planta | Espacios | Origen simulado (x,y) |
| --- | --- | --- | ---: | --- |
| red-lower | Internacional I, Rojo | Baja | 51 | 625,460 |
| red-upper | Internacional II, Rojo | Alta | 61 | 640,545 |
| yellow-lower | Pabellon La Paz, Amarillo | Baja | 90 | 188,490 |
| yellow-upper | Pabellon Bolivia, Amarillo | Alta | 133 | 228,521 |
| green-upper | Pabellon Americano, Verde | Alta | 101 | 199,511 |
| entrance | Plaza Akapana, ingreso Rojo-Amarillo | Exterior | 7 | 321,638 |
| food-court | Patio de comidas, Amarillo-Verde | Exterior | 29 | 311,704 |

Total: 472 espacios. Se incluyen R1/R2, A1-A6, P1-P11, P14, P14-A/P14-B,
A8, E1/E2 y G-1 a G-29.

No se inventan los numeros 46/47 de La Paz ni 142 de Bolivia: no se distinguen
en las imagenes recibidas. Tampoco se agrega planta baja del bloque Verde.
No se deducen rubros, disponibilidad ni precios a partir de los colores del
plano. Las superficies solo aparecen en fichas donde fueron transcritas;
el tamano del rectangulo SVG no equivale a metros cuadrados.

La vista general mantiene las adyacencias Rojo - Akapana - Amarillo - Comidas -
Verde. En contenedores angostos, se dispone verticalmente para facilitar la
lectura; los siete planos interiores mantienen su orientacion de referencia.

## Integracion

Preview: `/demo/map`. Exportar/importar siempre desde `@/features/map`.

```tsx
import {
  ExpoInteractiveMap,
  expoStands,
  mapPlans,
  type Stand,
} from "@/features/map";

<ExpoInteractiveMap
  stands={expoStands}
  selectedStandId={selectedStandId}
  visitedStandIds={visitedStandIds}
  onSelectStand={setSelectedStandId}
  onOpenStand={openExhibitor}
  initialZoneId="red-lower"
/>
```

`ExpoMapDemoScreen` incluye seleccion local y tres visitas ficticias.
`onSelectStand` se dispara al seleccionar un espacio; `onOpenStand` al pulsar
"Ver expositor". Cerrar la ficha conserva el zoom. Los IDs de esta actualizacion
reemplazan los antiguos `red-01`, `yellow-01`, etc.; actualizar visitas/seleccion
del consumidor al integrar.

`initialZoneId` acepta `red`, `yellow`, `green` o un `planId` completo.
Un cambio de plano reinicia su encuadre; volver al recinto usa el boton de
flecha. La API principal conserva los nombres de props de Franco.md.
Los estilos estan aislados en un CSS Module; no se modifica shell, store ni
globals.css. El host debe proporcionar altura (minimo recomendado: 520px).

## Datos y coordenadas

- Geometria, numeracion y 12 expositores ficticios: `data/fipaz2026Plans.ts`.
- Zonas, rubros, POI y cuatro rutas: `data/expoMapData.ts`.
- Tabla completa de zonas, planos, stands y POI:
  [fipaz-2026-coordinates.csv](../../../public/assets/map/fipaz-2026-coordinates.csv).
- Unidades SVG locales por plano. `MapPlan.viewBox` define sus limites.
- `Stand.planId` identifica la planta; `zoneId` identifica el bloque/plaza.
- ID de espacio: `planId-codigo`, por ejemplo `red-lower-12` o
  `food-court-G-22`. La busqueda por numero/nombre respeta plano y filtros.

Para agregar/corregir un espacio, editar las llamadas `box`, `row` o `column`
del plano correspondiente. Las filas/columnas explicitan el orden de los
numeros y las dimensiones de cada modulo. Para vincular un expositor, completar
nombre, resumen, categoria y marca; las doce asignaciones actuales son
exclusivamente demostrativas. El resto usa `unassigned`.

## Rutas y servicios

Cuatro rutas predefinidas: Rojo baja 12, Amarillo baja 4, Verde alta 5 e ingreso 1.
"Como llegar" se deshabilita en los demas espacios; nunca sustituye la ruta por
la de otro stand. Los recorridos no cruzan entre plantas ni calculan caminos.
El marcador simula el acceso del plano actual, no una ubicacion GPS continua.
El trazado se anima una vez y respeta movimiento reducido.

Banos, escenario principal, accesos, rampas y ascensores se situan segun las
referencias. Informacion y primeros auxilios se conservan como POI de demo,
con etiquetas explicitas: sus posiciones no estan confirmadas en estos planos.
Las areas internas de Xtrem Park y mesas se simplifican.

## Verificacion

```sh
npm run lint
npm run build
node src/features/map/tests/data.test.cjs
npm run dev -- --port 3000
```

La prueba de datos verifica numeracion, IDs, limites, superposiciones, origen y
destino de rutas y separacion entre espacios sin rubro y expositores demo.

Prueba visual opcional con Chrome instalado, sin cambiar dependencias del app:

```sh
npm install --prefix node_modules/.cache/map-verify --no-package-lock playwright
node node_modules/.cache/map-verify/node_modules/playwright/cli.js install ffmpeg
node src/features/map/tests/browser.cjs
```

`MAP_TEST_URL` permite usar otro puerto o un preview. Las capturas y el video se
guardan en `coverage/map/` (ignorado por Git); `map-mobile.webm` es el recorrido
para adjuntar al PR. La prueba cubre 320px, 390px y un host de escritorio ancho,
los siete planos, renderizado no vacio, filtros, zoom, arrastre, pellizco tactil,
fichas, rutas, conservacion del zoom y funcionamiento sin red despues de cargar.
