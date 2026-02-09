import { describe, expect, it } from "vitest";

import { generateGenome } from "./generateGenome";
import {
  parseGenomeJson,
  parseGenomeJsonOrRegenerate,
  parseGenomeValue,
} from "./parseGenome";

describe("parseGenome", () => {
  it("accepts a generated genome JSON payload", () => {
    const g = generateGenome(123);
    const res = parseGenomeJson(JSON.stringify(g));
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.genome).toEqual(g);
  });

  it("fills missing anim from seed", () => {
    const g = generateGenome(42);
    const { anim: _anim, ...legacy } = g;

    const res = parseGenomeValue(legacy);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.genome.seed).toBe(g.seed);
    expect(res.genome.id).toBe(g.id);
    expect(res.genome.anim).toBeDefined();
  });

  it("defaults missing accessory to none", () => {
    const g = generateGenome(77);
    const { accessory: _accessory, ...legacy } = g;

    const res = parseGenomeValue(legacy);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.genome.accessory).toEqual({ kind: "none" });
  });

  it("canonicalizes id from seed", () => {
    const g = generateGenome(0x0000002a);
    const mutated = { ...g, id: "WRONG" };
    const res = parseGenomeValue(mutated);
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.genome.id).toBe("seed_0000002a");
  });

  it("accepts seed-only imports (JSON number)", () => {
    const res = parseGenomeJsonOrRegenerate("123");
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.genome.seed).toBe(123);
    expect(res.genome.schemaVersion).toBe(2);
  });

  it("accepts v1-like objects with a numeric seed (seed-regenerate)", () => {
    const res = parseGenomeJsonOrRegenerate(
      JSON.stringify({ schemaVersion: 1, seed: 555, plan: "biped" }),
    );
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.genome.seed).toBe(555);
    expect(res.genome.schemaVersion).toBe(2);
  });

  it("rejects invalid JSON", () => {
    const res = parseGenomeJson("{");
    expect(res.ok).toBe(false);
  });

  it("rejects unsafe spine arrays", () => {
    const g = generateGenome(99);
    const mutated = {
      ...g,
      spine: {
        ...g.spine,
        points: [...g.spine.points, { x: 10, y: 10 }, { x: 20, y: 20 }],
      },
    };
    const res = parseGenomeValue(mutated);
    expect(res.ok).toBe(false);
  });
});
