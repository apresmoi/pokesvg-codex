---
id: phase-4
title: "Art and UX Polish (Generator Quality + Background Variants)"
kind: delivery
status: planned
depends_on: ["phase-3"]
created: "2026-02-10"
updated: "2026-02-10"
unpack_version: "1.0.0"
---

# Phase 4 - Art and UX Polish (Generator Quality + Background Variants)

## Intent

Improve perceived creature quality and the overall presentation so the app feels cohesive, Pokedex-like, and "creature-like" outputs are the norm.

## Scope (in / out)

### In scope

- Expand part families and compatibility rules.
- Improve outline/shading/pattern quality and consistency.
- Add background variants and UI polish for screens/feedback.
- Address obvious performance pain points in list rendering.

### Out of scope

- Large architectural refactors (steering phase if needed).
- Complex e2e testing harness (Phase 5 may add baseline).

## Links

- Specs:
  - `./../specs/01-requirements.md`
  - `./../specs/02-domain-model.md`
  - `./../specs/05-ux-and-flows.md`

## Decision refs

- D-001, D-003, D-009

## Work items (ordered)

- [ ] Add/iterate on body plans, anchors, and compatibility constraints to reduce "nonsense" outputs [S: 01-requirements#non-functional-requirements]
- [ ] Add more curated part generators (ears/horns/tails/patterns/accessories) and tune ranges [S: 02-domain-model#body-plans-explicit]
- [ ] Improve background SVG variants and expose via System Config [S: 01-requirements#functional-requirements]
- [ ] Polish screen UI (feedback states like COPIED/INVALID) for readability within the device screen [S: 05-ux-and-flows]
- [ ] Address performance issues (SVG filters/gradients, thumbnail count) as needed [S: 01-requirements#non-functional-requirements]

## Completion criteria (must all be true)

- [ ] Newly generated mons are consistently recognizable as "creatures" under default settings.
- [ ] Background variants exist and can be switched via System Config.
- [ ] List scrolling and selection remain responsive for a reasonable number of mons (target TBD).

## Test plan

- Unit / type / lint:
  - (same as prior phases)
- Integration / e2e:
  - Manual: generate 50+ mons, browse list/detail, confirm performance is acceptable.
- Notes:
  - Keep a small manual checklist of "bad output" cases and verify they improve over time.

## Open questions / blockers

- What is the target art direction preset to prioritize first (cute/classic/weird)?

## Notes / steering log

- If generator complexity balloons, consider a steering phase to formalize a generator "grammar" spec.
