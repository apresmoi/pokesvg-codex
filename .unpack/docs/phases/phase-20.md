---
id: phase-20
title: "Part Animations: Head/Tail/Limbs Pivot Micro-Motion"
kind: delivery
status: done
depends_on: ["phase-19"]
created: "2026-02-10"
updated: "2026-02-10"
unpack_version: "1.0.0"
---

# Phase 20 - Part Animations: Head/Tail/Limbs Pivot Micro-Motion

## Intent

Make monsters feel more alive by adding subtle idle motion that rotates parts around their attachment points, while staying deterministic per genome and respecting `prefers-reduced-motion`.

## Scope (in / out)

### In scope

- Tail swish about tail base.
- Limb swing about limb anchor.
- Head sway about head center/neck.
- Deterministic per-genome phase offset and amplitudes derived from seed (no schema change).
- Reduced motion disables all animations (existing and new).

### Out of scope

- New animation genes / schema changes.
- Combat/interaction animations.

## Work items (ordered)

- [x] Add CSS keyframes for a generic "pivot swing" animation
- [x] Wrap tail rendering with pivot animation at tail base
- [x] Wrap limb rendering with pivot animation at limb anchor
- [x] Wrap head rendering with subtle pivot sway
- [x] Ensure `prefers-reduced-motion` disables the new animations
- [x] Run the phase test plan

## Completion criteria (must all be true)

- [x] When `animate=true`, head/tail/limbs show subtle motion.
- [x] When `animate=false`, no pivot animation runs.
- [x] Reduced-motion disables pivot animations.
- [x] `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` all pass.

## Test plan

- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`
- Manual:
  - Compare a mon with animations on vs off and confirm parts move around pivots (not a global translation).

