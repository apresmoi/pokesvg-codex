# Architecture

## High-level shape (explicit)

- Single-page React app.
- Page chrome (layout/background) can be HTML/CSS.
- The Pokedex device is rendered as a single SVG.
- The device screen renders mons as SVG within a clipped viewport (`clipPath`).

## Major components (inferred, based on conversation)

- `App`: composition layer; app orchestration/state transitions live in hooks (see D-033).
  - UI composition: `src/App.tsx`
  - Orchestration: `src/hooks/usePokesvgApp.ts`
- `Background`: renders a soothing SVG background behind the floating device.
  - Implemented scaffold: `src/components/SoothingBackground/SoothingBackground.tsx`
- `PokedexDeviceSvg`:
  - outer casing + buttons (SVG groups with handlers)
  - screen viewport (clipPath)
  - routes the current "screen" content (list/detail/config/import UI)
  - Implemented scaffold: `src/components/PokedexDeviceSvg/PokedexDeviceSvg.tsx`
  - Planned (v2): redesign to a more iconic device form factor with tactile control feedback (see D-036)
- `Screen` variants:
  - `DexListScreen` (thumbnails, scroll/selection)
  - `DexDetailScreen` (large mon + properties + export)
  - `SystemConfigScreen` (settings list, toggles)
  - Implemented placeholders: `src/components/screens/*`
- `Generator` (pure functions):
  - `generateGenome(seed, settings)` -> `Genome`
  - `renderGenomeSvg(genome)` -> React SVG elements
  - Implemented v1:
    - PRNG: `src/lib/prng.ts`
    - Genome: `src/lib/genome/generateGenome.ts`, `src/lib/genome/types.ts`
    - Renderer: `src/lib/genome/render/MonSvg/MonSvg.tsx`
  - Planned v2:
    - Topology-first generator (`GenomeV2`, `schemaVersion: 2`) driven by spine/segments/slots and part families (see D-034, D-035)
- `Storage`:
  - load/save `collection` and `settings` from `localStorage`
  - Implemented (collection): `src/lib/storage/dexStorage.ts`
  - Implemented (settings): `src/lib/storage/settingsStorage.ts`
- `ImportExport`:
  - export: `navigator.clipboard.writeText(JSON.stringify(genome))`
  - import: paste listener -> parse/validate -> add/select -> toast feedback

## Data flow (inferred)

1. On startup: load `collection/settings` from `localStorage` -> hydrate React state.
2. Render: `state -> PokedexDeviceSvg -> Screen -> (genome -> SVG)`.
3. On actions (buttons/paste): update state -> persist to `localStorage`.

## Styling conventions (explicit, per D-033)

- Prefer CSS classes in `src/styles/global.css` for static styling/layout.
- Allow inline styles only when setting dynamic CSS variables / animation timings.

## Library constraints (explicit)

The conversation requests "React, no more libraries" for the web app. Implications (inferred):

- Implement a small seeded PRNG in-repo (for determinism).
- Implement lightweight runtime validation in-repo for imported genomes.
- Keep UI primitives in SVG rather than adding UI frameworks.

---
## Change log

### Phase 6 — React Component Practices Alignment (D-033)

**ADDED: React practice doc**
- `.unpack/docs/practices/typescript/react.md`

**MODIFIED: App orchestration location**
- Was: `src/App.tsx` held most orchestration logic directly.
- Now: `src/App.tsx` is composition; orchestration lives under `src/hooks/` (see `src/hooks/usePokesvgApp.ts`).

### Phase 7 — GenomeV2 + Device UI Redesign (D-034, D-035, D-036)

**ADDED: planned v2 generator direction**
- Recorded the intended move to a topology-first `GenomeV2` (spine/segments/slots/part families) with a clean schema break.

**ADDED: planned device UI redesign direction**
- Recorded the intent to redesign `PokedexDeviceSvg` to a more iconic layout with device-native controls and press feedback.
<!-- unpack:1.0.0 -->
