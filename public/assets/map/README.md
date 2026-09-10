# Recursos del mapa FIPAZ 2026

- `fipaz-2026-coordinates.csv`: tabla de coordenadas locales de zonas, planos,
  472 espacios y POI. Las superficies en blanco no fueron transcritas.
- `map-texture.svg` y `you-are-here-marker.svg`: recursos opcionales heredados;
  el renderizador actual dibuja su geometria y marcador directamente en SVG.

La fuente editable esta en `src/features/map/data/fipaz2026Plans.ts`. Los siete
planos se reconstruyen a partir de las imagenes compartidas en la conversacion;
no se publican las capturas originales como fondo del mapa. La distribucion es
una transcripcion simplificada, con expositores y rutas demostrativos.

La guia de integracion y pruebas esta en `src/features/map/README.md`.
Las capturas de verificacion y el video se generan en `coverage/map/`.
