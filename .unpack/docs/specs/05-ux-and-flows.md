# UX and Flows

## Screens (explicit)

- **Dex List**: thumbnails of discovered mons; scroll/selection inside the device screen.
- **Dex Detail**: one selected mon large; shows properties; supports export.
- **System Config**: configurable settings inside the Pokedex UI.
- **Import**: initiated by paste (Ctrl+V); shows feedback (valid/invalid/already discovered).

## Input model (explicit)

- Device buttons are clickable SVG elements.
- D-pad navigates selection and option lists.
- A/Confirm triggers actions (discover/select/toggle).
- B/Back returns to previous screen.
- Paste (Ctrl+V) triggers import behavior.

## Primary flows

### Flow: discover a new mon (explicit)

1. User presses the Discover button.
2. App generates a new genome and adds it to the collection.
3. App persists the updated collection to `localStorage`.
4. UI updates list and selection (behavior TBD: select new mon or keep current).

### Flow: browse list -> detail -> back (explicit)

1. User navigates list selection (D-pad / wheel).
2. User selects a mon to view detail (A/Confirm).
3. Detail view shows the mon and its properties.
4. User returns to list (B/Back).

### Flow: export genome (explicit)

1. In detail view, user triggers Export.
2. App copies the genome JSON to clipboard.
3. App shows lightweight confirmation feedback in-screen ("COPIED" or equivalent).

### Flow: import genome via paste (explicit)

1. User pastes JSON (Ctrl+V) while focused on the app.
2. App parses and validates the genome.
3. If valid and not already owned: add to collection, persist, and select it.
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
<!-- unpack:1.0.0 -->
