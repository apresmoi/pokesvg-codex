---
id: phase-1
title: "Scaffold App + Pokedex SVG Shell"
kind: delivery
status: done
depends_on: ["phase-0"]
created: "2026-02-10"
updated: "2026-02-10"
unpack_version: "1.0.0"
---

# Phase 1 - Scaffold App + Pokedex SVG Shell

## Intent

Create a runnable React app with the core layout and a static (but interactive) Pokedex SVG shell, including a clipped screen area and basic screen routing.

## Scope (in / out)

### In scope

- Choose and scaffold the React toolchain (Vite or similar; TypeScript vs JS).
- Render page background + centered floating device (~80vh).
- Implement Pokedex device as a single SVG with functional/clickable buttons.
- Implement a clipped screen viewport and placeholder screens (list/detail/config).

### Out of scope

- Full creature generator and genome rendering (Phase 2).
- Import/export, animations, and config logic (Phase 3).

## Links

- Specs:
  - `./../specs/01-requirements.md`
  - `./../specs/03-architecture.md`
  - `./../specs/05-ux-and-flows.md`

## Decision refs

- D-002, D-003, D-005

## Work items (ordered)

- [x] Confirm tooling choices (Vite vs other; TypeScript vs JS) [S: 01-requirements#needs-confirmation]
- [x] Scaffold the React app and define `npm` scripts (`dev`, `build`, `preview`) [S: 03-architecture]
- [x] Implement centered layout (device ~80vh) and soothing SVG background [S: 01-requirements#functional-requirements]
- [x] Implement Pokedex device SVG (outer casing + buttons as SVG elements) [S: 01-requirements#functional-requirements]
- [x] Implement screen viewport via `clipPath` and placeholder Screen routing (list/detail/config) [S: 03-architecture]
- [x] Wire button interactions to on-screen state (no-op actions are OK, but must be visible) [S: 05-ux-and-flows]

## Completion criteria (must all be true)

- [x] `npm run dev` starts successfully and renders the centered Pokedex device with background.
- [x] Buttons are clickable and visibly affect UI state (screen routing and/or selection).
- [x] Device screen content is clipped to the intended viewport.

## Test plan

- Unit / type / lint:
  - `npm run typecheck`
- Integration / e2e:
  - Manual: start dev server and verify layout, button click handling, and clipPath behavior.
- Notes:
  - Record the final chosen toolchain in project memory if it becomes stable.

## Open questions / blockers

- (none)

## Notes / steering log

- Toolchain chosen: Vite + React + TypeScript.
- Interpreted "no more libraries" as "no additional runtime libraries beyond React"; dev tooling deps are allowed (recorded in project memory).
