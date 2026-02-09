# ADR-0002: GenomeV2 Topology-First Generator + No-Migration Break

- Status: accepted
- Date: 2026-02-10
- Decision ref: D-034, D-035

## Context

The current v1 procedural system produces creatures that feel too similar (mostly “blob head + blob body” with small cosmetic variation). We want materially more structural variety, and we are willing to break compatibility to get there quickly.

## Decision

- Replace the v1 generator with a topology-first v2 generator based on:
  - a seeded spine/curve
  - multiple body segments and a thickness profile
  - attachment slots and part families per slot
  - surface features as overlays (spikes/bumps/ridges/etc)
- Introduce `schemaVersion: 2` (`GenomeV2`) and deprecate v1 genomes/collections with **no migration requirement**.

## Alternatives considered

- Incremental v1 tweaks (more params, more patterns): rejected because it doesn’t change silhouettes enough.
- Maintain v1/v2 compatibility/migrations: rejected to keep iteration fast; we will discard or reject v1 payloads.

## Consequences

- Positive:
  - Big silhouette variety gains with a clear architectural model.
  - Faster iteration without back-compat constraints.
- Negative:
  - Old exported genomes/collections will stop working unless we add special-case handling.
  - Requires significant generator + renderer refactor work.
- Follow-ups:
  - Decide storage key strategy and v1 import behavior in Phase 7.

