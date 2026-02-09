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

> Note: `schemaVersion` was suggested in the conversation but not explicitly accepted. Treat it as **recommended** until confirmed.

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

- `pokesvg.collection.v1`
- `pokesvg.settings.v1`
<!-- unpack:1.0.0 -->
