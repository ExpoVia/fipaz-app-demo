# Omar — Dirección técnica, shell móvil e integración

## Resultado esperado

Dejar una sola experiencia coherente: landing en `/`, demo en `/demo`, navegación móvil funcional y una versión pública estable. Omar es responsable de integrar; no de rehacer los módulos de los demás.

**Rama sugerida:** `feat/omar-shell-integration`  
**Entrega para integración:** miércoles 9, 11:00  
**Code freeze y release:** miércoles 9, 15:00–18:00

## Archivos bajo tu responsabilidad

```text
src/app/layout.tsx
src/app/globals.css
src/app/demo/page.tsx
src/components/app-shell/
src/components/shared/
src/config/navigation.ts
src/config/theme.ts
public/assets/brand/
```

No modifiques las implementaciones internas de `src/features/*` salvo durante integración y con aviso al responsable.

## Tareas

### 1. Preparar la arquitectura compartida

- [ ] Confirmar alias `@/*` y estructura por funcionalidades.
- [ ] Crear `AppShell`, `MobileViewport`, `TopBar` y `BottomNavigation`.
- [ ] En escritorio, centrar un teléfono de aproximadamente `390 × 844 px` con sombra y bordes redondeados.
- [ ] En pantallas menores a `640 px`, eliminar el marco y ocupar `100dvw × 100dvh`.
- [ ] Reservar área segura inferior con `env(safe-area-inset-bottom)`.
- [ ] Evitar que el contenido quede detrás de la navegación fija.

### 2. Navegación de la demo

La barra inferior tendrá cinco acciones:

1. Inicio.
2. Mapa.
3. Escanear NFC, como botón central destacado.
4. Misiones.
5. Perfil.

- [ ] Conectar cada acción con los componentes entregados por el equipo.
- [ ] Mantener el tab activo visible mediante color, fondo y texto; no depender solo del color.
- [ ] Hacer que Atrás cierre primero modales o paneles y no saque al usuario de la demo.
- [ ] Añadir una acción discreta “Volver al sitio” en la cabecera.

### 3. Sistema visual compartido

Implementar variables CSS; Fabricio entrega la propuesta visual y Omar la consolida en `globals.css`.

```css
--expo-blue: #1677b8;
--expo-navy: #2f2d4c;
--expo-lilac: #b984b6;
--expo-pink: #f4a2c0;
--expo-yellow: #ffc21a;
--expo-green: #62be5a;
--expo-mint: #9ed8c9;
--expo-sky: #82b5e3;
--expo-purple: #8357a5;
--expo-coral: #f28a72;
--expo-bg: #f4fafc;
--expo-card: #ffffff;
--expo-line: #d8e5ec;
```

- [ ] Tipografía legible para cuerpo; pixel únicamente en títulos cortos, badges e ilustraciones.
- [ ] Bordes definidos, sombras pequeñas sin blur excesivo y esquinas de 12–18 px.
- [ ] Estados `hover`, `focus-visible`, `active` y `disabled` consistentes.
- [ ] Respetar `prefers-reduced-motion`.

### 4. Integración

- [ ] Publicar temprano las interfaces esperadas de cada feature.
- [ ] Integrar PR pequeños en este orden: Erick, Saul, Franco, Fabricio, Jhamil.
- [ ] Resolver imports y composición sin cambiar la lógica interna innecesariamente.
- [ ] Confirmar que el flujo Inicio → Stand → Mapa → NFC → Misión funciona.
- [ ] Ejecutar `pnpm lint` después de cada integración.
- [ ] Ejecutar `pnpm build` antes del code freeze.

### 5. Release y contingencia

- [ ] Configurar el proyecto en Vercel y verificar la URL desde datos móviles.
- [ ] Guardar una segunda URL de preview estable.
- [ ] Mantener una laptop con `pnpm dev` y hotspot como respaldo.
- [ ] Tomar capturas o grabar un recorrido de 60–90 segundos por si falla Internet.
- [ ] Confirmar que no existen secretos, tokens ni datos personales en el repositorio.

## Contratos que debes publicar al equipo

```ts
export type DemoTab = "home" | "map" | "scan" | "missions" | "profile";

export interface FeatureScreenProps {
  onNavigate?: (tab: DemoTab) => void;
}
```

Erick define el store. Los demás consumen selectores y acciones; no deben crear stores paralelos.

## Recursos visuales necesarios

- Logotipo tipográfico temporal “ExpoVia”.
- App icon cuadrado.
- Fondo geométrico suave para el exterior del teléfono en escritorio.
- Cinco iconos de navegación del mismo set.

Guardar en `public/assets/brand/`.

### Prompt recomendado para el app icon

> Ícono original para una aplicación de ferias llamada ExpoVia, estilo pixel-art contemporáneo de 16 bits, una ruta que conecta un pin de ubicación con una pequeña estrella NFC, paleta azul cielo, violeta, rosa y amarillo, formas limpias y amistosas, fondo claro, contraste alto, composición centrada, sin texto, sin marcas existentes, exportable como PNG cuadrado con fondo transparente.

No usar logos, personajes ni ilustraciones extraídas de Devconnect. La referencia define el lenguaje, no los recursos finales.

## Criterios de aceptación

- La demo ocupa toda la pantalla en celular y parece un teléfono en escritorio.
- La navegación no pierde estado entre pantallas.
- Ningún módulo produce scroll horizontal accidental.
- Los botones críticos miden al menos 44 × 44 px.
- La versión desplegada funciona en Chrome Android y Safari iOS.
- `pnpm lint` y `pnpm build` finalizan con código 0.

## Handoff

En el PR incluye:

- URL de preview;
- captura de escritorio y celular;
- lista de módulos integrados;
- errores conocidos, si existen;
- resultado de lint y build.

## Enlaces útiles

- [Instalación oficial de Next.js](https://nextjs.org/docs/app/getting-started/installation)
- [Estructura de proyectos Next.js](https://nextjs.org/docs/app/getting-started/project-structure)
- [Layouts y páginas](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [Responsive design en Tailwind](https://tailwindcss.com/docs/responsive-design)
- [Desplegar Next.js en Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)

