---
id: phase-2
title: "Genome + Generator v1 + Dex List/Detail + Persistence"
kind: delivery
status: planned
depends_on: ["phase-1"]
created: "2026-02-10"
updated: "2026-02-10"
unpack_version: "1.0.0"
---

# Phase 2 - Genome + Generator v1 + Dex List/Detail + Persistence

## Intent

Implement the first deterministic genome and generator/rendering pipeline, plus the core dex loop: discover -> browse (list/detail) -> persist in localStorage.

## Scope (in / out)

### In scope

- Define a `Genome` data model and serialization format.
- Implement a seeded PRNG and controlled generation (body plans + anchors + bounded params).
- Render mons as SVG inside the device screen.
- Implement discover, list view (thumbnails), detail view, and localStorage persistence.

### Out of scope

- System Config UI/logic (Phase 3).
- Import/export (Phase 3).
- Advanced art polish and extended animations (Phase 4+).

## Links

- Specs:
  - `./../specs/01-requirements.md`
  - `./../specs/02-domain-model.md`
  - `./../specs/03-architecture.md`
  - `./../specs/05-ux-and-flows.md`

## Decision refs

- D-004, D-007, D-008, D-009

## Work items (ordered)

- [ ] Define `Genome` shape, including fields needed for deterministic rendering [S: 02-domain-model#genome-explicit]
- [ ] Implement seeded PRNG and uniqueness guard for seeds/ids within the local collection [S: 01-requirements#functional-requirements]
- [ ] Implement generator v1:
  - body plans
  - anchors/relative positioning
  - a small curated set of parametric primitives (blob/capsule/horn/tail/pattern) [S: 01-requirements#non-functional-requirements]
- [ ] Implement `genome -> SVG` renderer with consistent outline/shading style [S: 03-architecture]
- [ ] Implement localStorage persistence for collection (load on startup, save on changes) [S: 04-apis-and-interfaces#localstorage-interface-explicit]
- [ ] Implement discover action + list/detail screens displaying real generated mons [S: 05-ux-and-flows]

## Completion criteria (must all be true)

- [ ] Discover generates a new mon and adds it to the list.
- [ ] List view shows thumbnails and supports selection/scrolling.
- [ ] Detail view shows the selected mon large and shows basic properties.
- [ ] Reloading the page restores the collection from localStorage.
- [ ] `genome -> SVG` rendering is deterministic for the same genome.

## Test plan

- Unit / type / lint:
  - Add minimal unit tests for PRNG determinism and genome round-trip (tooling TBD).
- Integration / e2e:
  - Manual: discover multiple mons, navigate list/detail, reload page, verify persistence.
- Notes:
  - If `schemaVersion` is adopted, record it as a confirmed decision.

## Open questions / blockers

- Confirm whether genomes must include a `schemaVersion` (recommended).

## Notes / steering log

- (none)
