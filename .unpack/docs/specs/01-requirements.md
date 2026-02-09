# Requirements

## Functional requirements

- **FR-001**: Render the Pokedex device as an SVG, centered on the page, sized to ~80% of browser height.
- **FR-002**: Render a "soothing" SVG background behind the floating Pokedex.
- **FR-003**: Pokedex buttons are functional (clickable), and drive navigation/actions.
- **FR-004**: "Discover" generates a brand-new mon via the generation system.
- **FR-005**: Persist discovered mons in `localStorage` by storing their genomes (not rendered SVG).
- **FR-006**: Provide list view (thumbnails) + detail view (single large mon).
- **FR-007**: Display mon properties (at least name + abilities + optional lore/flavor).
- **FR-008**: Provide a System Config screen inside the Pokedex UI for generator/UI settings.
- **FR-009**: Export a mon genome by copying JSON to clipboard.
- **FR-010**: Import a mon genome by pasting JSON (Ctrl+V), validating it, and adding/selecting it.

## Non-functional requirements

- **NFR-001 (Determinism)**: `genome -> SVG` must be deterministic (same genome renders identically).
- **NFR-002 (Creature quality)**: The generator must use controlled randomness so outputs are consistently "creature-like".
- **NFR-003 (Performance)**: Scrolling list + rendering should remain responsive for typical collection sizes (TBD).
- **NFR-004 (Dependency constraint)**: Runtime should avoid additional libraries beyond React. (Needs clarification for dev tooling.)
- **NFR-005 (SVG-first UI)**: Prefer SVG-native UI for the device and screens (avoid `<foreignObject>` inputs initially).

## Constraints / fixed decisions

- **Stylistic reference**: Gen 1 Pokedex vibe is a reference only (mons are original).
- **Collection**: Infinite discovery (no fixed cap like "151" in the initial scope).
- **Animation (MVP)**: Blink + idle bob first; additional motion can come later.
- **Import/export**: Export via clipboard; import via paste (Ctrl+V).

## Needs confirmation

- Exact control mapping for device buttons (D-pad/A/B + any extra buttons).
- What "no more libraries" means in practice:
  - runtime dependencies only, or also dev dependencies (Vite/TypeScript/test tooling).
- Default generator presets (cute/classic/weird) and outline/shading defaults.
- Whether to enforce a cap on stored mons or keep "unlimited" collection size.
<!-- unpack:1.0.0 -->
