# Fabricio — Sistema visual, misiones y premios

## Resultado esperado

Definir una identidad pixel-art original y aplicarla a la experiencia de gamificación: misiones legibles, progreso visible y recompensas que hagan atractiva la visita a stands sin parecer un juego infantil.

**Rama sugerida:** `feat/fabricio-visual-missions`  
**Entrega de tokens a Omar:** martes 8, 12:00  
**Entrega para integración:** miércoles 9, 11:00

## Archivos bajo tu responsabilidad

```text
src/features/missions/
src/features/rewards/
src/components/pixel/
src/config/visual-spec.ts
public/assets/missions/
public/assets/rewards/
```

Entrega los tokens a Omar para `globals.css`; no edites el archivo global directamente.

## Dirección visual

El estilo correcto es **pixel-art/retro-game contemporáneo en modo claro**, no una escena 3D tipo Pixar.

### Reglas

- Píxel decorativo, texto principal muy legible.
- Paleta brillante, con fondos claros y contraste suficiente.
- Formas escalonadas o bloques en badges, mapas e ilustraciones.
- Sombras cortas y sólidas; evitar glassmorphism oscuro.
- Ilustraciones pequeñas, no fondos recargados.
- Una familia coherente de iconos; no mezclar cinco estilos.
- La landing y la demo deben sentirse parte del mismo producto.
- Inspirarse en la jerarquía de Devconnect, sin copiar assets, logos o composiciones exactas.

### Tipografía

- Texto y controles: Geist, Inter o Atkinson Hyperlegible.
- Acento pixel: Pixelify Sans.
- Usar la fuente pixel solo en títulos de 1–4 palabras, números de puntos y badges.
- Nunca usarla en párrafos, campos o preguntas de entrevista.

### Movimiento

- Tap: escala `0.97`, 100–140 ms.
- Entrada de tarjeta: opacidad + desplazamiento de 8–12 px, 180–240 ms.
- Cambio de progreso: spring suave.
- Premio: máximo 800 ms y nunca bloquear el siguiente paso.
- Respetar `prefers-reduced-motion`.

## Pantalla Misiones

### Vista de categorías

- [ ] Cabecera con progreso global, por ejemplo `7/24`.
- [ ] Categorías en bandas de color: Tecnología, Salud, Sabores, Finanzas, Educación y Startups.
- [ ] Cada categoría muestra misiones completadas/total y barra de progreso.
- [ ] Una categoría puede expandirse sin navegar fuera de la pantalla.

### Misiones de muestra

1. `Primer contacto`: visita un stand con NFC — 50 puntos.
2. `Ruta tecnológica`: visita tres stands de Tecnología — 150 puntos.
3. `Explorador ExpoVia`: visita cinco stands diferentes — 250 puntos.
4. `Sabores de la feria`: visita dos stands gastronómicos — 100 puntos.
5. `Agenda activa`: abre una actividad destacada — 25 puntos.

Al menos una misión debe comenzar en `2/5` y pasar a `3/5` después del escaneo de Erick.

### Vista expandida

- Tarjetas de los stands que participan.
- Indicador visitado/pendiente.
- Botón `Ubicación` que abre el mapa y selecciona el stand.
- Descripción de una línea y cantidad de puntos.
- Estado completado celebratorio pero breve.

## Pantalla Premios

- [ ] Saldo de puntos visible.
- [ ] Tres recompensas ficticias con costo distinto.
- [ ] Estado disponible, bloqueado o canjeado.
- [ ] Botón `Canjear` abre confirmación; no canjear directamente.
- [ ] Confirmación simulada genera un código corto etiquetado `DEMO`.
- [ ] Si no hay puntos, explicar cómo conseguirlos.

Premios sugeridos:

- Sticker ExpoVia — 100 puntos.
- Café de cortesía — 250 puntos.
- Kit Explorador — 500 puntos.

No incluir premios de marcas reales ni asegurar que existirán en FIPAZ.

## Contrato de datos

```ts
export interface Mission {
  id: string;
  title: string;
  description: string;
  category: StandCategory | "general";
  target: number;
  progress: number;
  rewardPoints: number;
  standIds?: string[];
}

export interface Reward {
  id: string;
  title: string;
  cost: number;
  imagePath: string;
  stockLabel?: string;
}
```

Coordinar con Erick para que el progreso sea derivado del historial de visitas cuando sea posible; no mantener dos contadores contradictorios.

## Recursos visuales necesarios

Guardar en:

```text
public/assets/missions/
public/assets/rewards/
```

Crear:

- seis badges de categoría;
- trofeo, estrella, cofre y ticket;
- tres imágenes de recompensas ficticias;
- patrón pequeño de confeti pixelado.

### Prompt para badges de categoría

> Seis insignias originales para categorías de una feria: tecnología, salud, gastronomía, finanzas, educación y startups; estilo pixel-art contemporáneo de 16 bits, formas de gema o cubo isométrico sencillo, una insignia por categoría, paleta pastel azul, verde, amarillo, violeta, coral y rosa, contorno blanco limpio, fondo transparente, legibles a 56 píxeles, sin texto ni marcas.

### Prompt para recompensas

> Tres objetos de recompensa para una app de feria: sticker coleccionable, vaso de café y kit de explorador, estilo pixel-art moderno de 16 bits, iluminación suave, colores ExpoVia azul, violeta, rosa y amarillo, cada objeto aislado y centrado, fondo transparente, sin logos reales, aspecto amistoso y profesional, hoja de sprites uniforme.

## Criterios de aceptación

- Misiones y premios consumen el mismo store de Erick.
- El escaneo modifica visualmente una misión sin recarga.
- Cada estado se entiende también sin color.
- Barras de progreso incluyen valor textual accesible.
- No hay animaciones infinitas en contenido principal.
- La tipografía pixel no reduce la comprensión.
- Los assets mantienen estilo, escala y paleta consistentes.

## Handoff

En el PR incluye:

- captura de las seis categorías;
- video del cambio `2/5 → 3/5`;
- tabla de tokens entregados a Omar;
- listado de assets, autor/origen y licencia;
- props y selectores que consume cada pantalla.

## Enlaces útiles

- [Motion para React](https://motion.dev/docs/react)
- [Motion: accesibilidad](https://motion.dev/docs/react-accessibility)
- [Pixelify Sans](https://fonts.google.com/specimen/Pixelify+Sans)
- [Lucide](https://lucide.dev/guide/react)
- [Pixelarticons](https://github.com/halfmage/pixelarticons)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Kenney: assets](https://kenney.nl/assets)
