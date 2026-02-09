---
id: phase-10
title: "Steering: Catch/Let Go Flow + Device Control Polish"
kind: steering
status: done
depends_on: ["phase-9"]
created: "2026-02-10"
updated: "2026-02-10"
unpack_version: "1.0.0"
---

# Phase 10 - Steering: Catch/Let Go Flow + Device Control Polish

## Intent

Respond to UX + device layout issues discovered in the current UI: fix decorative/indicator placement, use the screen space better, and change the core loop so users explicitly choose which mons to keep (Catch/Let Go) instead of autosaving every encounter.

## Scope (in / out)

### In scope

- Lock the updated discovery/capture flow and persistence semantics (no autosave).
- Record device layout corrections (top indicator lights) and control direction (more iconic, less text-labeled).
- Update specs + decisions to reflect the new direction.
- Create delivery phases for implementation work.

### Out of scope

- Implementing the UI/code changes (Phase 11/12).

## Links

- Specs:
  - `./../specs/00-overview.md`
  - `./../specs/01-requirements.md`
  - `./../specs/02-domain-model.md`
  - `./../specs/03-architecture.md`
  - `./../specs/04-apis-and-interfaces.md`
  - `./../specs/05-ux-and-flows.md`
- ADRs:
  - `./../decisions/adr-0004-vertical-clamshell-pokedex-ui.md`

## Decision refs

- D-041, D-042, D-043, D-044, D-045

## Work items (ordered)

- [x] Specify the new "encounter -> catch/let go" flow and update persistence semantics (no autosave) [S: 05-ux-and-flows]
- [x] Record list density + device indicator light placement corrections [S: 01-requirements]
- [x] Record control redesign direction: move away from text labels toward iconic Pokedex-like unlabeled controls [S: 05-ux-and-flows]
- [x] Patch affected specs + add change-log entries referencing this steering [S: 00-overview, 01-requirements, 02-domain-model, 03-architecture, 04-apis-and-interfaces, 05-ux-and-flows]
- [x] Create Phase 11/12 delivery phases with clear scope and test plans
- [x] Update `.unpack/docs/index.md` to include new phases and current focus

## Completion criteria (must all be true)

- [x] Specs reflect the updated discovery/capture flow and no-autosave stance.
- [x] Decisions are logged in project-memory.
- [x] Delivery phases exist for implementation (Phase 11/12).
- [x] `.unpack/docs/index.md` phase table and current focus are updated.

## Test plan

Docs-only.

## Open questions / blockers

- (none)

## Notes / steering log

- Trigger: user feedback on device layout (indicator lights), list density, and the desire to only save mons the user explicitly catches.

