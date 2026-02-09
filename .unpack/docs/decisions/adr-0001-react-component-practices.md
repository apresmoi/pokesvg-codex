# ADR-0001: React Component Practices Alignment

- Status: accepted
- Date: 2026-02-10
- Decision ref: D-033

## Context

The app is small but already has complex orchestration in `src/App.tsx` (storage, input handling, import/export, settings). The user requested we align the codebase with the project's React standards (`.unpack/standards/typescript/react.md`) to keep components modular and prevent future drift.

## Decision

Adopt the React standards as an active project practice, with explicit SVG-first adaptations:

- Keep `src/App.tsx` primarily as a composition layer.
- Move orchestration/state transitions into custom hooks under `src/hooks/`.
- Avoid static React inline styles; use CSS classes in `src/styles/global.css`.
- Allow inline styles only when setting dynamic CSS variables / animation timings (needed for deterministic per-genome animations in SVG).

## Alternatives considered

- Keep current structure: lowest effort now, but tends to grow into a "god component" and makes later refactors harder.
- Adopt Tailwind: would reduce inline styles, but adds a new styling framework and doesn't materially help with SVG attribute styling.

## Consequences

- Positive:
  - Clear separation between orchestration (hooks) and rendering (components).
  - Fewer inline styles; easier to scan and maintain UI layout/interaction rules.
- Negative:
  - Requires refactoring existing files and updating imports.
- Follow-ups:
  - Keep `.unpack/docs/practices/typescript/react.md` up to date as the implementation evolves.

