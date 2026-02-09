# Risks and Debt

## Current status

No code exists yet, so this is a pre-implementation risk register derived from the initial conversation.

## Key risks

- **Procedural creature quality**: uncontrolled randomness can produce "random shapes" instead of creature-like silhouettes.
- **Determinism drift**: changing the generator without versioning can break re-render fidelity for previously discovered mons.
- **Performance**: rendering many SVGs (thumbnails + filters/gradients) can get slow on lower-end devices.
- **LocalStorage constraints**: storage limits and JSON growth over time (especially with many discoveries).
- **Import safety**: pasted JSON must be validated and bounded to avoid crashes, huge payloads, or malformed rendering.
- **"No more libraries" constraint**: forces custom solutions for PRNG, schema validation, and UI primitives.

## Mitigations (planned)

- Use body plans + anchors + bounded parameter ranges; keep the part set small and curated.
- Store self-contained genomes and introduce a `schemaVersion` early (needs confirmation).
- Put a cap on stored mons (optional) or implement pagination/virtualization (later).
- Validate imported genomes and enforce limits (string lengths, ranges, max parts).
<!-- unpack:1.0.0 -->
