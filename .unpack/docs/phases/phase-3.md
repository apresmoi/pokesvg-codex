---
id: phase-3
title: "System Config + Import/Export + MVP Animations"
kind: delivery
status: planned
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

- D-010, D-011, D-012

## Work items (ordered)

- [ ] Implement System Config screen navigation and option toggling via device controls [S: 05-ux-and-flows#flow-configure-settings-explicit]
- [ ] Define settings model and apply settings to future `generateGenome(...)` calls [S: 02-domain-model#system-settings-explicit]
- [ ] Implement export (copy genome JSON) with in-screen confirmation feedback [S: 05-ux-and-flows#flow-export-genome-explicit]
- [ ] Implement import on paste (Ctrl+V): parse, validate, collision detection, feedback [S: 05-ux-and-flows#flow-import-genome-via-paste-explicit]
- [ ] Add MVP animations (blink + idle bob) driven by genome params [S: 01-requirements#constraints-fixed-decisions]

## Completion criteria (must all be true)

- [ ] User can navigate to System Config and change at least a small set of settings.
- [ ] Export copies valid genome JSON to clipboard and shows "COPIED" feedback.
- [ ] Import via paste accepts valid genomes, rejects invalid ones, and handles duplicates.
- [ ] Blink + idle bob animations run on rendered mons (detail view at minimum).

## Test plan

- Unit / type / lint:
  - Add unit tests for import validation and settings application (tooling TBD).
- Integration / e2e:
  - Manual: export a mon, paste it back, verify behaviors for valid/invalid/duplicate.
- Notes:
  - Clipboard APIs can be permission/HTTPS-sensitive; confirm behavior in local dev vs prod.

## Open questions / blockers

- Confirm which settings must be global-only vs stored per-genome.

## Notes / steering log

- (none)
