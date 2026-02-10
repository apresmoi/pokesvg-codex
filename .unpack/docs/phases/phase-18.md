---
id: phase-18
title: "UI Polish: A/B Button Margin"
kind: delivery
status: done
depends_on: ["phase-17"]
created: "2026-02-10"
updated: "2026-02-10"
unpack_version: "1.0.0"
---

# Phase 18 - UI Polish: A/B Button Margin

## Intent

Fix the right-side control cluster spacing so the A/B buttons don't touch the device border.

## Scope (in / out)

### In scope

- Adjust the A/B button cluster position to add margin from the device border.

### Out of scope

- Any broader device geometry redesign.

## Work items (ordered)

- [x] Shift the right-side control cluster left to avoid border collision.
- [x] Run the phase test plan.

## Completion criteria (must all be true)

- [x] A/B buttons have visible spacing from the right border at common viewport sizes.
- [x] `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` all pass.

## Test plan

- Unit / type / lint:
  - `npm run lint`
  - `npm run typecheck`
  - `npm test`
  - `npm run build`
- Manual:
  - Verify B button no longer touches the device right border.

## Open questions / blockers

- (none)

