# Project Memory

Append-only log of decisions, constraints, and rationale.

## Decisions

### D-001 - Build "PokeSVG" (Pokedex UI + procedural SVG mons) (Explicit)

- Date: 2026-02-10
- Decision: Build a Pokedex-style app ("PokeSVG") whose UI is a Pokedex device and whose mons are generated from composable SVG parts.
- Rationale: Core product concept.
- Evidence: "build a pokedex but called pokesvg... built with svg"

### D-002 - React web app; no additional runtime libraries beyond React (Explicit)

- Date: 2026-02-10
- Decision: Implement as a React web app; avoid additional runtime libraries.
- Rationale: Keep dependencies minimal.
- Evidence: "webapp using react, thats it, no more libraries"

### D-003 - Pokedex is centered and large; background is soothing SVG (Explicit)

- Date: 2026-02-10
- Decision: Pokedex floats in the middle of the screen and fills ~80% of browser height; page background is a soothing SVG.
- Rationale: Visual direction.
- Evidence: "floating in the middle... fill 80%... nice svg soothing background"

### D-004 - Save mons by storing genomes in localStorage (Explicit)

- Date: 2026-02-10
- Decision: Persist discovered mons in `localStorage` by storing the parameterization ("genome") object, not the rendered SVG.
- Rationale: Determinism, portability, and re-render fidelity.
- Evidence: "what we save is the parametrization of the pokemons"

### D-005 - Page uses HTML/CSS; device + mons are SVG (Explicit)

- Date: 2026-02-10
- Decision: The page may use HTML/CSS, but the Pokedex itself is SVG and the mons are SVG rendered inside it.
- Rationale: SVG-first product identity.
- Evidence: "web is HTML+CSS... pokedex itself is SVG"

### D-006 - Gen 1 Pokedex vibe is a stylistic reference (Explicit)

- Date: 2026-02-10
- Decision: Use Gen 1 Pokedex as a reference for the device vibe.
- Rationale: Familiar shape language.
- Evidence: "Gen1 is ok"

### D-007 - Infinite discovery via button (Explicit)

- Date: 2026-02-10
- Decision: Pressing a button generates a new mon; collection is effectively infinite.
- Rationale: Core loop.
- Evidence: "press a button and you generate a new one"

### D-008 - List + detail views (Explicit)

- Date: 2026-02-10
- Decision: Provide both a list view (thumbnails) and a detail view.
- Rationale: Navigation usability.
- Evidence: "yes, list and detail"

### D-009 - Compatibility via anchors/relative positioning; variable counts (Explicit)

- Date: 2026-02-10
- Decision: Parts must be generated compatibly (eyes relative to head, head relative to body, limbs relative to body), including variable counts (eyes/arms/legs).
- Rationale: Prevent incoherent outputs.
- Evidence: "define the eyes relative to it somehow"

### D-010 - Add a System Config screen (Explicit)

- Date: 2026-02-10
- Decision: Add a System Config screen inside the Pokedex UI to configure system settings.
- Rationale: Make art direction and generator presets adjustable in-device.
- Evidence: "config... system config screen"

### D-011 - MVP animations: blink + idle bob (Explicit)

- Date: 2026-02-10
- Decision: Start with blink and idle bob; extend later.
- Rationale: Keep MVP small.
- Evidence: "blink and idle first"

### D-012 - Export/import genomes (Explicit)

- Date: 2026-02-10
- Decision: Export by copying genome JSON; import by pasting JSON (Ctrl+V) and validating.
- Rationale: Sharing and reproducibility.
- Evidence: "export them... import... ctrl+v"

### D-013 - Version genomes with a schema version (Inferred)

- Date: 2026-02-10
- Decision: Include a `schemaVersion` field in genomes from day 1.
- Rationale: Future-proof generator changes without breaking old mons.
- Evidence: (suggested in conversation; not explicitly accepted)

### D-014 - Toolchain: Vite + React + TypeScript (Inferred)

- Date: 2026-02-10
- Decision: Use Vite for the React app scaffold and TypeScript for implementation.
- Rationale: Fast dev/build loop and strong typing for the procedural generator and data model.
- Evidence: (selected during Phase 1 based on typical React SPA defaults)

### D-015 - "No more libraries" applies to runtime deps, not dev tooling (Inferred)

- Date: 2026-02-10
- Decision: Treat the "no more libraries" constraint as "no additional runtime libraries beyond React"; allow dev tooling dependencies (Vite/TypeScript/etc).
- Rationale: A modern React project still needs a bundler and build pipeline; this keeps runtime minimal while staying practical.
- Evidence: (interpretation during Phase 1; can be revised if desired)

### D-016 - Dex collection storage key and payload format (Inferred)

