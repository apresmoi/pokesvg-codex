# ADR-0004: Vertical Clamshell Pokedex UI (Device UI v2)

- Status: accepted
- Date: 2026-02-10
- Decision ref: D-036, D-037

## Context

The current device UI feels messy and not very “Pokedex”: controls can feel detached from the device casing and interactions lack tactile feedback. We want a more iconic and readable layout that supports stronger polish.

## Decision

- Redesign the device to a vertical “clamshell” Pokedex layout (Gen 1 Kanto-style is the primary reference).
- Keep all controls inside the SVG casing.
- Add press feedback/animations to clickable controls and improve screen layout hierarchy.

## Alternatives considered

- Keep the horizontal device and only polish: would improve, but is less iconic and keeps layout compromises.
- Non-device UI (plain HTML UI): rejected; the product identity is SVG-first Pokedex skeuomorphism.

## Consequences

- Positive:
  - Stronger product identity and clearer control placement.
  - Better space for screen + info hierarchy.
- Negative:
  - Requires significant SVG geometry/layout changes (Phase 9).
- Follow-ups:
  - Implement new `geometry.ts` and update `PokedexDeviceSvg` in Phase 9.

