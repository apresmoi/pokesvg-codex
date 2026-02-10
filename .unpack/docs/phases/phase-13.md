---
title: "Hotfix: GitHub Pages Deploy 404"
phase: 13
kind: delivery
status: in_progress
depends_on: [12]
unpack_version: "1.0.0"
last_updated: "2026-02-10"
---

## Goal

Fix GitHub Pages deploy failing with `actions/deploy-pages@v4` returning HTTP 404 ("Not Found").

## Work items

- [x] Harden Pages workflow to match current GitHub Pages Actions requirements.
  - Add `actions/configure-pages@v5`.
  - Ensure deploy job has explicit `pages: write` and `id-token: write` permissions.
- [ ] Confirm repo settings:
  - `Settings -> Pages -> Build and deployment -> Source` is set to `GitHub Actions`.
- [ ] Validate in GitHub Actions:
  - `Deploy to GitHub Pages` workflow run completes successfully.
  - Pages site becomes reachable at the configured URL.

## Completion criteria

- A GitHub Actions run successfully deploys to Pages (no 404 from `actions/deploy-pages@v4`).
- The Pages URL is live.

## Test plan

- Trigger by pushing to `main` (or manually via `workflow_dispatch`) and verify the deploy job succeeds.

## Open questions / blockers

- If it still 404s after enabling Pages and setting Source to GitHub Actions, is this repo under an org policy that blocks Pages deployments or blocks elevating `GITHUB_TOKEN` permissions?