- Date: 2026-02-10
- Decision: Store the local dex collection under `pokesvg.collection.v1` as a JSON payload `{ schemaVersion: 1, genomes: GenomeV1[] }`.
- Rationale: Versioned persistence and straightforward migration path.
- Evidence: (implemented during Phase 2)

### D-017 - Unit tests use Vitest (Inferred)

- Date: 2026-02-10
- Decision: Use Vitest for minimal unit tests (PRNG determinism, genome determinism, storage round-trip).
- Rationale: Fast, TS-friendly tests without adding runtime dependencies.
- Evidence: (implemented during Phase 2)

### D-018 - Persist System Config settings in localStorage (Inferred)

- Date: 2026-02-10
- Decision: Store global System Config settings separately from the dex collection under `pokesvg.settings.v1` and do not mutate previously discovered genomes when settings change.
- Rationale: Preserve deterministic re-rendering of discovered mons while allowing global presentation/generation defaults to evolve.
- Evidence: (implemented during Phase 3)

### D-019 - Generator presets: classic | cute | weird (Inferred)

- Date: 2026-02-10
- Decision: Provide generator presets (`classic`, `cute`, `weird`) as a global setting that affects future `generateGenome(...)` calls; default to `classic`.
- Rationale: Make the "art direction" choice iterable without introducing per-mon mutation.
- Evidence: (conversation asked to lock down art direction, but did not finalize; implemented during Phase 3)

### D-020 - Background variants: aurora | grid (Inferred)

- Date: 2026-02-10
- Decision: Provide a background variant setting (`aurora`, `grid`) that affects the page background; default to `aurora`.
- Rationale: Allow quick mood shifts while keeping the device front-and-center.
- Evidence: (implemented during Phase 3)

### D-021 - Import genomes via paste with strict validation and dedupe (Inferred)

- Date: 2026-02-10
- Decision: Import genomes on paste (Ctrl+V) via a global `paste` listener (excluding editable targets), validate and normalize payloads, reject invalid input, and dedupe by `seed`.
- Rationale: Minimal UI footprint with safe, predictable import behavior.
- Evidence: (conversation requested Ctrl+V import; implemented during Phase 3)

### D-022 - Export genomes via clipboard button (Inferred)

- Date: 2026-02-10
- Decision: Add an Export button that copies `JSON.stringify(genome)` to the clipboard using `navigator.clipboard.writeText(...)` and shows in-screen feedback.
- Rationale: Fast sharing without a backend or file download flows.
- Evidence: (conversation requested export/import; implemented during Phase 3)

### D-023 - MVP animations implemented via CSS keyframes (Inferred)

- Date: 2026-02-10
- Decision: Implement blink + idle bob using CSS keyframes applied to SVG groups, driven by per-genome animation params derived from seed, with a global `animations` toggle and `prefers-reduced-motion` support.
- Rationale: Keep the SVG renderer simple while making animation deterministic and accessible.
- Evidence: (conversation asked for blink + idle; implemented during Phase 3)

### D-024 - Import/back-compat: canonicalize id, derive missing anim (Inferred)

- Date: 2026-02-10
- Decision: Canonicalize genome `id` from `seed` on import/load and fill missing `anim` from seed for backward compatibility.
- Rationale: Prevent collisions and allow older stored/exported genomes to keep working as the schema evolves.
- Evidence: (implemented during Phase 3)

### D-025 - Phase-4 generator tuning prioritizes the classic preset (Inferred)

- Date: 2026-02-10
- Decision: Prioritize "classic" as the default art direction/preset when tuning generator constraints and part families; keep `cute` and `weird` as selectable variants.
- Rationale: Aligns with the Gen 1 Pokedex vibe reference while preserving experimentation via presets.
- Evidence: (no explicit user selection among presets; default is `classic` and implemented during Phase 4)

### D-026 - Add a third background variant: mist (Inferred)

- Date: 2026-02-10
- Decision: Add `mist` as an additional `backgroundVariant` option alongside `aurora` and `grid`.
- Rationale: Provide more mood variety without changing the device UI.
- Evidence: (implemented during Phase 4)

### D-027 - Extend genomes with accessory and tailStyle genes (Inferred)

- Date: 2026-02-10
- Decision: Extend the genome with an `accessory` gene (`none|gem|antenna|collar`) and a `limbs.tailStyle` gene (`taper|leaf|club`), with backward-compatible defaults (`accessory: none`, `tailStyle` optional).
- Rationale: Increase creature variety while preserving stability for existing stored genomes.
- Evidence: (implemented during Phase 4)

### D-028 - Virtualize list rendering to keep dex browsing responsive (Inferred)

- Date: 2026-02-10
- Decision: Render only the visible slice of the dex list rows instead of rendering thumbnails for the entire collection.
- Rationale: Avoid performance cliffs as the collection grows.
- Evidence: (implemented during Phase 4)

