---
id: phase-16
title: "Steering: Share Code Export (Base64) + Footer Credit"
kind: steering
status: done
depends_on: ["phase-12"]
created: "2026-02-10"
updated: "2026-02-10"
unpack_version: "1.0.0"
---

# Phase 16 - Steering: Share Code Export (Base64) + Footer Credit

## Intent

Refine sharing and attribution UX:

- Export/copy should use a compact base64-coded share string instead of raw JSON.
- Add a small footer credit: "Built with Unpack" and link to the GitHub repo.

This phase is documentation + decision capture only; implementation should be a follow-on delivery phase.

## Links

- Specs:
  - `./../specs/01-requirements.md`
  - `./../specs/04-apis-and-interfaces.md`
  - `./../specs/05-ux-and-flows.md`
- Phases:
  - `./phase-15.md`

## Decision refs

- D-047

## Work items (ordered)

- [x] Update export/import UX spec to use a base64-coded share string [S: 05-ux-and-flows]
- [x] Update requirements to reflect share code export + decode-on-import [S: 01-requirements]
- [x] Capture the encoding scheme (prefix + base64url) in APIs/interfaces spec [S: 04-apis-and-interfaces]
- [x] Append decision D-047 to project memory
- [x] Create a follow-on delivery phase for implementation
- [x] Update `.unpack/docs/index.md` phase table

## Completion criteria (must all be true)

- [x] Specs define export/import via share code (base64-coded string) and document an encoding scheme.
- [x] Specs define footer credit and link targets.
- [x] Project memory contains D-047.
- [x] A delivery phase exists that scopes implementation work.

## Test plan

- Docs-only:
  - Ensure `.unpack/docs/index.md` links resolve.
  - Ensure phase YAML frontmatter is valid and `unpack_version` is present.

## Open questions / blockers

- (none)

