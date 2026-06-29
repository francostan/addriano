# Addriano — TRACKS legibility cleanup + NEW RELEASE band

**Fecha:** 2026-06-27
**Estado:** PRD — listo para build (post-grill).
**Relacionado:** `2026-04-27-addriano-portfolio-hybrid-design.md` (diseño base híbrido Tech Manual + Vinyl Index + Tape Deck).

## Problem Statement

Dos problemas, una misma zona narrativa (hero → tracks):

1. **Legibilidad.** El bloque TRACKS (y por consistencia Sets/Lives/Dates) se lee como planilla densa: cada fila lleva su propio borde inferior 1.5px → exceso de líneas horizontales; 5 columnas compiten con peso parejo; la jerarquía grupo (A/B) vs track casi no se distingue. Cuesta escanear nombres de tracks de un vistazo.

2. **Lanzamiento nuevo sin lugar.** Addriano sacó el single **beheaded ritual** (SoundCloud) con una portada fuerte que ya habla el lenguaje Tech Manual del sitio (crosshairs, marcas de registro, coordenadas, `SCAN RESOLUTION 1200 DPI 8-BIT/MONO`). Hoy no hay forma de destacarlo como "último lanzamiento" ni de mostrar esa tapa.

## Solution

1. **Limpieza de fila propagada a todo el sitio.** Un lenguaje de fila único y limpio — aire entre grupos en vez de líneas por-row, título dominante, metadata tenue, fila activa en lima — definido una sola vez y heredado por los cuatro bloques. El catálogo se vuelve escaneable y editorial sin perder el carácter técnico.

2. **Banda NEW RELEASE.** Una celda dedicada entre el hero y TRACKS que destaca beheaded ritual con su portada entera, un `▶ PLAY` y link a SoundCloud. El single además aparece como fila normal dentro de TRACKS, igual que los demás. El CTA del hero deja de reproducir y pasa a ser un ancla que lleva a esta banda: narrativa limpia INTRO → NEW RELEASE → TRACKS, con un único motor de play para el último lanzamiento.

## User Stories

1. Como visitante del portfolio, quiero leer la lista de tracks sin ruido de líneas, para escanear los títulos de un vistazo.
2. Como visitante, quiero que el título de cada track domine sobre su metadata, para identificar la obra antes que los datos.
3. Como visitante, quiero que los grupos A/B (singles vs EP) se distingan por aire y no por más bordes, para entender la estructura sin esfuerzo.
4. Como visitante, quiero una numeración simple (1·2·3) dentro de cada grupo, para no leer la letra de lado repetida en cada fila.
5. Como visitante, quiero que la metadata (año, duración) sea tenue, para que no compita con el nombre del track.
6. Como visitante, quiero que la fila que está sonando se marque en lima, para saber qué reproduce sin ambigüedad.
7. Como visitante, quiero que Sets, Lives y Dates se lean con el mismo lenguaje limpio que Tracks, para percibir un sitio coherente.
8. Como visitante daltónico (el propio artista), quiero que el único color-señal de la UI siga siendo la lima, para no depender del verde de la portada como indicador.
9. Como visitante, quiero ver el último lanzamiento destacado apenas paso el hero, para descubrir lo más nuevo primero.
10. Como visitante, quiero ver la portada de beheaded ritual entera y a buen tamaño, porque su diseño es parte de la obra.
11. Como visitante, quiero reproducir beheaded ritual desde la banda con un click, para escucharlo sin buscar en la lista.
12. Como visitante, quiero un link a SoundCloud desde la banda, para abrir el track en su fuente.
13. Como visitante, quiero también encontrar beheaded ritual como fila normal dentro de TRACKS, para que conviva con el resto del catálogo.
14. Como visitante en el hero, quiero que el CTA de "último lanzamiento" me lleve a la banda destacada, para no tener dos puntos que reproducen lo mismo.
15. Como visitante en mobile, quiero que la banda apile la portada arriba y los controles abajo, para que se lea bien en pantalla angosta.
16. Como artista, quiero que la banda no repita el título ni las coordenadas que ya trae la portada, para evitar doble-chrome.
17. Como artista, quiero poder decidir más adelante si la banda muestra la portada completa o sólo el grabado central, sin rehacer el componente.
18. Como artista, quiero que la estética de la banda siga la línea de diseño existente (border ink, badge mono, JP en header), para que se sienta nativa.
19. Como mantenedor, quiero que el lenguaje de fila viva en un solo lugar, para cambiarlo una vez y que se propague a los cuatro bloques sin drift.

