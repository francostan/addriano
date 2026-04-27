# Addriano Portfolio — Hybrid v2

**Fecha:** 2026-04-27
**Estado:** Spec borrador, pendiente review del usuario.

## Contexto

Portfolio para Addriano — DJ/productor. Géneros: hardgroove, 90's techno, groove, house, hypnotic. Referencias: Berlin/París underground. Live: RD-9 + TD-3 (hardware). Daltónico.

Iteración v2 sobre `Wireframes.html` (4 direcciones exploradas: Vinyl Index, Tape Deck, Tech Manual, Club Flyer). Club Flyer descartado.

## Síntesis (proporciones)

- **80% Tech Manual** — motor principal. Grid técnico de 12 col, celdas con border ink y badges `FIG. NN`, signal flow, layout claro y modular. Define toda la estructura post-hero.
- **Vinyl Index → solo el hero**. Aporta el bloque de presentación del artista: nombre dominante, tags, redes accesibles, foto al lado.
- **Tape Deck → solo la limpieza de reproducción**. Aporta sticky player persistente bottom + listas simples 1-click ▶.

Personalidad: japonés-limpio + carácter. No editorial frío. Densidad quirúrgica: 1 bloque-1 idea, JP solo en headers, max 5 items por lista.

## Stack

- Vite + React 18 + TypeScript
- Tailwind v4 (tokens definidos abajo)
- `@fontsource` — Archivo Black (display), Space Mono (body), Noto Sans JP (acentos)
- Audio: embeds SoundCloud / YouTube (iframe `loading="lazy"`). Local `/public/audio/` queda como upgrade futuro.
- Sin router. Single page, scroll vertical.
- Sin librería de estado. Context propio (Four Pillars).

## Ubicación

`/Users/francostan/Downloads/addriano/web/` — subcarpeta dentro del proyecto, al lado de `Wireframes.html` (que queda como referencia, no se importa).

## Mapping de fotos (literal)

| Slot | Source (`~/Documents/fotos/`) | Destino (`web/public/photos/`) | Formato | Contenido |
|---|---|---|---|---|
| Hero | `000014500022.jpg` | `hero.jpg` | vertical 9:16 | Guy + perro parado, álamos altos |
| Tracks | `000014500019.jpg` | `tracks.jpg` | landscape | RD-9 + chaqueta naranja, océano |
| Sets | `000014500021.jpg` | `sets.jpg` | landscape | Jardín, caminando |
| Lives | `000014500017.jpg` | `lives.jpg` | landscape | Estudio, synths, 2 ppl |
| Reserva | `000014500018.jpg` | `alt.jpg` | landscape | Pareja océano — sin asignar |

Las fotos se copian al `public/photos/` durante el setup. No se importan vía bundler.

## Estructura de archivos

```
web/
├─ public/photos/
│  ├─ hero.jpg
│  ├─ tracks.jpg
│  ├─ sets.jpg
│  ├─ lives.jpg
│  └─ alt.jpg
├─ src/
│  ├─ App.tsx
│  ├─ main.tsx
│  ├─ index.css                # tailwind base + tokens + fonts
│  ├─ components/
│  │  ├─ Player/
│  │  │  ├─ index.tsx          # Provider + dot export
│  │  │  ├─ context.ts
│  │  │  ├─ Sticky.tsx
│  │  │  ├─ Button.tsx
│  │  │  ├─ Wave.tsx
│  │  │  ├─ Time.tsx
│  │  │  └─ Embed.tsx
│  │  ├─ Block/
│  │  │  ├─ index.tsx          # wrapper + dot export
│  │  │  ├─ Header.tsx
│  │  │  ├─ Body.tsx
│  │  │  ├─ List.tsx
│  │  │  ├─ Photo.tsx
│  │  │  └─ Corner.tsx
│  │  ├─ Hero.tsx
│  │  ├─ SignalFlow.tsx
│  │  ├─ BonusGrid.tsx
│  │  └─ Chrome.tsx
│  ├─ data/
│  │  ├─ tracks.ts
│  │  ├─ sets.ts
│  │  ├─ lives.ts
│  │  └─ picks.ts              # weekly bonus (mock inicial)
│  └─ types.ts
├─ tailwind.config.ts
├─ vite.config.ts
├─ tsconfig.json
└─ package.json
```

## Layout (top → bottom)

Toda la página corre dentro de un marco Tech Manual: grid 12 col, celdas con border 1.5px ink, badges `FIG. NN`. El hero es la única excepción donde se inyecta lenguaje Vinyl Index.

1. **Chrome** (Tech Manual) — sticky top, 1 línea. `ADDRIANO` + JP subtítulo + meta `W17 / 2026`. Border-bottom 1.5px ink.

2. **Hero (Vinyl Index → presentación del artista)** — celda full-width dentro del grid, dividida 60/40:
   - Izq (60%): H1 `ADD<mark>RIA</mark>NO.` (`mark` = bg lima) · 4 tags (`DJ` `PRODUCER` `LIVE HW` `EST. ////`) · 1 párrafo bio (3 líneas max) · botones redes `SC ↗` `BC ↗` `IG ↗` · CTA `▶ LATEST TRACK` (lima).
   - Der (40%): foto `hero.jpg` vertical 9:16 full-bleed dentro del border ink. Esquina lima `FIG. 00`.

