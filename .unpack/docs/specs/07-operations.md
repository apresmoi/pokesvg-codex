# Operations

## Environments

- **Local development**: run the React dev server locally (exact commands TBD in Phase 1).
- **Production**: static build deployed to hosting (GitHub Pages via GitHub Actions).

## Deployment

Deployment target (inferred from `/up-init`): GitHub Pages.

Mechanism (implemented):

- GitHub Actions workflow builds the Vite app and deploys `dist/` to GitHub Pages.
- Vite `base` is set automatically in `vite.config.ts` when running in GitHub Actions:
  - user/org pages (`<owner>.github.io`) use `/`
  - project pages use `/<repo>/`
  - can be overridden by setting `VITE_BASE`

Notes:

- The repository must have GitHub Pages configured to "Deploy from GitHub Actions".

## Docs

- End-user docs live under `guide/`.
- Mintlify is enabled in project preferences (`mint.json` exists).
<!-- unpack:1.0.0 -->
