---
id: phase-8
title: "GenomeV2: Topology Generator + Renderer"
kind: delivery
status: planned
depends_on: ["phase-7"]
created: "2026-02-10"
updated: "2026-02-10"
unpack_version: "1.0.0"
---

# Phase 8 - GenomeV2: Topology Generator + Renderer

## Intent

Make monsters structurally diverse by shipping a v2 procedural system: spine/segments/slots/part-families, plus surface features that dramatically change silhouettes.

## Scope (in / out)

### In scope

- Introduce `GenomeV2` (`schemaVersion: 2`) and a new generator pipeline driven by topology.
- Implement a v2 renderer capable of:
  - segmented body/spine silhouettes
  - attachment slots and part families per slot
  - surface features (spikes/bumps/ridges/etc) as overlays
- Update import/export parsing and persistence to the v2 contract.
- Keep determinism and bounded parameters.

### Out of scope

- Full UI/device redesign (Phase 9).
- Deep content library (ship a baseline of part families first).

## Links

- Specs:
  - `./../specs/02-domain-model.md`
  - `./../specs/03-architecture.md`
  - `./../specs/04-apis-and-interfaces.md`

## Decision refs

- D-034, D-035

## Work items (ordered)

- [ ] Define `GenomeV2` types and generator entrypoints [S: 02-domain-model#genome-explicit]
- [ ] Implement spine/segments body silhouette generator (2–N segments along a curve) [S: 01-requirements#non-functional-requirements]
- [ ] Implement attachment slots and 3–6 part families per slot (head/limbs/tail/surface) [S: 02-domain-model]
- [ ] Update renderer to dispatch to part-family renderers and keep SVG style consistent [S: 03-architecture]
- [ ] Update storage + import/export parsing for v2; remove/disable v1 migration requirements [S: 04-apis-and-interfaces]
- [ ] Add/extend unit tests for determinism and import validation [S: 06-testing-and-quality]

## Completion criteria (must all be true)

- [ ] Discover produces GenomeV2 mons that have meaningfully different silhouettes by default.
- [ ] `genome -> SVG` determinism holds for v2.
- [ ] Import/export works for v2 payloads per the chosen deprecation strategy.
- [ ] `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` all pass.

## Test plan

- Unit / type / lint:
  - `npm run lint`
  - `npm run typecheck`
  - `npm test`
  - `npm run build`
- Manual:
  - Generate 50+ mons and confirm silhouette diversity is obvious under default settings.

## Open questions / blockers

- Depends on Phase 7 decisions for deprecation/storage/import strategy.

## Notes / steering log

- Focus on silhouette/topology variety first; add deep variety libraries later.

