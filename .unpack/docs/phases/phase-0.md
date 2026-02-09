---
id: phase-0
title: "Bootstrap: setup docs + phase plan"
kind: bootstrap
status: done
depends_on: []
created: "2026-02-10"
updated: "2026-02-10"
unpack_version: "1.0.0"
---

# Phase 0 - Bootstrap: setup docs + phase plan

## Intent

Set up the documentation system and create a tailored phase plan. For new projects this means processing a conversation into structured docs; for existing projects this means scanning the code and generating discovery docs + alignment phases.

## Scope (in / out)

### In scope

- Create/verify docs scaffold
- Write discovery docs from repo scan (existing project) OR extract specs from conversation (new project)
- Seed specs with known facts + "needs confirmation" markers
- Create phases (phase-1+) with dependencies, criteria, and test plans
- Update `.unpack/docs/index.md`
- Switch `AGENTS.md` state to BUILD

### Out of scope

- Refactors
- Feature work
- Language-specific coding guidelines
- Large dependency upgrades (unless required to run at all)

## Decision refs

- (none yet)

## Work items (ordered)

- [x] Verify docs tree + templates exist
- [x] Scan repo / read conversation.md
- [x] Write discovery docs OR extract specs from conversation
- [x] Seed `.unpack/docs/specs/*` with known facts + open questions
- [x] Generate phases (phase-1+) with dependencies + test plans
- [x] Update `.unpack/docs/index.md` with all docs + phases
- [x] Archive conversation to `.unpack/conversations/` (if new project bootstrap)
- [x] Update `AGENTS.md` state marker to BUILD

## Completion criteria

- [x] `.unpack/docs/specs/*` exist and are consistent
- [x] `.unpack/docs/phases/*` exist with dependencies + criteria + test plan
- [x] `.unpack/docs/index.md` links to all docs + phases and shows correct status
- [x] `conversation.md` archived to `.unpack/conversations/` (if it existed)
- [x] `AGENTS.md` state marker set to BUILD

## Test plan

N/A (docs-only phase)

## Open questions / blockers

- (none)

## Notes / steering log

- Conversation archived as `.unpack/conversations/001-initial-design.md`.
- Specs written under `.unpack/docs/specs/`.
- Phase plan generated under `.unpack/docs/phases/phase-1.md`+.
