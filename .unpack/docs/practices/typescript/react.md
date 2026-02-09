# TypeScript — React (Project Practice)

This project follows the React conventions from `.unpack/standards/typescript/react.md`, with a few explicit adaptations for an SVG-first app.

## Component exports + structure

- Named exports only (no `export default` for components).
- One component per file; file name matches component name.
- Component props use `type`, defined directly above the component and destructured in the function signature.
- Keep `src/App.tsx` as a thin composition layer; move complex state/actions into custom hooks under `src/hooks/`.

## Hooks + state

- Prefer custom hooks when a component has multiple effects/state slices (ex: app orchestration).
- Keep reducer/state-machine logic in hooks, not in leaf components.
- Avoid side-effects inside state-updater functions; use effects for timers/event listeners.

## Styling (SVG-first adaptation)

- Avoid React inline styles (`style={{ ... }}`) for static styling; use CSS classes in `src/styles/global.css`.
- Exception: allow inline styles only when setting dynamic CSS variables / animation timings (ex: deterministic per-genome animation params).
- For SVG interactivity, prefer a shared CSS class (ex: `.pokesvg-clickable { cursor: pointer; }`) instead of `style={{ cursor: "pointer" }}`.

<!-- unpack:1.0.0 -->

