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
- [TypeScript: React](./practices/typescript/react.md)

---

## Decisions (ADRs)

- [ADR Template](./decisions/adr-0000-template.md)
- [ADR-0001: React Component Practices Alignment](./decisions/adr-0001-react-component-practices.md)
- [ADR-0002: GenomeV2 Topology-First Generator + No-Migration Break](./decisions/adr-0002-genomev2-topology-schema-break.md)
- [ADR-0003: Dex Storage v2 Key + Import Seed-Regenerate Fallback](./decisions/adr-0003-dex-storage-v2-key-and-import-fallback.md)
- [ADR-0004: Vertical Clamshell Pokedex UI (Device UI v2)](./decisions/adr-0004-vertical-clamshell-pokedex-ui.md)

---

## Phases

### Phase status table (keep updated)

| Phase | Title | Kind | Status | Depends On | Last Updated |
|------:|-------|------|--------|------------|-------------|
| [0](./phases/phase-0.md) | Bootstrap: setup docs + phase plan | bootstrap | done | - | 2026-02-10 |
| [1](./phases/phase-1.md) | Scaffold App + Pokedex SVG Shell | delivery | done | 0 | 2026-02-10 |
| [2](./phases/phase-2.md) | Genome + Generator v1 + Dex List/Detail + Persistence | delivery | done | 1 | 2026-02-10 |
| [3](./phases/phase-3.md) | System Config + Import/Export + MVP Animations | delivery | done | 2 | 2026-02-10 |
| [4](./phases/phase-4.md) | Art and UX Polish (Generator Quality + Background Variants) | delivery | done | 3 | 2026-02-10 |
| [5](./phases/phase-5.md) | Quality Baseline + CI + GitHub Pages Deploy + End-User Docs | delivery | done | 4 | 2026-02-10 |
| [6](./phases/phase-6.md) | Steering: React Component Practices Alignment | steering | done | 5 | 2026-02-10 |
| [7](./phases/phase-7.md) | Steering: GenomeV2 + Device UI Redesign | steering | done | 6 | 2026-02-10 |
| [8](./phases/phase-8.md) | GenomeV2: Topology Generator + Renderer | delivery | done | 7 | 2026-02-10 |
| [9](./phases/phase-9.md) | Device UI v2: Vertical Pokedex + Control Feedback | delivery | done | 7 | 2026-02-10 |
| [10](./phases/phase-10.md) | Steering: Catch/Let Go Flow + Device Control Polish | steering | done | 9 | 2026-02-10 |
| [11](./phases/phase-11.md) | Catch/Let Go: Encounter Flow + Persistence | delivery | done | 10 | 2026-02-10 |
| [12](./phases/phase-12.md) | Device Polish: Indicator Lights + Iconic Controls | delivery | done | 10 | 2026-02-10 |
| [13](./phases/phase-13.md) | Hotfix: GitHub Pages Deploy 404 | delivery | done | 12 | 2026-02-10 |
| [14](./phases/phase-14.md) | Steering: Explicit Control Mapping + Nav Button Remap | steering | done | 12 | 2026-02-10 |
| [15](./phases/phase-15.md) | Device Controls v2.1: Navigation + Discover/Export Layout | delivery | done | 14 | 2026-02-10 |
| [16](./phases/phase-16.md) | Steering: Share Code Export (Base64) + Footer Credit | steering | done | 12 | 2026-02-10 |
| [17](./phases/phase-17.md) | Share Codes + Footer: Base64 Export/Import + Unpack Credit | delivery | done | 16 | 2026-02-10 |

### Current focus

- Next runnable phase: (none)
- Blockers / open questions:
  - (none)

---

## Conversations

- [001 - initial design](../conversations/001-initial-design.md)
- [002 - genomev2 ui redesign](../conversations/002-genomev2-ui-redesign.md)

---

## Changelog (docs-only)

- Keep a short log here when docs structure changes materially.
<!-- unpack:1.0.0 -->
