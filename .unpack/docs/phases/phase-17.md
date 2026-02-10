---
id: phase-17
title: "Share Codes + Footer: Base64 Export/Import + Unpack Credit"
kind: delivery
status: done
depends_on: ["phase-16"]
created: "2026-02-10"
updated: "2026-02-10"
unpack_version: "1.0.0"
---

# Phase 17 - Share Codes + Footer: Base64 Export/Import + Unpack Credit

## Intent

Implement share-code export/import and add footer credit:

- Export/copy uses a compact base64-coded share string.
- Paste/import accepts the share code (and optionally JSON for backward compatibility).
- Add a footer with "Built with Unpack" and a GitHub repo link.

## Scope (in / out)

### In scope

- Implement share-code encode/decode helpers and wire them into:
  - Export/Copy flow in Dex Detail
  - Import-on-paste flow (Ctrl+V)
- Ensure export feedback still works ("COPIED" etc).
- Add a small footer outside the device UI with:
  - "Built with Unpack" link
  - GitHub repo link

### Out of scope

- Any networked sharing service, QR codes, or deep-link routing.

## Links

- Specs:
  - `./../specs/01-requirements.md`
  - `./../specs/04-apis-and-interfaces.md`
  - `./../specs/05-ux-and-flows.md`

## Decision refs

- D-047

## Work items (ordered)

- [x] Implement share code format per spec (`pokesvg:` prefix + base64url payload)
- [x] Update Export/Copy to copy share code (not raw JSON)
- [x] Update Import-on-paste to detect and decode share code
- [x] (Optional) Keep accepting raw JSON pastes for backward compatibility
- [x] Add footer with "Built with Unpack" and GitHub link (subtle, non-distracting)
- [x] Run the phase test plan

## Completion criteria (must all be true)

- [x] Export copies a share code string; pasted share codes import correctly.
- [x] Footer renders on desktop and mobile and links work.
- [x] `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` all pass.

## Test plan

- Unit / type / lint:
  - `npm run lint`
  - `npm run typecheck`
  - `npm test`
  - `npm run build`
- Manual:
  - Export a mon, paste it back in, confirm it imports/selects.
  - Paste garbage text, confirm it shows "INVALID" feedback (no crash).
  - Verify footer links open correctly and are not visually dominant.

## Open questions / blockers

- (none)
