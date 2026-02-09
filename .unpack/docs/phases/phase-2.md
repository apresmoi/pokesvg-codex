---
id: phase-2
title: "Genome + Generator v1 + Dex List/Detail + Persistence"
kind: delivery
status: done
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

- [x] Define `Genome` shape, including fields needed for deterministic rendering [S: 02-domain-model#genome-explicit]
- [x] Implement seeded PRNG and uniqueness guard for seeds/ids within the local collection [S: 01-requirements#functional-requirements]
- [x] Implement generator v1:
  - body plans
  - anchors/relative positioning
  - a small curated set of parametric primitives (blob/capsule/horn/tail/pattern) [S: 01-requirements#non-functional-requirements]
- [x] Implement `genome -> SVG` renderer with consistent outline/shading style [S: 03-architecture]
- [x] Implement localStorage persistence for collection (load on startup, save on changes) [S: 04-apis-and-interfaces#localstorage-interface-explicit]
- [x] Implement discover action + list/detail screens displaying real generated mons [S: 05-ux-and-flows]

## Completion criteria (must all be true)

- [x] Discover generates a new mon and adds it to the list.
- [x] List view shows thumbnails and supports selection/scrolling.
- [x] Detail view shows the selected mon large and shows basic properties.
- [x] Reloading the page restores the collection from localStorage.
- [x] `genome -> SVG` rendering is deterministic for the same genome.

## Test plan

- Unit / type / lint:
  - `npm run typecheck`
  - `npm test`
- Build:
  - `npm run build`
- Integration / e2e:
  - Manual: discover multiple mons, navigate list/detail, reload page, verify persistence.
- Notes:
  - If `schemaVersion` is adopted, record it as a confirmed decision.

## Open questions / blockers

- (none)

## Notes / steering log

- Implementation includes `schemaVersion: 1` in genomes (inferred; can be revised).
