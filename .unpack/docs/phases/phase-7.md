---
id: phase-7
title: "Steering: GenomeV2 + Device UI Redesign"
kind: steering
status: planned
depends_on: ["phase-6"]
created: "2026-02-10"
updated: "2026-02-10"
unpack_version: "1.0.0"
---

# Phase 7 - Steering: GenomeV2 + Device UI Redesign

## Intent

Record and formalize the next major direction change: a topology-first monster generator (GenomeV2) and a redesigned, more iconic Pokedex device UI.

## Scope (in / out)

### In scope

- Define the v2 generator architecture (spine/segments/slots/part families) and update specs accordingly.
- Decide how to deprecate v1 genomes/collections and what the new storage/import contract is.
- Decide the target device form factor and control behavior/polish requirements (press feedback, all controls inside device).
- Update docs + phases so code can follow in the next delivery phases.

### Out of scope

- Implementing the new generator/renderer (Phase 8).
- Implementing the new device SVG geometry/animations (Phase 9).

## Links

- Specs:
  - `./../specs/00-overview.md`
  - `./../specs/01-requirements.md`
  - `./../specs/02-domain-model.md`
  - `./../specs/03-architecture.md`
  - `./../specs/04-apis-and-interfaces.md`
  - `./../specs/05-ux-and-flows.md`

## Decision refs

- D-034, D-035, D-036

## Work items (ordered)

- [ ] Specify `GenomeV2` schema at the doc level: spine/segments/slots + part families [S: 02-domain-model]
- [ ] Decide the deprecation story:
  - storage key strategy (new key vs clear on mismatch)
  - import/export handling of v1 payloads (reject vs regenerate-from-seed) [S: 04-apis-and-interfaces]
- [ ] Choose target device form factor (more iconic Pokedex layout) and control affordances (press feedback, transitions) [S: 05-ux-and-flows]
- [ ] Patch the affected specs + add change-log entries referencing this steering [S: 00-overview, 01-requirements, 03-architecture]
- [ ] Ensure `.unpack/docs/index.md` points to the new phases and sets current focus correctly

## Completion criteria (must all be true)

- [ ] Specs reflect the intended v2 direction and clearly label what is “current (v1)” vs “planned (v2)”.
- [ ] Open questions are either resolved or explicitly listed in this phase.
- [ ] Phase 8 and Phase 9 exist with clear scope and test plans.

## Test plan

Docs-only.

## Open questions / blockers

- Exact device form factor: vertical clamshell (Gen 1 style) vs a different “iconic” layout?
- Storage/deprecation strategy: new `localStorage` key for v2 (`pokesvg.collection.v2`) vs reusing the key and clearing on schema mismatch?
- Import/export behavior for v1 genomes: hard reject, or accept “seed-only” input to regenerate with v2?

## Notes / steering log

- This steering phase comes from a follow-up research conversation requesting “wilder” monsters and a more polished, more recognizable device UI.

