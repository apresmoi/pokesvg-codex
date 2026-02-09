# Repo Inventory

## Summary

This repository contains a Vite + React + TypeScript single-page app scaffold plus the Unpack docs system.

## Notable files and directories

- `AGENTS.md`: agent operating rules and mode state
- `.unpack/`: Unpack framework (skills, prompts, standards, docs template)
- `.unpack/docs/`: docs/specs/phases (source of truth)
- `.unpack/conversations/`: archived research conversations
- `guide/`: human-readable docs (Mintlify)
- `package.json`: app manifest and scripts
- `vite.config.ts`: Vite config
- `tsconfig.json`: TypeScript config
- `src/`: application source (React)

## Stack detected

- Language: TypeScript
- UI: React 18
- Tooling: Vite 5

## Entrypoints

- HTML entry: `index.html`
- React entry: `src/main.tsx`
- App root: `src/App.tsx`

## Key components (Phase 1)

- Background: `src/components/SoothingBackground/SoothingBackground.tsx`
- Pokedex device SVG shell: `src/components/PokedexDeviceSvg/PokedexDeviceSvg.tsx`
- Placeholder screens: `src/components/screens/*`

## CI/deploy status

- No CI workflows yet (planned in later phases).
- No deployment workflow yet (planned in later phases).
<!-- unpack:1.0.0 -->
