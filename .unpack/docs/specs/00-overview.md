# Overview

## Vision

PokeSVG is a Pokedex-style web app built with React + SVG. The Pokedex device UI is rendered as an SVG with functional buttons. Creatures ("mons") are generated as SVG from a deterministic `genome` (JSON) and rendered inside the device screen.

## Primary goals

- The Pokedex device looks and feels like a real Pokedex (Gen 1 vibe as reference).
- Generated creatures consistently look like creatures (controlled randomness).
- Evolve creature variety beyond “blob head + blob body” toward topology-driven silhouettes (spine/segments/slots) (planned; see Phase 7+).
- Local-first discovery: discovered mons persist via `localStorage` by storing genomes (not rendered SVG).
- Browse discovered mons via list + detail views inside the Pokedex screen.
- Polish the device UI so all controls feel device-native (inside the casing) with press feedback (planned; see Phase 7+).

## Non-goals (initial)

- Matching canonical Pokemon species or pokedex data from the games/anime.
- Backend services, accounts, online sync, or multiplayer features.
- Using additional runtime UI libraries beyond React.

## Success criteria (MVP)

- A user can: discover -> browse (list/detail) -> reload page -> collection persists.
- A user can: export a genome (copy JSON) and import it back (paste JSON).

## References

- Conversation: `.unpack/conversations/001-initial-design.md`
- Conversation: `.unpack/conversations/002-genomev2-ui-redesign.md`

---
## Change log

### Phase 7 — GenomeV2 + Device UI Redesign (D-034, D-035, D-036)

**ADDED: planned v2 direction**
- Introduced the near-term direction for topology-driven creatures and a more iconic, polished device UI.
<!-- unpack:1.0.0 -->
