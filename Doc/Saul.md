# Saul — Inicio, Explorar y perfil de stand

## Resultado esperado

Construir la parte de la demo que responde tres preguntas del visitante: “¿qué está pasando?”, “¿qué me interesa?” y “¿por qué debería visitar este stand?”.

**Rama sugerida:** `feat/saul-visitor-experience`  
**Entrega para integración:** miércoles 9, 11:00

## Archivos bajo tu responsabilidad

```text
src/features/home/
src/features/explore/
src/features/stands/
public/assets/stands/
public/assets/content/
```

No crees una ruta independiente ni un store. Omar monta tus pantallas dentro del shell y Erick expone datos y acciones compartidas.

## Pantalla Inicio

### Bloques obligatorios

- [ ] Saludo corto: `¡Hola, explorador!`.
- [ ] Evento activo: `ExpoVia Demo · La Paz` y fecha ficticia claramente marcada.
- [ ] Tarjeta de puntos y nivel.
- [ ] Misión destacada con progreso.
- [ ] Carrusel de stands recomendados.
- [ ] Avisos o actividades próximas.
- [ ] CTA `Ver mapa` y CTA `Escanear NFC`.

### Comportamiento

- Los puntos y progreso deben leerse desde el store de Erick.
- Después de un escaneo correcto, Inicio debe reflejar el nuevo total sin recargar.
- Las tarjetas de stand deben abrir el detalle correcto.
- El contenido debe caber cómodamente con navegación inferior fija.

## Pantalla Explorar

- [ ] Campo de búsqueda local por nombre, descripción y categoría.
- [ ] Chips: Tecnología, Salud, Finanzas, Gastronomía, Educación y Startups.
- [ ] Sección `Cerca de ti` basada en ubicación simulada.
- [ ] Filtro `Con premio` y `No visitados`.
- [ ] Estado vacío útil: explicar cómo quitar filtros.
- [ ] Resultado en tarjetas compactas con logo, pabellón, stand y categoría.

No implementar búsqueda remota. Los datos salen de `src/data/demo-data.ts`.

## Perfil de stand

Debe poder abrirse desde Inicio, Explorar, Mapa o Misiones.

### Información mínima

- logo ficticio;
- nombre y categoría;
- código de ubicación, por ejemplo `B-12`;
- descripción de dos líneas;
- horario o actividad destacada;
- promoción o premio disponible;
- estado visitado/no visitado;
- botón `Ver en el mapa`;
- botón `Registrar visita con NFC`;
- botón de favorito.

### Interacciones

- [ ] `Ver en el mapa` selecciona el stand y cambia a la pestaña Mapa.
- [ ] `Registrar visita` cambia a la pestaña central NFC con ese stand como objetivo.
- [ ] Favorito persiste al navegar.
- [ ] Si ya fue visitado, mostrar badge y no prometer puntos dobles.

## Datos que debes solicitar a Erick

```ts
export interface Stand {
  id: string;
  name: string;
  category: StandCategory;
  description: string;
  zoneId: string;
  boothCode: string;
  logoPath: string;
  tags: string[];
  activity?: string;
  promotion?: string;
  points: number;
  featured?: boolean;
}
```

Selectores/acciones mínimos:

- `stands`;
- `visitedStandIds`;
- `favoriteStandIds`;
- `points`;
- `toggleFavorite(standId)`;
- `selectStand(standId)`;
- `setActiveTab(tab)`.

## Contenido ficticio sugerido

Crear de 12 a 16 stands distribuidos entre las seis categorías. Evitar marcas reales para que las entrevistas se centren en el producto.

Ejemplos:

- Altura Labs — Tecnología.
- Kawsay Salud — Salud.
- Semilla Capital — Finanzas.
- Sabor Andino — Gastronomía.
- Aula Nube — Educación.
- Chaski Robotics — Startups.

Todos deben tener descripción, código de stand, categoría, actividad y puntos.

## Recursos visuales necesarios

Guardar en `public/assets/stands/`.

- 12–16 logos ficticios cuadrados, preferentemente SVG o PNG transparente.
- Un avatar genérico original.
- Dos imágenes horizontales pequeñas para actividad/promoción.

### Prompt para logos ficticios

> Hoja de sprites con doce logos ficticios y diferentes para stands de una feria boliviana, categorías tecnología, salud, finanzas, gastronomía, educación y startups, pixel-art contemporáneo de 16 bits, símbolos geométricos simples, paleta pastel azul, violeta, rosa, amarillo, verde y coral, cada logo dentro de un recuadro separado, fondo transparente, alta legibilidad a 48 píxeles, sin nombres, sin marcas existentes.

### Prompt para avatar

> Avatar inclusivo de visitante de feria, retrato pixel-art moderno de 16 bits, expresión amistosa, ropa casual contemporánea, paleta ExpoVia azul y violeta con acento amarillo, fondo circular claro, sin texto, sin marca, legible a 64 píxeles.

## Criterios de aceptación

- Inicio refleja el resultado de una visita NFC en tiempo real.
- Buscar y filtrar nunca produce errores ni resultados incongruentes.
- Todas las tarjetas abren un stand válido.
- `Ver en el mapa` y `Registrar visita` ejecutan el cambio de contexto correcto.
- Los textos no se cortan a 320 px de ancho.
- Logos e imágenes tienen dimensiones estables para evitar saltos de layout.
- No hay lorem ipsum ni enlaces falsos que parezcan funcionar.

## Handoff

En el PR incluye:

- video corto Inicio → Explorar → Stand;
- listado de props/acciones que consumes del store;
- listado de assets y su origen;
- estados vacío, visitado y favorito demostrados.

## Enlaces útiles

- [Next.js Image](https://nextjs.org/docs/app/api-reference/components/image)
- [Lucide para React](https://lucide.dev/guide/react)
- [Embla Carousel para React](https://www.embla-carousel.com/get-started/react/)
- [WAI: búsqueda y formularios accesibles](https://www.w3.org/WAI/tutorials/forms/)
- [Kenney: assets con licencias claras](https://kenney.nl/assets)
