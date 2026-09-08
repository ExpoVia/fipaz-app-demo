# Erick — Simulación NFC, datos y estado compartido

## Resultado esperado

Hacer que la demo se sienta viva y coherente: el escáner NFC debe parecer realista, actualizar puntos/misiones y conservar el estado durante la sesión. No se conectará a hardware NFC ni a un backend real en esta entrega.

**Rama sugerida:** `feat/erick-nfc-demo-engine`  
**Contrato de tipos y store:** martes 8, 12:00  
**Entrega para integración:** miércoles 9, 11:00

## Archivos bajo tu responsabilidad

```text
src/features/nfc/
src/features/profile/
src/store/demo-store.ts
src/data/demo-data.ts
src/types/demo.ts
src/lib/demo-storage.ts
public/assets/nfc/
```

El store, tipos y dataset son contratos compartidos. Publica una primera versión temprano y evita cambios incompatibles después de las 14:00 del martes.

## Alcance técnico

### Sí hacer

- Flujo visual NFC controlado por estados.
- Datos mock tipados.
- Persistencia segura en `localStorage`.
- Actualización atómica de visita, puntos y progreso.
- Manejo de visita repetida.
- Reinicio de demo para la siguiente entrevista.

### No hacer ahora

- Web NFC real.
- OAuth o cuentas Google.
- API, WebSocket o base de datos.
- Tokens JWT.
- Canje real o inventario.
- Generación real de QR.

La simulación se elige por tiempo, compatibilidad entre iPhone/Android y fiabilidad durante las entrevistas. Debe estar rotulada como `Simulación NFC`.

## Máquina de estados NFC

```ts
export type NfcStage =
  | "idle"
  | "searching"
  | "detected"
  | "confirming"
  | "success"
  | "duplicate"
  | "error";
```

### Flujo principal

1. `idle`: explicación y botón `Iniciar simulación`.
2. `searching`: ondas animadas y texto `Acerca tu teléfono a la etiqueta`.
3. A los 1.5–2 segundos, `detected`: mostrar nombre/código de stand.
4. `confirming`: usuario confirma la visita.
5. `success`: sumar 50 puntos, registrar visita y actualizar misión.
6. CTA `Ver progreso` o `Volver al stand`.

### Visita repetida

Si `visitedStandIds` ya contiene el stand:

- pasar a `duplicate`;
- no sumar puntos;
- mostrar `Ya registraste este stand`;
- ofrecer `Ver otra misión`.

### Fallo demostrable

Agregar una acción discreta `Simular error` solo si hay tiempo. El estado debe ofrecer `Intentar de nuevo` y no perder datos.

## Estado inicial sugerido

```ts
export interface DemoState {
  activeTab: DemoTab;
  points: number;
  level: number;
  selectedStandId: string | null;
  selectedZoneId: string | null;
  visitedStandIds: string[];
  favoriteStandIds: string[];
  recentVisits: Visit[];
  lastKnownLocation: DemoLocation;
  nfcStage: NfcStage;
}
```

Valores iniciales:

- 150 puntos;
- nivel 2;
- dos stands visitados;
- misión principal `2/5`;
- ubicación simulada cerca de la entrada principal.

Acciones mínimas:

```ts
setActiveTab(tab)
selectStand(standId)
selectZone(zoneId)
toggleFavorite(standId)
startNfcScan(standId?)
confirmVisit(standId)
resetDemo()
```

## Regla de actualización

`confirmVisit` debe ejecutar una sola transición lógica:

1. validar que existe el stand;
2. comprobar duplicado;
3. agregar la visita;
4. agregar puntos;
5. recalcular progreso y nivel;
6. persistir la nueva versión;
7. cambiar a `success`.

No repartir esta actualización entre varios componentes.

## Persistencia

- Guardar solo estado serializable.
- Usar una clave versionada, por ejemplo `expovia-demo:v1`.
- Leer `localStorage` únicamente del lado cliente.
- Si los datos guardados son inválidos, restaurar estado inicial.
- `Reiniciar demo` debe pedir confirmación y limpiar únicamente esa clave.
- No guardar correo, teléfono, respuesta de entrevista ni otro dato personal.

## Datos mock

Definir en un solo lugar:

- evento;
- categorías;
- zonas;
- stands;
- misiones;
- premios;
- actividades;
- notificaciones.

Usar IDs estables como `stand-altura-labs` y `zone-blue`; nunca índices de arrays como identidad.

## Pantalla Perfil

- [ ] Avatar y nombre ficticio `Explorador ExpoVia`.
- [ ] Nivel, puntos y número de stands visitados.
- [ ] Historial reciente.
- [ ] Favoritos.
- [ ] Botón `Reiniciar demostración`.
- [ ] Etiqueta visible `Datos simulados`.

## Recursos visuales necesarios

Guardar en `public/assets/nfc/`.

- símbolo NFC original;
- tres ondas o anillos reutilizables;
- etiqueta/placa de stand;
- estrella o sello de éxito.

Es preferible construir ondas con CSS/SVG para mantenerlas nítidas y ligeras.

### Prompt para la etiqueta NFC

> Etiqueta física NFC ficticia para un stand de feria, vista frontal, estilo pixel-art contemporáneo de 16 bits, placa redondeada azul y violeta con ondas NFC amarillas, pequeño brillo de éxito, paleta clara ExpoVia, fondo transparente, sin texto, sin código QR, sin logos ni marcas existentes, legible a 96 píxeles.

### Prompt para la pantalla de éxito

> Emblema original de visita completada, estrella y pin de ubicación unidos, estilo pixel-art moderno de 16 bits, confeti mínimo, colores amarillo, azul cielo, rosa y violeta, contorno blanco, fondo transparente, sensación de logro profesional y amigable, sin texto ni logos.

## Criterios de aceptación

- El flujo completo tarda entre 3 y 6 segundos.
- Una visita válida suma exactamente 50 puntos una vez.
- Repetir el stand no suma puntos ni progreso.
- Inicio, Misiones y Perfil reflejan el cambio sin recarga.
- Recargar conserva el estado válido.
- Reiniciar devuelve el estado inicial.
- El flujo funciona en Safari iOS aunque el equipo no tenga NFC.
- No existen peticiones de red requeridas para completar el escaneo.

## Handoff

En el PR incluye:

- contrato final de tipos y selectores;
- video de éxito y duplicado;
- prueba manual de recarga y reinicio;
- explicación de cómo cambiar el stand detectado;
- advertencia visible de que es simulación.

## Enlaces útiles

- [Zustand: introducción](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [Zustand: persistencia](https://zustand.docs.pmnd.rs/integrations/persisting-store-data)
- [Zod](https://zod.dev/)
- [Motion para React](https://motion.dev/docs/react)
- [Web Storage en MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [Web NFC en MDN, solo como referencia futura](https://developer.mozilla.org/en-US/docs/Web/API/Web_NFC_API)

