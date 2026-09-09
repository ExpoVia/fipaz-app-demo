# ExpoVia Interactive Map Handoff

Mapa SVG inline demostrativo inspirado en el Campo Ferial Chuquiago Marka. No es un plano oficial ni afirma la distribucion real de FIPAZ o La Paz Expone.

## Rutas y exports

- Preview local: `/demo/map`
- Export principal: `ExpoInteractiveMap`
- Demo con datos ficticios: `ExpoMapDemoScreen`
- Datos: `src/features/map/data/expoMapData.ts`

```tsx
import { ExpoInteractiveMap, type Stand } from "@/features/map";
```

## Coordenadas principales

| Tipo | Id | Nombre | Coordenadas |
| --- | --- | --- | --- |
| Zona | red | Bloque Rojo | path SVG, label 204,226 |
| Zona | yellow | Bloque Amarillo | path SVG, label 524,222 |
| Zona | green | Bloque Verde | path SVG, label 832,226 |
| POI | entrance-main | Ingreso Bloque | 508,610 |
| POI | entrance-red | Ingreso Rojo | 72,520 |
| POI | exit-green | Salida Verde | 950,520 |
| POI | exit-north | Salida Costanera | 508,74 |
| POI | info-main | Informacion | 508,546 |
| POI | health-aid | Posta medica | 772,154 |
| POI | main-stage | Teatro Illimani | 890,444 |

## Stands

| Stand | Bloque | Categoria | Caja |
| --- | --- | --- | --- |
| R01 Altiplano Tech | red | technology | 104,252 72x54 |
| R02 Nexo QR | red | technology | 190,252 86x54 |
| R03 Kipu Editorial | red | finance | 104,346 86x56 |
| R04 Made With Love | red | food | 204,346 92x56 |
| A01 Sabor Costanera | yellow | food | 400,250 96x52 |
| A02 Cafe Illimani | yellow | food | 514,250 96x52 |
| A03 Ruta IoT | yellow | technology | 414,342 74x58 |
| A04 Billetera 360 | yellow | finance | 502,342 82x58 |
| A05 EduFin Bolivia | yellow | finance | 598,342 72x58 |
| V01 Vita Check | green | health | 746,252 82x56 |
| V02 Bio Feria | green | health | 842,252 74x56 |
| V03 Patino Lab | green | technology | 746,356 78x58 |
| V04 Infantil Colectiva | green | health | 842,356 78x58 |

## Agregar un stand

1. Crear un objeto `Stand` en `expoStands`.
2. Usar `zoneId` igual a `red`, `yellow` o `green`.
3. Elegir `category` entre `technology`, `health`, `food` y `finance`.
4. Definir `x`, `y`, `width`, `height` dentro del bloque elegido.
5. Si debe tener ruta, agregar un objeto en `routeDefinitions` con el mismo `standId`.

## Limitaciones

- Las rutas son polilineas predefinidas, sin pathfinding.
- Los nombres de stands son ficticios.
- La geometria esta inspirada en referencias del recinto y fotos de feria, no en un levantamiento oficial.
- No se usan capturas como fondo; todo el recinto interactivo se dibuja en SVG.
