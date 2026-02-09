---
id: phase-3
title: "System Config + Import/Export + MVP Animations"
kind: delivery
status: done
depends_on: ["phase-2"]
created: "2026-02-10"
updated: "2026-02-10"
unpack_version: "1.0.0"
---

# Phase 3 - System Config + Import/Export + MVP Animations

## Intent

Add the in-device System Config screen, implement import/export of genomes, and ship MVP animations (blink + idle bob).

## Scope (in / out)

### In scope

- System Config screen (SVG-native UI).
- Settings that affect future generation (generator presets/defaults).
- Export to clipboard + import from paste with validation and user feedback.
- MVP animations: blink + idle bob.

### Out of scope

- Deep art polish and many part families (Phase 4).
- Advanced animations (limb/tail motion beyond MVP).

## Links

- Specs:
  - `./../specs/01-requirements.md`
  - `./../specs/04-apis-and-interfaces.md`
  - `./../specs/05-ux-and-flows.md`

## Decision refs

- D-010, D-011, D-012, D-018, D-019, D-020, D-021, D-022, D-023, D-024

## Work items (ordered)

- [x] Implement System Config screen navigation and option toggling via device controls [S: 05-ux-and-flows#flow-configure-settings-explicit]
- [x] Define settings model and apply settings to future `generateGenome(...)` calls [S: 02-domain-model#system-settings-explicit]
- [x] Implement export (copy genome JSON) with in-screen confirmation feedback [S: 05-ux-and-flows#flow-export-genome-explicit]
- [x] Implement import on paste (Ctrl+V): parse, validate, collision detection, feedback [S: 05-ux-and-flows#flow-import-genome-via-paste-explicit]
- [x] Add MVP animations (blink + idle bob) driven by genome params [S: 01-requirements#constraints-fixed-decisions]

## Completion criteria (must all be true)

- [x] User can navigate to System Config and change at least a small set of settings.
- [x] Export copies valid genome JSON to clipboard and shows "COPIED" feedback.
- [x] Import via paste accepts valid genomes, rejects invalid ones, and handles duplicates.
- [x] Blink + idle bob animations run on rendered mons (detail view at minimum).

## Test plan

- Unit / type / lint:
  - `npm run typecheck`
  - `npm test`
- Build:
  - `npm run build`
- Integration / e2e:
  - Manual: export a mon, paste it back, verify valid/invalid/duplicate behaviors and in-screen feedback.
- Notes:
  - Clipboard APIs can be permission/HTTPS-sensitive; confirm behavior in local dev (`localhost`) and production (`https`).

## Open questions / blockers

- (none)

## Notes / steering log

- Settings are global-only (generator preset, background variant, animations toggle) and do not mutate existing genomes.
