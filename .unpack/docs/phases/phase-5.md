---
id: phase-5
title: "Quality Baseline + CI + GitHub Pages Deploy + End-User Docs"
kind: delivery
status: done
depends_on: ["phase-4"]
created: "2026-02-10"
updated: "2026-02-10"
unpack_version: "1.0.0"
---

# Phase 5 - Quality Baseline + CI + GitHub Pages Deploy + End-User Docs

## Intent

Make the project easy to maintain and share: add baseline quality gates, CI, a deployment path, and initial end-user documentation.

## Scope (in / out)

### In scope

- Add lint/format scripts and baseline tests.
- Add CI workflow(s) to run build/tests on PRs.
- Add GitHub Pages deployment (if confirmed).
- Expand end-user docs in `guide/` (Mintlify).

### Out of scope

- Deep test coverage (focus on a baseline).
- Observability/analytics (not in initial scope).

## Links

- Specs:
  - `./../specs/06-testing-and-quality.md`
  - `./../specs/07-operations.md`

## Decision refs

- D-002, D-029, D-030, D-031, D-032

## Work items (ordered)

- [x] Define/confirm tooling for lint/format/test and add scripts [S: 06-testing-and-quality]
- [x] Add CI workflow to run lint/test/build on pushes/PRs [S: 06-testing-and-quality]
- [x] Add GitHub Pages deployment workflow (if still desired) [S: 07-operations#deployment]
- [x] Write end-user guide pages (what is PokeSVG, how to discover/export/import) [S: 05-ux-and-flows]

## Completion criteria (must all be true)

- [x] `npm run lint` / `npm test` (or equivalent) exist and pass locally.
- [x] CI runs on PRs and passes.
- [x] App is deployable (GitHub Pages or alternative) and the deploy path is documented.
- [x] End-user docs exist under `guide/` and cover the core flows.

## Test plan

- Unit / type / lint:
  - `npm run lint`
  - `npm run typecheck`
  - `npm test`
  - `npm run build`
- Integration / e2e:
  - Manual: verify deployed build works (discover, browse, export/import).
- Notes:
  - If GitHub Pages is dropped, update `07-operations.md` and phase scope.

## Open questions / blockers

- (none)

## Notes / steering log

- Added Biome for lint/format (`npm run lint`, `npm run format`).
- Added GitHub Actions workflows:
  - CI: lint/typecheck/test/build
  - Pages: build `dist/` and deploy to GitHub Pages
- Added end-user docs pages under `guide/` and updated `mint.json`.
