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

- discovered collection (genomes)
- system settings

Keys (implemented):

- `pokesvg.collection.v2`
- `pokesvg.settings.v1`

Deprecated:

- `pokesvg.collection.v1` (v1 collection key; no migration required)

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
<!-- unpack:1.0.0 -->
