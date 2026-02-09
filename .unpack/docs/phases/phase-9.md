---
id: phase-9
title: "Device UI v2: Vertical Pokedex + Control Feedback"
kind: delivery
status: done
depends_on: ["phase-7"]
created: "2026-02-10"
updated: "2026-02-10"
unpack_version: "1.0.0"
---

# Phase 9 - Device UI v2: Vertical Pokedex + Control Feedback

## Intent

Make the app feel like a real Pokedex: redesign the device to a more iconic layout, move all controls inside the casing, and add press feedback/animations and screen polish.

## Scope (in / out)

### In scope

- Redesign `PokedexDeviceSvg` geometry/layout (target: more recognizable Pokedex form factor).
- Ensure all controls (LIST/CFG/DISCOVER/EXPORT/etc) live inside the SVG device (no “floating” controls).
- Add button press feedback (visual depress/transition) for clickable controls.
- Improve screen presentation:
  - clearer hierarchy (type scale/layout)
  - optional screen effects (e.g. scanlines) if desired
  - optional screen transition animation on route changes

### Out of scope

- Monster generator rewrite (Phase 8).
- Complex accessibility overhaul (can be a later phase).

## Links

- Specs:
  - `./../specs/01-requirements.md`
  - `./../specs/05-ux-and-flows.md`

## Decision refs

- D-036, D-037

## Work items (ordered)

- [x] Choose/confirm the target device layout and encode it in `geometry.ts` [S: 05-ux-and-flows]
- [x] Update `PokedexDeviceSvg` casing, clipPath, and control placement [S: 03-architecture]
- [x] Add press feedback/animations for all interactive controls [S: 01-requirements#functional-requirements]
- [x] Polish screen visuals and layouts for list/detail/config [S: 05-ux-and-flows]
- [x] Manual UI pass for “feels like a Pokedex” (spacing, depth, gradients, label readability)

## Completion criteria (must all be true)

- [x] No UI controls appear outside the device casing.
- [x] Clicking a button produces a press animation/feedback.
- [x] Screen layouts look intentional and readable in the new form factor.
- [x] `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` all pass.

## Test plan

- Unit / type / lint:
  - `npm run lint`
  - `npm run typecheck`
  - `npm test`
  - `npm run build`
- Manual:
  - Click every device control and confirm press feedback is visible.
  - Verify list/detail/config are all usable in the new device proportions.

## Open questions / blockers

- (none)

## Notes / steering log

- Primary motivation: current UI feels messy; needs a more cohesive, device-native control layout with tactile feedback.
