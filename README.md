# PokeSVG

A Pokedex-style React web app where the device UI is SVG and every creature is procedurally generated from composable SVG parts.

## Core idea

- The Pokedex device is a single SVG rendered in the middle of the screen.
- The device screen renders an SVG mon generated from a deterministic `genome` object.
- Discovered mons are stored in `localStorage` by saving their genomes (not rendered SVG).
- UI includes list + detail views, a System Config screen, and import/export of genomes.

## Docs-first workflow (Unpack)

- Specs + phase plan: `.unpack/docs/index.md`
- Archived research conversation: `.unpack/conversations/001-initial-design.md`
- End-user docs (Mintlify): `guide/`

### Agent commands

| Command | Purpose |
| --- | --- |
| `/up-status` | Show current progress and next runnable phase |
| `/up-next` | Execute the next phase |
| `/up-snapshot` | Export current project state for new research |
| `/up-apply` | Apply a follow-up conversation to patch/steer docs |

## License

MIT
<!-- unpack:1.0.0 -->
