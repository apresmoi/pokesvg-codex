# Documentation Index

This folder is the source of truth for how the project is understood and evolved.

## Read first

- [Workflow](./_meta/workflow.md)
- [Adoption rules](./_meta/adoption-rules.md)
- [Unpack map (conversation -> docs)](./_meta/unpack-map.md)
- [Project memory (decisions & ground rules)](./_meta/project-memory.md)

---

## Discovery (derived from code, may be wrong until confirmed)

- [Repo inventory](./discovery/repo-inventory.md)
- [Runtime & commands](./discovery/runtime-and-commands.md)
- [Architecture (inferred)](./discovery/architecture-inferred.md)
- [Risks & debt](./discovery/risks-and-debt.md)

---

## Specs (stable truth, upgrade from "inferred" -> "confirmed" over time)

- [Overview](./specs/00-overview.md)
- [Requirements](./specs/01-requirements.md)
- [Domain Model](./specs/02-domain-model.md)
- [Architecture](./specs/03-architecture.md)
- [APIs & Interfaces](./specs/04-apis-and-interfaces.md)
- [UX & Flows](./specs/05-ux-and-flows.md)
- [Testing & Quality](./specs/06-testing-and-quality.md)
- [Operations](./specs/07-operations.md)
- [Security & Privacy](./specs/08-security-and-privacy.md)

---

## Practices (coding standards loaded for this project)

Standards are loaded during project init from the `.unpack/standards/` library. See each file for conventions on naming, structure, styling, tooling, and anti-patterns.

- [Universal: file length](./practices/universal/file-length.md)
- [Organization: folder structure](./practices/organization/folder-structure.md)
- [Organization: agent-friendly](./practices/organization/agent-friendly.md)

---

## Decisions (ADRs)

- [ADR Template](./decisions/adr-0000-template.md)

---

## Phases

### Phase status table (keep updated)

| Phase | Title | Kind | Status | Depends On | Last Updated |
|------:|-------|------|--------|------------|-------------|
| [0](./phases/phase-0.md) | Bootstrap: setup docs + phase plan | bootstrap | done | - | 2026-02-10 |
| [1](./phases/phase-1.md) | Scaffold App + Pokedex SVG Shell | delivery | planned | 0 | 2026-02-10 |
| [2](./phases/phase-2.md) | Genome + Generator v1 + Dex List/Detail + Persistence | delivery | planned | 1 | 2026-02-10 |
| [3](./phases/phase-3.md) | System Config + Import/Export + MVP Animations | delivery | planned | 2 | 2026-02-10 |
| [4](./phases/phase-4.md) | Art and UX Polish (Generator Quality + Background Variants) | delivery | planned | 3 | 2026-02-10 |
| [5](./phases/phase-5.md) | Quality Baseline + CI + GitHub Pages Deploy + End-User Docs | delivery | planned | 4 | 2026-02-10 |

### Current focus

- Next runnable phase: **phase-1**
- Blockers / open questions:
  - Clarify what "no more libraries" means for dev tooling.
  - Choose toolchain (Vite vs other; TypeScript vs JS).
  - Confirm deployment target (GitHub Pages vs other).

---

## Conversations

- [001 - initial design](../conversations/001-initial-design.md)

---

## Changelog (docs-only)

- Keep a short log here when docs structure changes materially.
<!-- unpack:1.0.0 -->
