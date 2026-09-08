# Jhamil — Landing page y captura de feedback

## Resultado esperado

Construir una landing rápida de entender, visualmente coherente con la demo y capaz de llevar a una persona desde la propuesta de valor hasta `Probar demo` en menos de un minuto.

**Rama sugerida:** `feat/jhamil-landing-feedback`  
**Entrega para integración:** miércoles 9, 11:00

## Archivos bajo tu responsabilidad

```text
src/app/page.tsx
src/components/landing/
public/assets/landing/
```

No edites `src/app/globals.css`. Si necesitas un token o utilidad, solicítalo a Omar o entrégalo en una nota dentro del PR.

## Orden de la landing

### 1. Navegación

- Logo ExpoVia.
- Enlaces: Cómo funciona, Para expositores, Para organizadores.
- Botón principal: `Probar demo` → `/demo`.

### 2. Hero

- Eyebrow: `La feria en la palma de tu mano`.
- Título: `Explora, conecta y gana mientras recorres la feria.`
- Texto: ExpoVia convierte cada visita a un stand en una experiencia verificable mediante NFC.
- CTA principal: `Probar demo`.
- CTA secundario: `Conocer la propuesta`.
- Visual: teléfono mostrando mapa, tarjeta de stand y recompensa.

### 3. Problema y solución

Mostrar tres problemas concretos:

1. El visitante se pierde y no descubre stands relevantes.
2. El expositor no puede verificar ni medir visitas de calidad.
3. El organizador carece de datos claros sobre el recorrido del evento.

Responder con tres capacidades:

1. Mapa vivo y búsqueda por categoría.
2. Check-in presencial con NFC y recompensas.
3. Métricas de actividad para stands y organización.

### 4. Cómo funciona

Secuencia visual de cuatro pasos:

1. Explora el mapa.
2. Encuentra un stand.
3. Acerca el teléfono al NFC.
4. Gana puntos y desbloquea premios.

### 5. Experiencia por audiencia

- Visitantes: rutas, favoritos, misiones y premios.
- Expositores: perfil, promociones y visitas verificadas.
- Organizadores: mapa administrable, categorías y métricas.

### 6. Demo y feedback

- Segundo CTA `Abrir ExpoVia Demo`.
- Aviso: `Prototipo con información ficticia para fines de validación`.
- Formulario o enlace corto de feedback con máximo cinco preguntas.

Preguntas recomendadas:

1. ¿Entendiste cómo se registra una visita con NFC?
2. ¿Qué función usarías primero durante una feria?
3. ¿Qué información te falta en el mapa o en un stand?
4. ¿Qué premio te motivaría a completar una misión?
5. ¿Usarías ExpoVia en tu próxima feria y por qué?

## Interacciones mínimas

- [ ] Header compacto al hacer scroll.
- [ ] Entrada suave de secciones con `whileInView`.
- [ ] Mockup del teléfono con movimiento vertical muy sutil.
- [ ] Tarjetas con respuesta al hover/tap de 2–4 px.
- [ ] CTA visible en el primer viewport y al final.
- [ ] Enlaces de navegación con scroll suave.
- [ ] Animaciones desactivables con `prefers-reduced-motion`.

Evitar parallax pesado, videos de fondo o animaciones que retrasen la carga.

## Contenido y tono

- Español directo y comprensible para alguien que nunca oyó hablar del proyecto.
- Usar `ExpoVia`, no `FIPAZ App`, como nombre de plataforma.
- Presentar FIPAZ y La Paz Expone como eventos posibles, no como únicos clientes.
- No prometer analítica, seguridad o compatibilidad NFC que todavía no exista.
- Distinguir claramente la simulación del producto final.

## Recursos visuales necesarios

Guardar en `public/assets/landing/`.

- Una ilustración hero original.
- Tres iconos de problema/solución.
- Cuatro pequeñas viñetas para “Cómo funciona”.
- Una textura geométrica muy ligera.

### Prompt para la ilustración hero

> Ilustración panorámica original de una feria tecnológica boliviana vista en perspectiva isométrica, estilo pixel-art contemporáneo de 16 bits, pabellones coloridos, pequeños stands, visitantes siguiendo una ruta brillante, un teléfono mostrando un mapa y ondas NFC, paleta azul, lila, rosa, amarillo y verde, modo claro, alegre y profesional, bordes nítidos, sin texto, sin logos reales, fondo transparente o blanco, composición apta para el hero de una landing responsive.

### Prompt para las cuatro viñetas

> Set coherente de cuatro iconos pixel-art: mapa de feria, stand con bandera, teléfono leyendo NFC y cofre de recompensa; vista frontal/isométrica consistente, clean pixel art, colores pastel de alto contraste, fondo transparente, sin texto, cada icono centrado y separado.

## Formulario de feedback

Para la primera prueba puede ser un enlace externo a Google Forms o Tally. No bloquees la demo construyendo un backend.

- [ ] Abrir en nueva pestaña.
- [ ] No solicitar datos sensibles.
- [ ] Añadir consentimiento si se registra nombre, teléfono, audio o imagen.
- [ ] Preparar un fallback con formulario impreso o notas offline.

## Criterios de aceptación

- La propuesta se entiende sin explicación oral.
- Todos los botones `Probar demo` llegan a `/demo`.
- El hero funciona desde 320 px de ancho.
- Ningún texto clave está incrustado dentro de una imagen.
- Las imágenes tienen `alt` descriptivo o `alt=""` si son decorativas.
- Lighthouse no reporta errores básicos de accesibilidad.
- La landing no usa recursos con licencia dudosa.

## Handoff

El PR debe incluir:

- capturas a 390 px y 1440 px;
- texto final empleado;
- lista de assets y licencia/origen;
- URL del formulario de feedback como variable configurable;
- cualquier solicitud de token visual para Omar.

## Enlaces útiles

- [Motion para React](https://motion.dev/docs/react)
- [Animaciones de scroll con Motion](https://motion.dev/docs/react-scroll-animations)
- [Next.js Image](https://nextjs.org/docs/app/api-reference/components/image)
- [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [Kenney: recursos gráficos con licencia indicada](https://kenney.nl/assets)
- [Google Fonts: Pixelify Sans](https://fonts.google.com/specimen/Pixelify+Sans)

