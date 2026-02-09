---
id: phase-6
title: "Steering: React Component Practices Alignment"
kind: steering
status: done
depends_on: ["phase-5"]
created: "2026-02-10"
updated: "2026-02-10"
unpack_version: "1.0.0"
---

# Phase 6 - Steering: React Component Practices Alignment

## Intent

Align the codebase with the project's React standards so future changes stay modular, readable, and maintainable.

## Scope (in / out)

### In scope

- Activate the React standards as an explicit project practice.
- Refactor app orchestration to use custom hooks (reduce "god component" logic in `App`).
- Replace static React inline styles with CSS classes (keep a narrow exception for dynamic CSS variables used for animation timing).
- Update architecture docs and record the decision as an ADR.

### Out of scope

- Adopting Tailwind or other styling frameworks.
- Large UX changes or new user-facing features.

## Links

- Practices:
  - `./../practices/typescript/react.md`
- Specs:
  - `./../specs/03-architecture.md`

## Decision refs

- D-033

## Work items (ordered)

- [x] Add a project practice doc for React and index it [S: 03-architecture]
- [x] Refactor `App` orchestration into hooks under `src/hooks/` [S: 03-architecture]
- [x] Remove static React inline styles; prefer CSS classes (SVG-first exception for dynamic CSS vars) [S: 03-architecture]
- [x] Update architecture spec + add ADR documenting the conventions [S: 03-architecture]
- [x] Run the phase test plan and update phase/index statuses

## Completion criteria (must all be true)

- [x] `src/App.tsx` is primarily composition; orchestration lives in `src/hooks/`.
- [x] No `style={{ ... }}` remains for static styling (exception: dynamic CSS vars / animation timings).
- [x] `.unpack/docs/specs/03-architecture.md` updated and a new ADR exists for this decision.
- [x] `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` all pass.

## Test plan

- Unit / type / lint:
  - `npm run lint`
  - `npm run typecheck`
  - `npm test`
  - `npm run build`

## Open questions / blockers

- (none)

## Notes / steering log

- Trigger: user requested alignment with `.unpack/standards/typescript/react.md`.
