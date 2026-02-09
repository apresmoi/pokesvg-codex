# APIs and Interfaces

## External APIs

None in the initial scope. PokeSVG is local-first and runs entirely in the browser.

## Clipboard interface (explicit)

- **Export**: copy a genome JSON string to the clipboard.
- **Import**: accept a genome JSON string via paste (Ctrl+V).

Implementation notes (inferred):

- Prefer `navigator.clipboard.writeText(...)` for export (with a fallback if needed).
- For import, listen to `paste` events and read `event.clipboardData.getData("text")`.

## LocalStorage interface (explicit)

Persist:

- caught collection (genomes)
- system settings

Keys (implemented):

- `pokesvg.collection.v2`
- `pokesvg.settings.v1`

Deprecated:

- `pokesvg.collection.v1` (v1 collection key; no migration required)

Persistence semantics (explicit):

- Discover creates an encounter but does not write to `localStorage`.
- Catch (and other explicit adds like Import) writes the updated collection.

## Genome JSON interface (explicit)

Export/import payload is a single JSON object representing a genome.

Validation rules (inferred; implemented):

- Must be a JSON object (not array/string).
- Must include `schemaVersion: 2` and minimally: `seed`, `plan`, `spine`, `head`, `face`, `limbs`, `tail`, `surface`, `palette`, `meta`.
- Enforce bounded ranges and maximum sizes (avoid huge payloads or extreme counts).

Import compatibility (explicit):

- Import accepts full `schemaVersion: 2` genomes.
- For older payloads, import falls back to seed-regenerate (see D-039):
  - a JSON number is treated as a seed
  - a JSON object with a numeric `seed` regenerates a v2 genome (v1 fields are ignored)

---
## Change log

### Phase 7 — GenomeV2 + Device UI Redesign (D-035)

**ADDED: v2 deprecation notes**
- Documented the intent to move to `schemaVersion: 2` and deprecate v1 collections without migration.

### Phase 10 — Catch/Let Go Flow + Device Control Polish (D-041, D-042)

**MODIFIED: when collection persistence happens**
- Was: collection persistence was implied on Discover.
- Now: persistence occurs only on explicit Catch/Import actions (no autosave).
<!-- unpack:1.0.0 -->
