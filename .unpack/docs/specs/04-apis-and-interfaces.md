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

- `pokesvg.collection.v1`
- `pokesvg.settings.v1`

Planned (v2; explicit):

- Introduce `schemaVersion: 2` genomes and deprecate v1 collections (no migration required).
- Store v2 dex under a new key: `pokesvg.collection.v2` (see D-038).

## Genome JSON interface (explicit)

Export/import payload is a single JSON object representing a genome.

Validation rules (inferred; implemented in v1 import):

- Must be a JSON object (not array/string).
- Must include `schemaVersion: 1` and minimally: `seed`, `plan`, `body`, `head`, `face`, `limbs`, `palette`, `meta`.
- Enforce bounded ranges and maximum sizes (avoid huge payloads or extreme counts).

Planned (v2; explicit):

- Import/export will move to `schemaVersion: 2` with a topology-first genome shape (spine/segments/slots/part families).
- v1 payload handling is “seed-regenerate” (see D-039).

---
## Change log

### Phase 7 — GenomeV2 + Device UI Redesign (D-035)

**ADDED: v2 deprecation notes**
- Documented the intent to move to `schemaVersion: 2` and deprecate v1 collections without migration.
<!-- unpack:1.0.0 -->
