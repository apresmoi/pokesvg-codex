---
id: phase-11
title: "Catch/Let Go: Encounter Flow + Persistence"
kind: delivery
status: done
depends_on: ["phase-10"]
created: "2026-02-10"
updated: "2026-02-10"
unpack_version: "1.0.0"
---

# Phase 11 - Catch/Let Go: Encounter Flow + Persistence

## Intent

Make Discover create an ephemeral encounter and require an explicit Catch/Let Go decision; only caught mons are added to the dex and persisted.

## Scope (in / out)

### In scope

- Introduce an "encounter" state in app orchestration (not persisted).
- Update Discover to generate/select the encounter without writing to `localStorage`.
- Add actions:
  - Catch: add encounter to collection, persist, and route to an appropriate screen.
  - Let Go: discard encounter and return to the list (no persistence).
- Adjust Dex list layout to show 3 items in the device screen viewport (where feasible).
- Ensure import still adds to the collection immediately (treated as an explicit catch).
- Update/extend tests for storage and app behavior.

### Out of scope

- Device casing/control geometry changes and control label redesign (Phase 12).

## Links

- Specs:
  - `./../specs/01-requirements.md`
  - `./../specs/02-domain-model.md`
  - `./../specs/03-architecture.md`
  - `./../specs/04-apis-and-interfaces.md`
  - `./../specs/05-ux-and-flows.md`

## Decision refs

- D-041, D-042, D-043

## Work items (ordered)

- [x] Update app state model to support an ephemeral encounter [S: 03-architecture]
- [x] Change Discover to create an encounter without persisting [S: 05-ux-and-flows]
- [x] Add Catch/Let Go UI + handlers and route behavior [S: 05-ux-and-flows]
- [x] Update dex persistence to write only on Catch (and other explicit adds like Import) [S: 04-apis-and-interfaces]
- [x] Adjust list layout to fit 3 items in the viewport (without making it unreadable) [S: 05-ux-and-flows]
- [x] Update tests and run the phase test plan

## Completion criteria (must all be true)

- [x] After Discover, the new mon is not persisted until Catch is pressed.
- [x] Let Go discards the encounter and does not mutate the collection.
- [x] Reloading during an encounter does not add the mon to the dex.
- [x] Dex list shows 3 items in the default viewport (unless the viewport height is extremely small).
- [x] `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` all pass.

## Test plan

- Unit / type / lint:
  - `npm run lint`
  - `npm run typecheck`
  - `npm test`
  - `npm run build`
- Manual:
  - Discover -> Let Go: collection unchanged after reload.
  - Discover -> Catch: mon persists after reload.
  - Import: mon appears in collection immediately.

## Open questions / blockers

- (none)

## Notes / steering log

- Catch/Let Go is mapped to device controls:
  - A: Catch
  - B: Let Go
- While an encounter is pending, other navigation/actions are blocked with an in-screen toast to encourage an explicit decision.
