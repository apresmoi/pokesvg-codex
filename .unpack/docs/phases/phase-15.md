---
id: phase-15
title: "Device Controls v2.1: Navigation + Discover/Export Layout"
kind: delivery
status: done
depends_on: ["phase-14"]
created: "2026-02-10"
updated: "2026-02-10"
unpack_version: "1.0.0"
---

# Phase 15 - Device Controls v2.1: Navigation + Discover/Export Layout

## Intent

Implement the Phase 14 control mapping and device button remaps in the app UI:

- 4-arrow D-pad behavior differs by screen (List/Detail/Config).
- A/B behavior differs by screen (List/Detail/Config).
- Discover control is kept but repositioned/re-skinned to feel device-native.
- Remove the current Copy button; export/copy is driven by the device export control.
- Swap nav buttons: old List -> Config; old Config -> Copy/Export.

## Scope (in / out)

### In scope

- Input handling updates for:
  - Dex List
  - Dex Detail
  - System Config
- UI control wiring updates for Discover / Config / Export roles.
- Remove any redundant on-screen copy/copy buttons (keep feedback).
- Ensure behavior is consistent for mouse clicks and keyboard/controller events (where supported).

### Out of scope

- Redesigning the device art beyond what's required to reposition/re-skin the Discover control.
- Changes to genome generation, persistence schema, or import behavior.

## Links

- Specs:
  - `./../specs/01-requirements.md`
  - `./../specs/05-ux-and-flows.md`

## Decision refs

- D-046

## Work items (ordered)

- [x] Implement explicit List screen mapping:
  - Up/Down: navigate list
  - Left: no-op
  - Right: go to selected mon detail
  - A: go to selected mon detail
  - B: no-op
- [x] Implement Detail screen mapping:
  - Left: back to list
  - B: back to list
- [x] Implement Config screen mapping:
  - Left/Right: cycle options for selected field
  - A: also cycle options for selected field
  - B: back to list
- [x] Reposition/re-skin Discover control to feel device-native (no weird "app button" placement)
- [x] Remove the current Copy button from the UI
- [x] Swap nav button wiring:
  - old List button -> Config
  - old Config button -> Copy/Export
- [x] Run the phase test plan

## Completion criteria (must all be true)

- [x] Control mapping matches `specs/05-ux-and-flows.md` exactly.
- [x] There is no separate "Copy" button in the UI.
- [x] Discover remains available and feels device-native in placement.
- [x] `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` all pass.

## Test plan

- Unit / type / lint:
  - `npm run lint`
  - `npm run typecheck`
  - `npm test`
  - `npm run build`
- Manual:
  - In List view: Up/Down changes selection; Right/A opens detail; Left/B do nothing.
  - In Detail view: Left/B return to list.
  - In Config: Left/Right/A cycle options; B returns to list.

## Open questions / blockers

- (none)
