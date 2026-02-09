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
- Evidence: User request; specific form factor (e.g., vertical clamshell) still needs confirmation.
<!-- unpack:1.0.0 -->
