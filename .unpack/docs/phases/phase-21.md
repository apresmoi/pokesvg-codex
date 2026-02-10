---
id: phase-21
title: "Part Animations: Pivot Around True Attachment Points"
kind: delivery
status: done
depends_on: ["phase-20"]
created: "2026-02-10"
updated: "2026-02-10"
unpack_version: "1.0.0"
---

# Phase 21 - Part Animations: Pivot Around True Attachment Points

## Intent

Make head/tail/limb idle pivot motion rotate around the actual attachment points (not bounding-box centers) so it reads correctly and consistently.

## Scope (in / out)

### In scope

- Replace CSS-based swing with SVG `animateTransform` rotations about explicit pivot coordinates for:
  - Tail base
  - Limb anchors
  - Head center/neck point
- Ensure reduced-motion disables these animations (including SMIL-based ones).

### Out of scope

- New animation genes / schema changes.
- New UI/controls changes.

## Links

- Specs:
  - 05-ux-and-flows
- ADRs:
  - ADR-0004

## Decision refs

- D-049

## Work items (ordered)

- [x] Implement pivot rotations about explicit attachment coordinates (tail/limbs/head)
- [x] Ensure `prefers-reduced-motion` disables all idle motion (CSS + SMIL)
- [x] Remove unused CSS swing animation (if no longer referenced)
- [x] Run the phase test plan

## Completion criteria (must all be true)

- [x] Visually: parts rotate around their attachment points (not around themselves).
- [x] Reduced motion disables idle motion (including SMIL rotations).
- [x] `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` all pass.

## Test plan

- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`
- Manual:
  - Confirm tail swings about its base, limbs about their anchors, and head about its center/neck.

## Open questions / blockers

- (none)

## Notes / steering log

- If SMIL is not acceptable across target browsers, switch to per-element transforms computed in JS.
