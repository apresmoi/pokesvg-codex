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

Suggested (inferred) keys:

- `pokesvg.collection.v1`
- `pokesvg.settings.v1`

## Genome JSON interface (explicit)

Export/import payload is a single JSON object representing a genome.

Recommended validation rules (inferred):

- Must be a JSON object (not array/string).
- Must include minimally: `seed`, `plan`, `body`, `head`, `face`, `limbs`, `palette` (exact schema TBD).
- Enforce bounded ranges and maximum sizes (avoid huge payloads or extreme counts).
<!-- unpack:1.0.0 -->
