# APIs and Interfaces

## External APIs

None in the initial scope. PokeSVG is local-first and runs entirely in the browser.

## Clipboard interface (explicit)

- **Export**: copy a compact share code string to the clipboard (not raw JSON).
- **Import**: accept a share code string via paste (Ctrl+V). (Raw JSON may be accepted for backward compatibility.)

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

## Share code interface (explicit; D-047)

Export/import uses a compact share code string suitable for messaging.

Proposed format (inferred, needs confirmation):

- Prefix: `pokesvg:`
- Payload: base64url-encoded UTF-8 JSON of the genome payload (no padding `=`).
- Example shape: `pokesvg:<base64url>`

Notes:

- "base64url" means `+` -> `-`, `/` -> `_`, and no trailing `=`.
- Decoding should validate the genome exactly as if it were imported from JSON.
- Import may optionally accept raw JSON for backward compatibility, but export should emit share codes only.

---
## Change log

### Phase 7 — GenomeV2 + Device UI Redesign (D-035)

**ADDED: v2 deprecation notes**
- Documented the intent to move to `schemaVersion: 2` and deprecate v1 collections without migration.

### Phase 10 — Catch/Let Go Flow + Device Control Polish (D-041, D-042)

**MODIFIED: when collection persistence happens**
- Was: collection persistence was implied on Discover.
- Now: persistence occurs only on explicit Catch/Import actions (no autosave).

### Phase 16 — Share Code Export (Base64) + Footer Credit (D-047)

**MODIFIED: clipboard interface**
- Was: Export/import used raw genome JSON.
- Now: Export/import uses a compact share code string (base64-coded).

**ADDED: share code interface**
- Documented an explicit share-code contract (prefix + base64url payload).
<!-- unpack:1.0.0 -->
