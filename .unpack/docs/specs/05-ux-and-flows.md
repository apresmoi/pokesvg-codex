# UX and Flows

## Screens (explicit)

- **Dex List**: thumbnails of caught mons; scroll/selection inside the device screen.
- **Dex Detail**: one selected mon large; shows properties; supports export. When showing the current encounter, provides **Catch** / **Let Go** actions.
- **System Config**: configurable settings inside the Pokedex UI.
- **Import**: initiated by paste (Ctrl+V); shows feedback (valid/invalid/already caught).

Planned UI direction (explicit; see D-036):

- Move toward a more iconic/recognizable Pokedex device layout (vertical clamshell; see D-037).
- Ensure controls are device-native (inside casing) and have press feedback/animations.
- Improve screen hierarchy (layout/typography) and consider optional screen effects (e.g., scanlines) if they support the vibe.

Device controls (explicit; D-046):

- **Discover** remains a dedicated device-native control (placement/styling should not read like an awkward extra app button).
- **Config** is accessed via the repurposed nav button (the control that previously navigated to the list).
- **Export/Copy** is accessed via the other repurposed nav button (the control that previously navigated to config).
- There is no separate on-screen "Copy" button; export uses the device control + in-screen feedback.

## Input model (explicit)

- Device buttons are clickable SVG elements.
- D-pad is a 4-arrow controller and behavior is explicit per screen.
- A/Confirm triggers screen actions (select/toggle/cycle).
- B/Back returns to list (not a general history stack).
- Paste (Ctrl+V) triggers import behavior.

### Dex List input mapping (explicit; D-046)

- Up/Down: move list selection.
- Left: no-op.
- Right: go to Dex Detail for the selected mon.
- A: go to Dex Detail for the selected mon.
- B: no-op.

### Dex Detail input mapping (explicit; D-046)

- Left: back to Dex List.
- B: back to Dex List.

### System Config input mapping (explicit; D-046)

- Up/Down: move field selection.
- Left/Right: cycle options for the selected field.
- A: also cycles options for the selected field (same as Left/Right).
- B: back to Dex List.

## Primary flows

### Flow: discover a new mon (explicit)

1. User presses the Discover button.
2. App generates a new genome and shows it as the current encounter (not yet in the collection).
3. User chooses:
   - **Catch**: add encounter to the collection, persist, and select it.
   - **Let Go**: discard encounter and return to the list (no persistence).

### Flow: browse list -> detail -> back (explicit)

1. User navigates list selection (D-pad / wheel).
2. User selects a mon to view detail (A/Confirm).
3. Detail view shows the mon and its properties.
4. User returns to list (B/Back).

### Flow: export genome (explicit)

1. In detail view, user triggers Export.
2. App copies a compact share code to clipboard (base64-coded string).
3. App shows lightweight confirmation feedback in-screen ("COPIED" or equivalent).

### Flow: import genome via paste (explicit)

1. User pastes JSON (Ctrl+V) while focused on the app.
2. App detects the input format:
   - Share code (preferred): decode and validate.
   - Raw JSON (optional backward-compat): parse and validate.
3. If valid and not already owned: add to collection, persist, and select it (equivalent to an explicit Catch).
4. If already owned: show a duplicate warning ("ALREADY DISCOVERED" or equivalent).
5. If invalid: show an invalid warning ("INVALID GENOME" or equivalent).

### Flow: configure settings (explicit)

1. User navigates to System Config screen.
2. Settings are shown as a selectable list inside the device screen.
3. D-pad moves selection; A toggles/changes; B goes back.

Current settings (inferred; implemented in v1):

- Generator preset: `classic` | `cute` | `weird`
- Background variant: `aurora` | `grid` | `mist`
- Animations: `on` | `off`

## Edge cases (inferred)

- Empty collection: list view should handle "no mons yet" state and prompt to Discover.
- LocalStorage failure/quota: show error and keep in-memory state.
- Import payload too large: reject with error feedback.
- Reload/route during an encounter: the encounter is ephemeral and is discarded unless caught.

---
## Change log

### Phase 7 — GenomeV2 + Device UI Redesign (D-036)

**ADDED: planned UI redesign direction**
- Captured the intent to redesign the device layout to be more iconic and to add control press feedback and screen polish.

### Phase 10 — Catch/Let Go Flow + Device Control Polish (D-041, D-042, D-043, D-044, D-045)

**MODIFIED: discover flow**
- Was: Discover always added to the collection and persisted immediately.
- Now: Discover creates an encounter; the user must Catch (persist) or Let Go (discard).

**ADDED: polish targets**
- Captured the intent to increase list density (3 visible items) and to align device controls/indicator lights more closely to an iconic Pokedex concept.

### Phase 14 — Explicit Control Mapping + Nav Button Remap (D-046)

**MODIFIED: input model**
- Was: "D-pad navigates" and "B returns to previous screen" were generic and underspecified.
- Now: Per-screen control mapping is explicit for List/Detail/Config, and B is defined as "back to list" (not a general navigation stack).

**ADDED: list/detail/config mappings**
- Dex List: Up/Down select; Right/A enter detail; Left/B no-op.
- Dex Detail: Left/B return to list.
- Config: Left/Right/A cycle options; B returns to list.

### Phase 16 — Share Code Export (Base64) + Footer Credit (D-047)

**MODIFIED: export/import UX**
- Was: Export copied raw JSON; import parsed JSON.
- Now: Export copies a base64-coded share string; import prefers decoding share strings (and may optionally still accept raw JSON).

**ADDED: footer credit**
- Captured the requirement to add a small footer: "Built with Unpack" and a GitHub repo link.
<!-- unpack:1.0.0 -->
