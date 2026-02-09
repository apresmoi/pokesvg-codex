# Overview

## Vision

PokeSVG is a Pokedex-style web app built with React + SVG. The Pokedex device UI is rendered as an SVG with functional buttons. Creatures ("mons") are generated as SVG from a deterministic `genome` (JSON) and rendered inside the device screen.

## Primary goals

- The Pokedex device looks and feels like a real Pokedex (Gen 1 vibe as reference).
- Generated creatures consistently look like creatures (controlled randomness).
- Local-first discovery: discovered mons persist via `localStorage` by storing genomes (not rendered SVG).
- Browse discovered mons via list + detail views inside the Pokedex screen.

## Non-goals (initial)

- Matching canonical Pokemon species or pokedex data from the games/anime.
- Backend services, accounts, online sync, or multiplayer features.
- Using additional runtime UI libraries beyond React.

## Success criteria (MVP)

- A user can: discover -> browse (list/detail) -> reload page -> collection persists.
- A user can: export a genome (copy JSON) and import it back (paste JSON).

## References

- Conversation: `.unpack/conversations/001-initial-design.md`
<!-- unpack:1.0.0 -->