3. **Signal Flow** (Tech Manual, FIG. 01) — 1 línea horizontal. `RD-9 → TD-3 → MIXER → FX CHAIN → REC OUT`. FX chain destacado en lima.

4. **01 / TRACKS** · トラック (Tech Manual cell, FIG. 02) — Block grid 2 col: lista 5 tracks (BPM · key · duración · ▶ Tape Deck-style) + foto `tracks.jpg`.

5. **02 / SETS** · DJセット (Tech Manual cell, FIG. 03) — Block: lista 4 sets (fecha · venue · duración · ▶) + foto `sets.jpg`.

6. **03 / LIVES** · ライブ (Tech Manual cell, FIG. 04) — Block: lista 3 lives (RD9×TD3) + foto `lives.jpg`.

7. **04 / BONUS** · 週刊5 (Tech Manual cell, FIG. 05) — grid horizontal de 5 picks compactos (artist — track · label · ↗).

8. **Sticky Player (Tape Deck → reproducción)** — bottom persistente. ▶/⏸ + now playing + waveform decorativo + tiempo + ext link. Es el ÚNICO elemento que rompe el grid Tech Manual (intencional, por usabilidad).

## Componentes (Four Pillars: Context + Provider + Sub + Dot Notation)

### `Player`

- `PlayerContext`: `{ current: Track | null, isPlaying: boolean, play(t), pause(), toggle() }`
- `Player` Provider: maneja estado + iframe SC/YT oculto (1 sola instancia).
- Subs: `Player.Sticky`, `Player.Button`, `Player.Wave`, `Player.Time`, `Player.Embed`.
- Export: `export const Player = Object.assign(Provider, { Sticky, Button, Wave, Time, Embed })`.

### `Block`

- Wrapper celda Tech Manual: border 1.5px ink, fondo paper, padding, position relative.
- Subs: `Block.Header` (número grande Archivo Black + título + JP), `Block.Body`, `Block.List` (rows estandarizadas Tape Deck-style), `Block.Photo` (border + label esquina), `Block.Corner` (badge top-right `FIG. NN`, ink default / lima opcional).
- Sin Context propio (no necesita estado compartido entre subs en v2).

### Otros

- `<Hero>` — composición fija (lenguaje Vinyl Index), recibe artist data.
- `<SignalFlow>` — array de nodos, hijo destacado en lima.
- `<BonusGrid>` — array de 5 picks, layout horizontal compacto.
- `<Chrome>` — sticky header.

## Data shapes

```ts
type Track = {
  id: string;
  title: string;
  year: number;
  label?: string;
  bpm: number;
  musicalKey: string;     // "F min"
  duration: string;       // "06:42"
  embedUrl: string;       // SC widget URL
  tag?: 'NEW' | 'UNREL.' | 'SPLIT EP' | 'BC' | 'TAPE';
};

type DJSet = {
  id: string;
  date: string;           // "2026-04-26"
  venue: string;
  city: string;
  genre: string;
  duration: string;       // "02:14:03"
  embedUrl: string;
};

type Live = {
  id: string;
  title: string;
  setup: string;          // "RD-9 × TD-3"
  context: string;        // "outdoor"
  duration: string;
  embedUrl: string;
};

type Pick = {
  id: string;
  artist: string;
  track: string;
  label?: string;
  year?: number;
  url: string;
  source: 'SC' | 'BC' | 'YT';
};
```

Todo estático en `src/data/*.ts`. Reemplazar con URLs reales cuando lleguen.

## Tokens

```ts
// tailwind.config.ts
theme.extend.colors = {
  paper:    '#f1ede2',
  'paper-2': '#e8e3d4',
  ink:      '#141414',
  'ink-2':  '#3a3a36',
  lime:     '#d4ff3a',
  'lime-2': '#b8e02a',
};
```

Tipografía:
- Display (H1, números bloque): Archivo Black
- Body / mono / micro: Space Mono
- Acento JP: Noto Sans JP

Bordes: 1.5px ink. Radio: 0 (rectangular puro). Sin sombras (excepto offset duro 6px ink en CTAs principales).

## Comportamiento

- **Click ▶ en lista** → set current track → embed loads → play. Row activa con bg lima. Sticky player muestra info.
- **Sticky player** persistente. Toggle play/pause. Click `↗` abre source en pestaña nueva.
- **Embeds**: 1 iframe oculto controlado via SoundCloud Widget API (`window.SC.Widget`). YouTube via postMessage si se usa.
- **Mobile**: hero stack vertical (foto debajo del texto), blocks 1 col, sticky player full-width simplificado.
- **Daltonismo**: solo lima `#d4ff3a` + b/n. Verificado para deuteranopia/protanopia.

## Out of scope (v2)

- Router multi-página
- Audio local
- CMS / archivo histórico de bonus picks
- Animaciones complejas (solo hover sutil: bg lima en row)
- Modo oscuro
- Diagrama del rig al hover
- Importar `Wireframes.html` al `web/`

## Riesgos

- **SoundCloud Widget API**: tracks privados pueden requerir permisos. Validar antes de implementar embeds finales.
- **Bonus picks reales**: arrancamos con mock. Si Addriano cambia formato semanal (audio vs solo link), ajustar `Pick`.

## Preguntas abiertas

- Source dominante embeds: ¿SC para todo? ¿mix SC + YT?
- Bio del hero: ¿texto exacto o uso draft genérico?
- Datos reales (track names, set venues, BPM, etc.): ¿pasás ahora o uso mock?
