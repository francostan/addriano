# Addriano — Motion tokens + pulido invisible (transitions.dev)

**Fecha:** 2026-06-29
**Estado:** Diseño aprobado — en build.
**Relacionado:** `2026-06-27-tracks-cleanup-new-release-band.md` (row-language como seam único; este spec aplica el mismo patrón a motion).

## Problem Statement

El sitio tiene motion ad-hoc, disperso e inconsistente, sin guard de accesibilidad:

- 7× `transition-colors` sin duración → default duro de Tailwind (150ms), easing lineal.
- `Chrome.tsx`: `transition-all duration-500 ease-out` — `transition-all` anima todo (smell), duración fuera de escala.
- `Player/Inline.tsx`: `transition-transform` sin duración.
- `@keyframes beat` infinito (1.2s) sin manera de neutralizarlo.
- **Cero `prefers-reduced-motion`** en todo el proyecto → gap de accesibilidad.
- **Sin `scroll-behavior: smooth`** → el ancla hero → `#new-release` salta seco.
- Duraciones sueltas (150 / 500 / 1200ms), sin lenguaje común.

## Solution

Un **seam de motion tokens** — gemelo del row-language — que centraliza easing y duración en `@theme`/`index.css`, propaga consistencia a todo lo existente vía los defaults de Tailwind (cero churn en call-sites), cierra el gap de reduced-motion y suaviza el scroll. Filosofía transitions.dev (motion tokens semánticos, easing consistente, reduced-motion guard) escrita **nativa** en el sistema propio — sin clases `t-*` ajenas.

Objetivo: "pulido invisible" — smoothness imperceptible, nada que llame la atención. Respeta la estética parca Tech Manual y el constraint de daltonismo (la lima sigue siendo el único color-señal).

## Decisiones (post-brainstorm)

- **Intensidad:** pulido invisible. Solo estandarizar/suavizar lo que ya existe. Cero microinteracciones expresivas.
- **Adopción:** híbrido. La auditoría de transitions.dev (read-only) fundamenta el inventario; los tokens finales se escriben nativos en `@theme`. Sin `t-*`.
- **Scope:** ronda pura de pulido. Cero comportamiento nuevo. El skeleton/shimmer de carga del widget SoundCloud queda **fuera** (depende de eventos del iframe → ronda futura).
- **Glifo play/pause:** el swap queda instantáneo; el `bg-lime` del botón se suaviza vía token. Sin cross-fade en capa (sería comportamiento nuevo).

## Implementation

### 1. Seam de tokens (`web/src/index.css`, `@theme`)

```css
@theme {
  --ease-smooth: cubic-bezier(0.2, 0.8, 0.2, 1);   /* decelerate estándar */
  --default-transition-timing-function: var(--ease-smooth);
  --default-transition-duration: 150ms;            /* base de TODO transition-* */
  --t-base: 180ms;                                 /* state changes (active row) */
  --t-slow: 360ms;                                 /* reveals grandes (sticky header) */
}
```

Setear los `--default-transition-*` de Tailwind hace que los 7 `transition-colors`/`transition-transform` existentes hereden easing + duración consistentes **sin tocar un call-site**. El seam se gana su lugar por el deletion test: borrarlo re-dispersa duraciones por todo el código (locality).

### 2. Migración / outliers

| Lugar | Hoy | Queda |
|---|---|---|
| 7× `transition-colors` | default 150 lineal | heredan `--ease-smooth` (cero churn) |
| `Chrome.tsx:16` | `transition-all duration-500` | `transition-[opacity,transform]` a `--t-slow` |
| `Player/Inline.tsx:36` | `transition-transform` s/duración | hereda token (sin cambio de código) |
| active row (lima) | `.row` cambia bg seco | `.row` gana `transition` → lima entra en `--t-base` |

El progress bar (`Inline`/`Progress`, width por inline-style) **no** recibe transition: se actualiza por tick del SC API; animarlo introduciría lag/jitter.

### 3. Reduced-motion + smooth-scroll (`index.css`)

```css
html { scroll-behavior: smooth; }

@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}
```

Cierra el gap de accesibilidad y neutraliza el `.beat` infinito para quien pide menos motion.

## Testing

El pulido **no se testea por clases CSS** (precedente: row-cleanup). Se verifica con `test` (los existentes deben seguir pasando), `build` y revisión visual. Cero tests nuevos — no aportan valor acá.

## Out of Scope

- Skeleton/shimmer de carga del widget SoundCloud (ronda futura).
- Cross-fade en capa del glifo play/pause.
- Microinteracciones expresivas (number pop-in, success check, text-reveal, etc.).
- Instalar la skill `transitions.dev` como dependencia del repo (solo se usó su filosofía/auditoría).

## Locality / deep module

Todo el motion vive en `index.css`/`@theme`. Los componentes no aprenden nada nuevo (salvo Chrome, que solo deja de sobre-animar). Mucha suavidad detrás de una interfaz de tokens chica.
