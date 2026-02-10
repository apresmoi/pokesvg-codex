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
- **FR-009**: Export a mon genome by copying a compact share code to clipboard (base64-coded string; no raw JSON; no separate on-screen "Copy" button).
- **FR-010**: Import a mon genome by pasting JSON (Ctrl+V), validating it, and adding/selecting it.
- **FR-010b**: Import must also accept the share code format produced by Export (paste-to-import).
- **FR-011 (Polish)**: Device controls must feel device-native: no “floating” controls outside the device casing, and interactive controls show press feedback (visual depress/transition).
- **FR-012**: After discovering an encounter, the user must choose **Catch** (save) or **Let Go** (discard); only Catch adds to the dex collection.
- **FR-013 (Polish)**: Dex list uses the screen space effectively and shows ~3 items at a time in the default viewport (where feasible).
- **FR-014 (Polish)**: Device indicator lights are aligned and placed in a top-right cluster (no overlap with the top-left lens).
- **FR-015 (Polish)**: Device controls should not rely on text labels like `CFG`/`LIST`/`DISCOVER`/`EXPORT`; prefer iconic/unlabeled controls.
- **FR-016**: Control mapping is explicit per screen (List/Detail/Config) for D-pad arrows + A/B, as specified in `specs/05-ux-and-flows.md`.
- **FR-017 (Polish)**: Discover remains a dedicated device-native control, but its placement/styling should not read like an extra "app button" living awkwardly among navigation controls.
- **FR-018**: The former List and Config nav buttons are repurposed:
  - the former List button opens System Config
  - the former Config button triggers Copy/Export (in relevant contexts)
- **FR-019 (Polish)**: Render a subtle footer credit outside the device UI with "Built with Unpack" and a GitHub repo link.

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

### Phase 14 — Explicit Control Mapping + Nav Button Remap (D-046)

**MODIFIED: export UX requirement**
- Was: Export was specified, but the UI also had a separate copy button.
- Now: Export is still clipboard-based, but there is no separate on-screen "Copy" button.

**ADDED: explicit control mapping requirement**
- Locked down per-screen D-pad arrows + A/B behavior via `specs/05-ux-and-flows.md`.

**ADDED: discover + nav button role clarification**
- Discover remains a dedicated device-native control (reposition/re-skin to avoid awkward "app button" feel).
- Repurposed nav buttons: old List -> Config; old Config -> Copy/Export.

### Phase 16 — Share Code Export (Base64) + Footer Credit (D-047)

**MODIFIED: export/import payload format**
- Was: Export copied JSON to clipboard; import expected JSON.
- Now: Export copies a compact base64-coded share string; import accepts that share string (and may optionally still accept JSON for backward compatibility).

**ADDED: footer credit requirement**
- Add a subtle footer with "Built with Unpack" and a GitHub repo link.
<!-- unpack:1.0.0 -->
