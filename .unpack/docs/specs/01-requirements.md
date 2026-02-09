# Requirements

## Functional requirements

- **FR-001**: Render the Pokedex device as an SVG, centered on the page, sized to ~80% of browser height.
- **FR-002**: Render a "soothing" SVG background behind the floating Pokedex.
- **FR-003**: Pokedex buttons are functional (clickable), and drive navigation/actions.
- **FR-004**: "Discover" generates a brand-new mon via the generation system (as an encounter).
- **FR-005**: Persist caught mons in `localStorage` by storing their genomes (not rendered SVG); do not autosave on Discover.
- **FR-006**: Provide list view (thumbnails) + detail view (single large mon).
- **FR-007**: Display mon properties (at least name + abilities + optional lore/flavor).
- **FR-008**: Provide a System Config screen inside the Pokedex UI for generator/UI settings.
- **FR-009**: Export a mon genome by copying JSON to clipboard.
- **FR-010**: Import a mon genome by pasting JSON (Ctrl+V), validating it, and adding/selecting it.
- **FR-011 (Polish)**: Device controls must feel device-native: no “floating” controls outside the device casing, and interactive controls show press feedback (visual depress/transition).
- **FR-012**: After discovering an encounter, the user must choose **Catch** (save) or **Let Go** (discard); only Catch adds to the dex collection.
- **FR-013 (Polish)**: Dex list uses the screen space effectively and shows ~3 items at a time in the default viewport (where feasible).
- **FR-014 (Polish)**: Device indicator lights are aligned and placed in a top-right cluster (no overlap with the top-left lens).
- **FR-015 (Polish)**: Device controls should not rely on text labels like `CFG`/`LIST`/`DISCOVER`/`EXPORT`; prefer iconic/unlabeled controls.

## Non-functional requirements

- **NFR-001 (Determinism)**: `genome -> SVG` must be deterministic (same genome renders identically).
- **NFR-002 (Creature quality)**: The generator must use controlled randomness so outputs are consistently "creature-like".
- **NFR-002b (Variety / silhouettes)**: Outputs should have obvious structural variety (silhouettes/topologies), not just small cosmetic variation on the same template.
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
- Device UI v2 is vertical clamshell (confirmed; see D-037).
- What "no more libraries" means in practice:
  - runtime dependencies only, or also dev dependencies (Vite/TypeScript/test tooling).
- Default generator presets (cute/classic/weird) and outline/shading defaults.
- Whether to enforce a cap on stored mons or keep "unlimited" collection size.

---
## Change log

### Phase 7 — GenomeV2 + Device UI Redesign (D-034, D-036)

**ADDED: variety + UI polish requirements**
- Added explicit requirements around silhouette/topology variety and device-native control polish (press feedback, no floating controls).

### Phase 10 — Catch/Let Go Flow + Device Control Polish (D-041, D-042, D-043, D-044, D-045)

**MODIFIED: persistence semantics**
- Was: Discover immediately persisted mons as part of the core loop.
- Now: Discover creates an encounter; only Catch persists to the collection (no autosave).

**ADDED: capture flow + UI polish targets**
- Added Catch/Let Go as a required decision after discovery.
- Added explicit UX polish targets for list density, indicator light placement, and removing text-labeled controls.
<!-- unpack:1.0.0 -->