### D-029 - Lint/format tooling: Biome (Inferred)

- Date: 2026-02-10
- Decision: Use Biome for baseline linting and formatting, exposed via `npm run lint` and `npm run format`.
- Rationale: Single dev tool that covers lint + format while keeping runtime deps unchanged.
- Evidence: (implemented during Phase 5)

### D-030 - CI via GitHub Actions (Inferred)

- Date: 2026-02-10
- Decision: Add a GitHub Actions CI workflow that runs lint, typecheck, unit tests, and build on pushes and pull requests.
- Rationale: Prevent regressions and ensure the app stays buildable.
- Evidence: (implemented during Phase 5)

### D-031 - Deploy to GitHub Pages via Actions + Vite base auto-detection (Inferred)

- Date: 2026-02-10
- Decision: Deploy the static Vite build (`dist/`) to GitHub Pages using an Actions workflow, with Vite `base` automatically derived from `GITHUB_REPOSITORY` when running in GitHub Actions (override via `VITE_BASE`).
- Rationale: Simple, local-first static hosting for sharing.
- Evidence: (implemented during Phase 5)

### D-032 - End-user docs live under guide/ (Mintlify) (Inferred)

- Date: 2026-02-10
- Decision: Maintain end-user documentation as Mintlify pages under `guide/` and index them via `mint.json`.
- Rationale: Keep core flows documented for users (discover, settings, export/import, privacy).
- Evidence: (implemented during Phase 5)

### D-033 - Align React component practices with project standards (Explicit)

- Date: 2026-02-10
- Decision: Adopt the React conventions in `.unpack/standards/typescript/react.md` as an active project practice (tailored for this SVG-first app): keep `src/App.tsx` as composition, move orchestration into `src/hooks/`, and avoid static React inline styles (allow dynamic CSS variables for deterministic animation timing).
- Rationale: Improve maintainability and keep future changes consistent with documented standards.
- Evidence: User request to align with `react.md`.
- → Promoted to ADR-0001

### D-034 - Monster generation v2: spine/segments/slots/part families (Explicit)

- Date: 2026-02-10
- Decision: Replace the current v1 "blob head on blob body" generator with a topology-first v2: seeded spine/curve, multiple body segments, attachment slots, and part families per slot.
- Rationale: Increase structural variety and silhouettes; make mons feel less samey and more "wild".
- Evidence: User chose to "go big" and explicitly asked for topology families and a wilder composition system.
- → Promoted to ADR-0002

### D-035 - Schema break: deprecate v1 genomes/collections; no migration (Explicit)

- Date: 2026-02-10
- Decision: Introduce `schemaVersion: 2` and treat v1 genomes/collections as deprecated; no v1 -> v2 migration required (old collections can be discarded).
- Rationale: Enables a major generator overhaul without maintaining back-compat complexity.
- Evidence: User: "i dont care about migration... deprecate the previous one and just use the new one".
- → Promoted to ADR-0002

### D-036 - UI redesign: move toward a more iconic Pokedex layout + control polish (Explicit)

- Date: 2026-02-10
- Decision: Redesign the device UI toward a more common/recognizable Pokedex form factor, keep all controls inside the SVG casing, add press feedback/animations, and improve screen layout hierarchy.
- Rationale: Current UI feels messy (controls outside casing, no press feedback) and needs polish.
- Evidence: User request; form factor confirmed as vertical clamshell (see D-037).
- → Promoted to ADR-0004

### D-037 - UI v2 form factor: vertical clamshell Pokedex (Explicit)

- Date: 2026-02-10
- Decision: UI v2 uses a vertical “clamshell” Pokedex layout (Gen 1 Kanto-style proportions are the primary reference).
- Rationale: More iconic and readable; better placement for screen + controls.
- Evidence: User: “vertical is ok”.
- → Promoted to ADR-0004

### D-038 - Dex collection storage key for v2: `pokesvg.collection.v2` (Explicit)

- Date: 2026-02-10
- Decision: Store the v2 dex collection under a new `localStorage` key: `pokesvg.collection.v2` (keep v1 data untouched).
- Rationale: Clean break with no migration; avoids schema mismatch headaches.
- Evidence: User: “new key in localstorage is ok”.
- → Promoted to ADR-0003

### D-039 - Import behavior across schema versions: v2 strict + v1 seed-regenerate (Explicit)

- Date: 2026-02-10
- Decision: Import accepts `schemaVersion: 2` genomes. For older payloads, use a seed-regenerate fallback:
  - if the pasted JSON is a number, treat it as a seed and generate a v2 mon
  - if the pasted JSON is a v1-like object with a numeric `seed`, generate a v2 mon from that seed (ignore v1 fields)
