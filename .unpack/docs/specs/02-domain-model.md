# Domain Model

## Core concepts

### Genome (explicit)

A `genome` is the canonical, deterministic description of a mon. It is what gets:

- generated on "Discover"
- stored in `localStorage`
- exported/imported as JSON
- rendered as SVG (`genome -> SVG`)

The genome should encode both:

- **structure**: body plan, parts, proportions, anchors-relative params
- **style**: palette, outline/shading params, patterns
- **behavior**: animation params (blink, idle bob)
- **details** (inferred): small optional modifiers like tail style and accessories

Implemented additions (inferred):

- `limbs.tailStyle`: `taper` | `leaf` | `club` (optional; defaults to `taper` when absent)
- `accessory`: `none` | `gem` | `antenna` | `collar` (defaults to `none` when absent)

> Note: Implementation currently uses `schemaVersion: 1` (v1). A clean-break `schemaVersion: 2` is planned (see D-035).

#### Genome V2 (planned; topology-first) (explicit)

The next intended iteration is a clean-break `GenomeV2` (`schemaVersion: 2`) focused on **structural diversity**:

- **Spine / topology**: a seeded curve with 2–N body segments (posture + thickness profile).
- **Segments**: per-segment radii/width profile (taper, bulges, etc.).
- **Slots**: attachment points along the spine/segments (head, limb pairs, tail, dorsal/ventral surface features).
- **Part families**: each slot is filled from a small library of parametric part generators (not just scaled stubs).
- **Surface features**: overlays like spikes/bumps/ridges/crystals applied along the body outline.

Deprecation (explicit):

- v1 genomes/collections do not need migration; old collections can be discarded when moving to v2.

### Mon (inferred)

A "mon" is a discovered instance in the user's local collection.

Minimum: `genome`.

Likely additional fields (inferred): `discoveredAt`, `favorite`, `notes`.

### Dex collection (explicit)

The user's local PokeSVG "dex" is an ordered list of discovered mons, persisted locally.

### System settings (explicit)

The app has a System Config screen with global settings that affect:

- UI presentation (theme/background variant)
- generator defaults for future discoveries (preset, ranges)

**Invariant (inferred):** settings should not mutate previously discovered mons; old genomes should re-render exactly as discovered.

Implemented (inferred):

- Settings are stored separately from genomes under `pokesvg.settings.v1`.
- Current settings fields: `generatorPreset`, `backgroundVariant`, `animations`.
  - Background variants: `aurora` | `grid` | `mist`.

## Body plans (explicit)

Body plans constrain morphology so outputs remain creature-like. Initial candidates mentioned:

- `biped`
- `quadruped`
- `avian`
- `serpentine`
- `blob`
- `insectoid`

## Coordinate system and anchors (explicit)

The generator relies on a normalized internal coordinate system and anchor points so parts are compatible:

- Fixed `viewBox` (example used in conversation: `0 0 256 256`)
- Parts (head/eyes/limbs/tail) are positioned relative to derived anchors, not absolute random coordinates.

## Local persistence (explicit)

Persist the collection by storing genomes in `localStorage`.

Suggested (inferred) storage keys:

- `pokesvg.collection.v1` (implemented)
- `pokesvg.settings.v1` (implemented)

---
## Change log

### Phase 7 — GenomeV2 + Device UI Redesign (D-034, D-035)

**ADDED: planned GenomeV2**
- Added a topology-first `GenomeV2` direction (spine/segments/slots/part families) and recorded the explicit “no migration” stance for v1.
<!-- unpack:1.0.0 -->
