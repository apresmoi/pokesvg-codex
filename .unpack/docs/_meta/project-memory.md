# Project Memory

Append-only log of decisions, constraints, and rationale.

## Decisions

### D-001 - Build "PokeSVG" (Pokedex UI + procedural SVG mons) (Explicit)

- Date: 2026-02-10
- Decision: Build a Pokedex-style app ("PokeSVG") whose UI is a Pokedex device and whose mons are generated from composable SVG parts.
- Rationale: Core product concept.
- Evidence: "build a pokedex but called pokesvg... built with svg"

### D-002 - React web app; no additional runtime libraries beyond React (Explicit)

- Date: 2026-02-10
- Decision: Implement as a React web app; avoid additional runtime libraries.
- Rationale: Keep dependencies minimal.
- Evidence: "webapp using react, thats it, no more libraries"

### D-003 - Pokedex is centered and large; background is soothing SVG (Explicit)

- Date: 2026-02-10
- Decision: Pokedex floats in the middle of the screen and fills ~80% of browser height; page background is a soothing SVG.
- Rationale: Visual direction.
- Evidence: "floating in the middle... fill 80%... nice svg soothing background"

### D-004 - Save mons by storing genomes in localStorage (Explicit)

- Date: 2026-02-10
- Decision: Persist discovered mons in `localStorage` by storing the parameterization ("genome") object, not the rendered SVG.
- Rationale: Determinism, portability, and re-render fidelity.
- Evidence: "what we save is the parametrization of the pokemons"

### D-005 - Page uses HTML/CSS; device + mons are SVG (Explicit)

- Date: 2026-02-10
- Decision: The page may use HTML/CSS, but the Pokedex itself is SVG and the mons are SVG rendered inside it.
- Rationale: SVG-first product identity.
- Evidence: "web is HTML+CSS... pokedex itself is SVG"

### D-006 - Gen 1 Pokedex vibe is a stylistic reference (Explicit)

- Date: 2026-02-10
- Decision: Use Gen 1 Pokedex as a reference for the device vibe.
- Rationale: Familiar shape language.
- Evidence: "Gen1 is ok"

### D-007 - Infinite discovery via button (Explicit)

- Date: 2026-02-10
- Decision: Pressing a button generates a new mon; collection is effectively infinite.
- Rationale: Core loop.
- Evidence: "press a button and you generate a new one"

### D-008 - List + detail views (Explicit)

- Date: 2026-02-10
- Decision: Provide both a list view (thumbnails) and a detail view.
- Rationale: Navigation usability.
- Evidence: "yes, list and detail"

### D-009 - Compatibility via anchors/relative positioning; variable counts (Explicit)

- Date: 2026-02-10
- Decision: Parts must be generated compatibly (eyes relative to head, head relative to body, limbs relative to body), including variable counts (eyes/arms/legs).
- Rationale: Prevent incoherent outputs.
- Evidence: "define the eyes relative to it somehow"

### D-010 - Add a System Config screen (Explicit)

- Date: 2026-02-10
- Decision: Add a System Config screen inside the Pokedex UI to configure system settings.
- Rationale: Make art direction and generator presets adjustable in-device.
- Evidence: "config... system config screen"

### D-011 - MVP animations: blink + idle bob (Explicit)

- Date: 2026-02-10
- Decision: Start with blink and idle bob; extend later.
- Rationale: Keep MVP small.
- Evidence: "blink and idle first"

### D-012 - Export/import genomes (Explicit)

- Date: 2026-02-10
- Decision: Export by copying genome JSON; import by pasting JSON (Ctrl+V) and validating.
- Rationale: Sharing and reproducibility.
- Evidence: "export them... import... ctrl+v"

### D-013 - Version genomes with a schema version (Inferred)

- Date: 2026-02-10
- Decision: Include a `schemaVersion` field in genomes from day 1.
- Rationale: Future-proof generator changes without breaking old mons.
- Evidence: (suggested in conversation; not explicitly accepted)
<!-- unpack:1.0.0 -->