## Implementation Decisions

**Lenguaje de fila compartido (task 1).**
- Se definen clases/tokens del lenguaje de fila en la hoja de estilos base (Tailwind v4, `@utility`/`@layer`): fila base **sin** borde por-row, título dominante (display), metadata tenue (ink-2), separador-aire de grupo (una sola hairline bajo el header de grupo), estado activo en lima.
- Cada bloque conserva su propio `grid-cols` (sus columnas difieren) y sólo adopta estas clases. La lógica de columnas queda local; el lenguaje visual queda en un seam único (locality).
- Se descarta una primitiva `Block.Row` con slots: sería pass-through (poca conducta detrás de mucha interfaz, empuja la config de columnas a props) — falla el deletion test.

**TRACKS.**
- Se eliminan los bordes inferiores por-row. Grupos A/B separados por aire vertical. Hairline sólo bajo cada side-header.
- La columna de posición pasa de `A1/B1` a numeración simple `1·2·3` corrida por grupo (la letra de lado queda en el side-header, no en cada fila).
- Título dominante; año + duración en tono tenue; acciones `↓`/`▶` discretas al borde derecho. Fila activa en lima.

**Sets / Lives / Dates.**
- Adoptan las mismas clases. Los pills (kind/id) se mantienen: son tags funcionales, no ruido.
- Dates conserva su separador dashed (semántica upcoming/past) pero alinea spacing, título y metadata al lenguaje común.

**Banda NEW RELEASE (task 2).**
- Nuevo módulo de presentación (celda Block) con: badge mono `NEW RELEASE · 最新`, portada entera, `▶ PLAY` (lima) y `SOUNDCLOUD ↗`. No repite título ni coordenadas (los aporta la propia portada) → evita doble-chrome.
- La portada se renderiza con un parámetro de recorte (completa por defecto; recorte al grabado central como switch futuro) para poder alternar sin rehacer el componente.
- Se ubica en la composición raíz entre el hero y TRACKS, con un ancla (`#new-release`) como destino del scroll del hero.

**Hero.**
- El CTA `▶ LATEST` deja de reproducir y pasa a anclar/scrollear a la banda NEW RELEASE. Un único motor de play para el último lanzamiento (la banda). El resto del hero (identidad + redes) no cambia.

**Datos.**
- `beheaded ritual` se suma al catálogo como single (tope del grupo SINGLES → fila normal), con año 2026 y duración `04:40`, sin BPM/key (consistente con los demás singles). Su `embedUrl` es la URL de SoundCloud del track.
- Se expone un selector de "featured release" (función pura sobre los datos) que la banda consume explícitamente, en vez de inferir "el último del array".

**Color / daltonismo.**
- La lima sigue siendo el único color-señal de la UI. El verde de la portada es imagen (válido), nunca indicador funcional.

**Asset.**
- La portada se guarda en el repo como PNG (preserva nitidez del grabado), bajo `public/` siguiendo la convención de assets estáticos servidos sin bundler.

## Testing Decisions

Un buen test acá ejercita **comportamiento externo**, no detalles de implementación (clases CSS, estructura de markup). El cleanup visual no se testea por clases — se verifica visual + `build`.

- **Seam principal — `PlayerContext`.** Prior art: `components/Player/Player.test.tsx`. Se renderiza la banda dentro del provider y se verifica que el `▶ PLAY` de la banda fija `current` en beheaded ritual (mismo patrón que el play existente). Se prefiere este seam por ser el más alto y ya establecido.
- **Seam nuevo mínimo — selector `featured release`.** Función pura sobre los datos: se testea que devuelve beheaded ritual como destacado. Sin DOM.
- El ancla del hero (scroll) y la propagación de clases no se testean (bajo valor / detalle de presentación).

## Out of Scope

- Presskit como entregable aparte (PDF / página para prensa/bookers). "Presskit" acá = este mismo codebase.
- Decisión final portada completa vs sólo grabado central: se deja parametrizada, se decide después de ver la versión entera.
- Verde como acento funcional de UI.
- BPM/key para beheaded ritual.
- Audio local, CMS, router, modo oscuro, animaciones complejas (se mantienen los límites del PRD base).
- Una primitiva de fila genérica (`Block.Row`).

## Further Notes

- La portada ya trae chrome Tech Manual propio: por eso la banda es deliberadamente mínima (badge + play + link), para no triplicar marcos.
- Orden de build sugerido: Fase 0 asset → Fase 1 cleanup propagado → Fase 2 banda + datos + ancla hero → verificación (`test` + `build` + revisión visual).
