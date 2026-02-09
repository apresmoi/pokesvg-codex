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
- Storage key strategy is to be decided in Phase 7:
  - bump to a new key (e.g. `pokesvg.collection.v2`), or
  - reuse the key and clear on schema mismatch.

## Genome JSON interface (explicit)

Export/import payload is a single JSON object representing a genome.

Validation rules (inferred; implemented in v1 import):

- Must be a JSON object (not array/string).
- Must include `schemaVersion: 1` and minimally: `seed`, `plan`, `body`, `head`, `face`, `limbs`, `palette`, `meta`.
- Enforce bounded ranges and maximum sizes (avoid huge payloads or extreme counts).

Planned (v2; explicit):

- Import/export will move to `schemaVersion: 2` with a topology-first genome shape (spine/segments/slots/part families).
- v1 payload handling is expected to be “no migration” (reject or seed-regenerate only), per D-035.

---
## Change log

### Phase 7 — GenomeV2 + Device UI Redesign (D-035)

**ADDED: v2 deprecation notes**
- Documented the intent to move to `schemaVersion: 2` and deprecate v1 collections without migration.
<!-- unpack:1.0.0 -->
