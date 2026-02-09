---
id: phase-12
title: "Device Polish: Indicator Lights + Iconic Controls"
kind: delivery
status: planned
depends_on: ["phase-10"]
created: "2026-02-10"
updated: "2026-02-10"
unpack_version: "1.0.0"
---

# Phase 12 - Device Polish: Indicator Lights + Iconic Controls

## Intent

Make the device read more like an iconic Pokedex: fix the top indicator light placement/alignment and replace text-labeled action buttons with more Pokedex-like unlabeled controls (while keeping accessible labels).

## Scope (in / out)

### In scope

- Fix top indicator light placement so they don't overlap the lens and live in the top-right cluster.
- Adjust control layout to better match the "classic Pokedex" concept:
  - D-pad plus + center button
  - a small set of unlabeled buttons (round + horizontal bars, etc)
- Remove screen-adjacent text labels like `CFG`, `LIST`, `DISCOVER`, `EXPORT` in favor of shapes/icons (keep `aria-label`/`title` for accessibility).
- Ensure press feedback still works for all controls and doesn't break SVG transforms.
- Manual alignment pass for spacing/visual balance in the device top area.

### Out of scope

- Changing the underlying app behavior for Catch/Let Go (Phase 11).

## Links

- Specs:
  - `./../specs/01-requirements.md`
  - `./../specs/05-ux-and-flows.md`
- ADRs:
  - `./../decisions/adr-0004-vertical-clamshell-pokedex-ui.md`

## Decision refs

- D-044, D-045

## Work items (ordered)

- [ ] Fix LED/indicator light cluster geometry and placement (top-right; no overlap) [S: 01-requirements]
- [ ] Redesign device controls to be less text-labeled and more iconic (unlabeled shapes/icons) [S: 05-ux-and-flows]
- [ ] Preserve accessibility via `aria-label`/`title` even when visuals are unlabeled [S: 08-security-and-privacy]
- [ ] Manual UI pass for alignment/spacing (especially top-left lens vs top-right indicators)
- [ ] Run the phase test plan

## Completion criteria (must all be true)

- [ ] Indicator lights are aligned, do not overlap the lens, and live in the top-right cluster.
- [ ] No device controls rely on large text labels like `CFG`/`LIST`/`DISCOVER`/`EXPORT` for affordance.
- [ ] Press feedback still works and does not cause SVG transform jumping.
- [ ] `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` all pass.

## Test plan

- Unit / type / lint:
  - `npm run lint`
  - `npm run typecheck`
  - `npm test`
  - `npm run build`
- Manual:
  - Inspect the device top area: lens and indicator lights should not overlap at common viewport sizes.
  - Click all controls and confirm press feedback is visible.

## Open questions / blockers

- (none)

## Notes / steering log

- The goal is "reads like a Pokedex" without copy-pasting the original layout 1:1.

