# Franco — Mapa interactivo

## Resultado esperado

Crear el elemento más memorable de la demo: un mapa original de feria que se pueda mover, ampliar, filtrar y explorar, mostrando más detalle a medida que aumenta el zoom.

**Rama sugerida:** `feat/franco-interactive-map`  
**Entrega para integración:** miércoles 9, 11:00

## Archivos bajo tu responsabilidad

```text
src/features/map/
src/features/map/components/
src/features/map/data/
public/assets/map/
```

No edites el shell, el store o `globals.css`. Exporta una pantalla autónoma que Omar pueda montar.

## Decisión técnica

Usar un mapa conceptual en **SVG inline**, no una captura ni Google Maps. El SVG permite:

- zonas seleccionables;
- colores y contornos consistentes;
- iconos y etiquetas por capas;
- animación y autozoom;
- buena nitidez en cualquier escala;
- operación sin Internet.

Usar `react-zoom-pan-pinch` para pan, zoom, pinch y controles. No añadir Mapbox o Leaflet: son útiles para coordenadas geográficas, no para un croquis interior de feria.

## Geometría inicial

Diseñar un recinto ficticio, claramente marcado `Mapa demostrativo`, con:

- Zona Azul — Tecnología y Startups.
- Zona Verde — Salud y Bienestar.
- Zona Amarilla — Gastronomía.
- Zona Violeta — Finanzas y Educación.
- pasillo central;
- dos entradas/salidas;
- dos baños;
- punto de información;
- primeros auxilios;
- patio de comidas;
- escenario;
- doce a dieciséis stands.

El mapa no debe afirmar que representa la distribución real de FIPAZ o La Paz Expone.

## Capas de detalle

### Zoom 1.0–1.49: vista general

- perímetro del recinto;
- cuatro zonas con color y nombre;
- entradas principales;
- texto `Acerca para ver los stands`.

### Zoom 1.5–2.39: vista de zona

- pasillos;
- códigos de filas;
- baños, comida, escenario, información y salidas;
- bloques de stands.

### Zoom 2.4–4.0: vista de stand

- código de stand;
- logo ficticio;
- nombre corto si no satura;
- estado visitado y seleccionado;
- punto de inicio de ruta.

Evitar mostrar todos los textos en el zoom general.

## Interacciones obligatorias

- [ ] Arrastrar el mapa con mouse o dedo.
- [ ] Pinch-to-zoom y rueda del mouse.
- [ ] Botones accesibles `+`, `−` y `Centrar`.
- [ ] Pulsar una zona realiza autozoom y la centra.
- [ ] Pulsar un stand abre un bottom sheet con su ficha resumida.
- [ ] Filtros de categoría y POI.
- [ ] Botón `¿Dónde estoy?` centra una ubicación simulada.
- [ ] `Cómo llegar` dibuja una ruta demostrativa desde esa ubicación.
- [ ] Botón cerrar vuelve al mapa sin reiniciar el zoom.

## Ruta simulada

No implementar pathfinding en esta entrega. Modelar tres o cuatro polilíneas predefinidas desde un punto “Tú estás aquí” hacia stands destacados.

- Animar el trazado una sola vez.
- Mostrar texto `Ruta aproximada de demostración`.
- Incluir una instrucción corta: `Sigue el pasillo central y gira a la izquierda`.
- Permitir cancelar la ruta.

## API del componente

```ts
export interface ExpoMapProps {
  stands: Stand[];
  selectedStandId: string | null;
  visitedStandIds: string[];
  onSelectStand: (standId: string) => void;
  onOpenStand: (standId: string) => void;
  initialZoneId?: string | null;
}
```

Exportar desde `src/features/map/index.ts` para evitar que Omar dependa de rutas internas.

## Rendimiento y accesibilidad

- Mantener el SVG razonable; reutilizar símbolos con `<symbol>` y `<use>` cuando ayude.
- No cargar logos en resolución fotográfica.
- Animar `transform` y `opacity`, no propiedades costosas de layout.
- Cada zona y stand interactivo debe ser alcanzable por teclado o tener una alternativa en lista.
- Los iconos de POI deben incluir etiqueta textual o `aria-label`.
- No depender únicamente del color para categorías o estados.
- Reducir o eliminar autozoom animado con `prefers-reduced-motion`.

## Recursos visuales necesarios

Guardar en `public/assets/map/`.

- Iconos consistentes para entrada, salida, baños, comida, escenario, información y salud.
- Marcador `Tú estás aquí`.
- Textura de fondo geométrica opcional con opacidad inferior al 8 %.
- Logos ficticios proporcionados por Saul/Erick.

Preferir Lucide para utilidades y dibujar los elementos distintivos del mapa como SVG original.

### Prompt para una referencia del mapa

> Croquis interior original de una feria comercial visto desde arriba, estilo pixel-art contemporáneo limpio de 16 bits, cuatro pabellones irregulares azul, verde, amarillo y violeta, pasillos blancos amplios, pequeños módulos de stands, entradas, baños, comida, información, primeros auxilios y escenario representados con iconos claros, modo claro, amigable y profesional, sin nombres ni logos reales, sin perspectiva 3D, fondo transparente, pensado como referencia para reconstruir en SVG interactivo.

Usar la imagen generada solo como referencia. La geometría final debe construirse en SVG para que sea interactiva.

## Criterios de aceptación

- El usuario entiende que puede hacer zoom sin recibir explicación.
- Seleccionar una zona la centra correctamente.
- El detalle aumenta sin saturar al alejarse.
- Seleccionar un stand abre información coherente con los datos compartidos.
- Filtros y ruta funcionan con mouse y pantalla táctil.
- El mapa conserva zoom al cerrar el bottom sheet.
- Funciona sin conexión después de cargar la aplicación.
- No utiliza la captura de Devconnect como fondo final.

## Handoff

En el PR incluye:

- video de zoom general → zona → stand;
- tabla con coordenadas de zonas, stands y POI;
- explicación de cómo agregar un stand;
- props y callbacks exportados;
- limitaciones de la ruta simulada.

## Enlaces útiles

- [react-zoom-pan-pinch](https://github.com/BetterTyped/react-zoom-pan-pinch)
- [SVG en MDN](https://developer.mozilla.org/en-US/docs/Web/SVG)
- [Animaciones SVG con Motion](https://motion.dev/docs/react-svg-animation)
- [Lucide para React](https://lucide.dev/guide/react)
- [SVG accesible en WAI](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/)

