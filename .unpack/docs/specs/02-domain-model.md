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
- **details** (inferred): small optional modifiers like tail and accessories

Implemented additions (inferred):

- `tail`: `{ family, length, curl }` (or `family: none`)
- `accessory`: `none` | `gem` | `antenna` | `collar` (defaults to `none` when absent)

> Note: Implementation uses `schemaVersion: 2` (GenomeV2). v1 genomes/collections are deprecated with no migration requirement (see D-035).

#### Genome V2 (implemented; topology-first) (explicit)

The current iteration is a clean-break `GenomeV2` (`schemaVersion: 2`) focused on **structural diversity**:

- **Spine / topology**: a seeded curve with 2–N body segments (posture + thickness profile).
- **Segments**: per-segment radii/width profile (taper, bulges, etc.).
- **Slots**: attachment points along the spine/segments (head, limb pairs, tail, dorsal/ventral surface features).
- **Part families**: each slot is filled from a small library of parametric part generators (not just scaled stubs).
- **Surface features**: overlays like spikes/bumps/ridges/crystals applied along the body outline.

Deprecation (explicit):

- v1 genomes/collections do not need migration; old collections can be discarded when moving to v2.

### Encounter (explicit)

An "encounter" is the most recently discovered mon before it is caught. It is ephemeral UI state (not part of the persisted dex) until the user explicitly chooses to Catch it.

Minimum: `genome`.

### Mon (explicit)

A "mon" is a caught instance in the user's local collection (dex).

Minimum: `genome`.

Likely additional fields (inferred): `caughtAt` (or `discoveredAt`), `favorite`, `notes`.

### Dex collection (explicit)

The user's local PokeSVG "dex" is an ordered list of caught mons, persisted locally.

### System settings (explicit)

The app has a System Config screen with global settings that affect:

- UI presentation (theme/background variant)
- generator defaults for future discoveries (preset, ranges)

**Invariant (inferred):** settings should not mutate previously caught mons; old genomes should re-render exactly as discovered.

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

Persist the collection by storing caught genomes in `localStorage`.

Suggested (inferred) storage keys:

- `pokesvg.collection.v2` (implemented)
- `pokesvg.collection.v1` (deprecated)
- `pokesvg.settings.v1` (implemented)

---
## Change log

### Phase 7 — GenomeV2 + Device UI Redesign (D-034, D-035)

**ADDED: planned GenomeV2**
- Added a topology-first `GenomeV2` direction (spine/segments/slots/part families) and recorded the explicit “no migration” stance for v1.

### Phase 10 — Catch/Let Go Flow + Device Control Polish (D-041, D-042)

**ADDED: encounter vs caught**
- Added the "encounter" concept as ephemeral state; clarified that the dex collection contains caught mons only.
<!-- unpack:1.0.0 -->
