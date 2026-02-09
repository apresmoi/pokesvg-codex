# ADR-0003: Dex Storage v2 Key + Import Seed-Regenerate Fallback

- Status: accepted
- Date: 2026-02-10
- Decision ref: D-038, D-039

## Context

We are introducing a major breaking change (`GenomeV2`, `schemaVersion: 2`) and we do not want to migrate old local dex data. At the same time, import/export should remain low-friction for sharing.

## Decision

- Use a new `localStorage` key for the v2 dex collection: `pokesvg.collection.v2`.
- Import behavior:
  - Accept full `schemaVersion: 2` genome JSON.
  - Accept a JSON number as a seed and regenerate a v2 mon.
  - Accept a v1-like JSON object with a numeric `seed` and regenerate a v2 mon from the seed (ignore v1 fields).

## Alternatives considered

- Reuse `pokesvg.collection.v1` and clear on mismatch: feasible, but riskier and less explicit.
- Reject all non-v2 payloads: simplest, but makes sharing brittle if people have old exports.

## Consequences

- Positive:
  - Clean cut-over with no migration logic.
  - Import remains usable even if someone has older exports (seed-only regeneration).
- Negative:
  - A v1 import will not preserve the old appearance (only the seed).
- Follow-ups:
  - Implement this contract in `dexStorage` and `parseGenomeJsonOrRegenerate` during Phase 8.

