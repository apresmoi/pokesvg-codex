---
id: phase-14
title: "Steering: Explicit Control Mapping + Nav Button Remap"
kind: steering
status: done
depends_on: ["phase-12"]
created: "2026-02-10"
updated: "2026-02-10"
unpack_version: "1.0.0"
---

# Phase 14 - Steering: Explicit Control Mapping + Nav Button Remap

## Intent

Lock down the device control mapping (D-pad arrows + A/B) across List/Detail/Config, and clarify device button roles:

- Keep Discover, but reposition/re-skin so it doesn't read like an odd app button.
- Remove the current "Copy" button.
- Remap the two bottom navigation buttons: the former List button becomes Config; the former Config button becomes Copy/Export.

This phase is documentation + decision capture only; implementation should be a follow-on delivery phase.

## Links

- Specs:
  - `./../specs/01-requirements.md`
  - `./../specs/05-ux-and-flows.md`
- ADRs:
  - `./../decisions/adr-0004-vertical-clamshell-pokedex-ui.md`

## Decision refs

- D-046

## Work items (ordered)

- [x] Capture explicit per-screen control mapping (List/Detail/Config) in specs [S: 05-ux-and-flows]
- [x] Capture button role changes (Discover reposition; remove Copy; swap nav buttons) in specs [S: 01-requirements]
- [x] Append decision D-046 to project memory
- [x] Create a follow-on delivery phase for implementation
- [x] Update `.unpack/docs/index.md` phase table

## Completion criteria (must all be true)

- [x] Specs clearly define D-pad arrows + A/B behavior in List/Detail/Config.
- [x] Specs clarify device button roles: Discover exists (repositioned), no separate Copy button, nav button remap is stated.
- [x] Project memory contains D-046.
- [x] A delivery phase exists that scopes implementation work.

## Test plan

- Docs-only:
  - Ensure `.unpack/docs/index.md` links resolve.
  - Ensure phase YAML frontmatter is valid and `unpack_version` is present.

## Open questions / blockers

- (none)