- Rationale: Keeps sharing easy without maintaining v1 compatibility/migrations.
- Evidence: Decision needed to complete Phase 7; aligns with the “no migration” stance while preserving a low-friction import path.
- → Promoted to ADR-0003

### D-040 - GenomeV2 JSON schema stores explicit topology geometry (Inferred)

- Date: 2026-02-10
- Decision: Represent `GenomeV2` as a topology-first object that stores explicit geometry and attachments:
  - `spine: { curve, points: {x,y}[], radii: number[] }` (2–6 points)
  - `limbs: LimbGene[]` (slot + segment + side + family + params)
  - `tail: { family, length, curl }`
  - `surface: { placements: SurfacePlacement[] }`
- Rationale: Keep `genome -> SVG` deterministic and make the v2 topology explicit in exports/imports.
- Evidence: Implemented during Phase 8 to realize D-034.

### D-041 - Discover produces an encounter; user chooses Catch or Let Go (Explicit)

- Date: 2026-02-10
- Decision: After Discover generates a new mon, treat it as an **encounter** and require an explicit user choice: **Catch** (add to dex) or **Let Go** (discard).
- Rationale: Lets users curate their dex instead of accumulating every roll.
- Evidence: User request: “after discovering a new pokemon... ‘CATCH’ or ‘LET GO’... we shouldn't autosave”.

### D-042 - No autosave on Discover; persist only on explicit Catch/Import (Explicit)

- Date: 2026-02-10
- Decision: Do not write to `localStorage` on Discover. Persist only when the user explicitly catches (and on other explicit adds like Import).
- Rationale: Prevents "junk dex" and aligns persistence with intentional user actions.
- Evidence: User request: “we shouldn't autosave”.

### D-043 - Dex list density target: 3 visible items (Explicit)

- Date: 2026-02-10
- Decision: Adjust Dex List layout so the device screen can show ~3 list items at once (default viewport), instead of only 2.
- Rationale: Better use of limited screen real estate; improves browsing speed.
- Evidence: User feedback: “you can only see two items... should be space for 3”.

### D-044 - Device indicator lights belong in the top-right; fix overlap/misalignment (Explicit)

- Date: 2026-02-10
- Decision: The green/orange/red indicator lights should not overlap the top-left lens and should be placed/aligned as a top-right cluster.
- Rationale: Match the expected "iconic Pokedex" read and avoid visual collisions.
- Evidence: User feedback: “green orange and red buttons... misaligned... on top of the lightblue circle... should be in the top-right”.

### D-045 - Prefer iconic, unlabeled Pokedex-like controls over text-labeled buttons (Explicit)

- Date: 2026-02-10
- Decision: Move away from visible text labels like `CFG` / `DISCOVERY` / `EXPORT` / `LIST` and toward iconic, mostly unlabeled Pokedex-like controls (D-pad plus + center, round button, horizontal bar buttons, etc). Keep accessible labels via `aria-label` / `title`.
- Rationale: Better matches the concept of a real device and reduces UI "app button" vibes.
- Evidence: User feedback: “it would be nice if the buttons are not like CFG DISCOVERY EXPORT LIST... unlabeled buttons... + control with the button in the middle...”.

### D-046 - Explicit per-screen control mapping + nav button remap (Explicit)

- Date: 2026-02-10
- Decision: Lock down the device control mapping per screen and remap device buttons:
  - Dex List:
    - Up/Down: navigate list
    - Left: no-op
    - Right: go to detail of selected mon
    - A: also goes to selected mon detail
    - B: no-op
  - Dex Detail:
    - Left: back to list
    - B: back to list
  - System Config:
    - Left/Right: cycle options for selected field
    - A: also cycles options for selected field
    - B: back to list
  - Keep the Discover control, but reposition/re-skin to feel device-native (avoid awkward "app button" placement).
  - Remove the current on-screen Copy button.
  - Swap the two nav buttons: the former List button becomes Config; the former Config button becomes Copy/Export.
- Rationale: Make navigation predictable, reduce ambiguity, and make the device read more like a real controller-driven Pokedex.
- Evidence: User spec provided in IDE request (UI steering notes).

### D-047 - Share codes for export/import + footer credit (Explicit)

- Date: 2026-02-10
- Decision: Export/copy should produce a compact base64-coded share string rather than raw JSON. Paste/import should accept and decode the share code (raw JSON may be accepted for backward compatibility).
- Rationale: Raw JSON is awkward to share; a share code is friendlier for messaging.
- Evidence: User request: “copy of the genome should be coded into a b64 hash...”; plus request to add "Built with Unpack" in the footer linking to the GitHub page.
<!-- unpack:1.0.0 -->
