# Testing and Quality

## Quality goals

- Keep generation deterministic: same genome always renders identically.
- Keep import/export robust: invalid payloads do not crash the app.
- Keep UI interactions reliable: button mapping and screen transitions are consistent.

## Test strategy (inferred)

### Unit tests

- Generator determinism: fixed seed -> stable genome.
- Anchor/part constraints: generated params are within bounds.
- Storage encode/decode: collection/settings round-trip through JSON/localStorage.
- Import validation: reject malformed or out-of-bounds genomes.

### Manual checks

- Visual check: Pokedex device layout (SVG) matches intended Gen 1 vibe.
- Interaction check: list/detail/config screens navigable via buttons.
- Performance check: scrolling a list of N mons remains responsive (N TBD).

## Tooling (needs confirmation)

The conversation requests no additional runtime libraries beyond React. Testing/linting tools are not discussed.

Proposed defaults (inferred, to confirm in Phase 1):

- Lint/format: ESLint + Prettier
- Unit tests: Vitest
<!-- unpack:1.0.0 -->
