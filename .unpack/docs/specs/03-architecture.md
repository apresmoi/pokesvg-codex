# Architecture

## High-level shape (explicit)

- Single-page React app.
- Page chrome (layout/background) can be HTML/CSS.
- The Pokedex device is rendered as a single SVG.
- The device screen renders mons as SVG within a clipped viewport (`clipPath`).

## Major components (inferred, based on conversation)

- `App`: owns top-level state (collection, selection, current screen, settings).
  - Implemented scaffold: `src/App.tsx`
- `Background`: renders a soothing SVG background behind the floating device.
  - Implemented scaffold: `src/components/SoothingBackground/SoothingBackground.tsx`
- `PokedexDeviceSvg`:
  - outer casing + buttons (SVG groups with handlers)
  - screen viewport (clipPath)
  - routes the current "screen" content (list/detail/config/import UI)
  - Implemented scaffold: `src/components/PokedexDeviceSvg/PokedexDeviceSvg.tsx`
- `Screen` variants:
  - `DexListScreen` (thumbnails, scroll/selection)
  - `DexDetailScreen` (large mon + properties + export)
  - `SystemConfigScreen` (settings list, toggles)
  - `ImportOverlay` (on paste: validate + feedback)
  - Implemented placeholders: `src/components/screens/*`
- `Generator` (pure functions):
  - `generateGenome(seed, settings)` -> `Genome`
  - `renderGenomeSvg(genome)` -> React SVG elements
  - Implemented v1:
    - PRNG: `src/lib/prng.ts`
    - Genome: `src/lib/genome/generateGenome.ts`, `src/lib/genome/types.ts`
    - Renderer: `src/lib/genome/render/MonSvg.tsx`
- `Storage`:
  - load/save `collection` and `settings` from `localStorage`
  - Implemented (collection): `src/lib/storage/dexStorage.ts`
- `ImportExport`:
  - export: `navigator.clipboard.writeText(JSON.stringify(genome))`
  - import: paste listener -> parse/validate -> add/select

## Data flow (inferred)

1. On startup: load `collection/settings` from `localStorage` -> hydrate React state.
2. Render: `state -> PokedexDeviceSvg -> Screen -> (genome -> SVG)`.
3. On actions (buttons/paste): update state -> persist to `localStorage`.

## Library constraints (explicit)

The conversation requests "React, no more libraries" for the web app. Implications (inferred):

- Implement a small seeded PRNG in-repo (for determinism).
- Implement lightweight runtime validation in-repo for imported genomes.
- Keep UI primitives in SVG rather than adding UI frameworks.
<!-- unpack:1.0.0 -->
