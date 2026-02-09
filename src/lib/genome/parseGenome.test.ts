import { describe, expect, it } from "vitest";

import { generateGenome } from "./generateGenome";
import { parseGenomeJson, parseGenomeValue } from "./parseGenome";

describe("parseGenome", () => {
  it("accepts a generated genome JSON payload", () => {
    const g = generateGenome(123);
    const res = parseGenomeJson(JSON.stringify(g));
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.genome).toEqual(g);
  });

  it("fills missing anim from seed (back-compat)", () => {
    const g = generateGenome(42);
    const legacy = { ...g } as any;
    delete legacy.anim;

    const res = parseGenomeValue(legacy);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.genome.seed).toBe(g.seed);
    expect(res.genome.id).toBe(g.id);
    expect(res.genome.anim).toBeDefined();
  });

  it("canonicalizes id from seed", () => {
    const g = generateGenome(0x0000002a);
    const mutated = { ...g, id: "WRONG" };
    const res = parseGenomeValue(mutated);
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.genome.id).toBe("seed_0000002a");
  });

  it("rejects invalid JSON", () => {
    const res = parseGenomeJson("{");
    expect(res.ok).toBe(false);
  });

  it("rejects unsafe blob jitter arrays", () => {
    const g = generateGenome(99);
    const mutated = {
      ...g,
      body: { ...g.body, shape: { ...g.body.shape, jitter: [1, 1] } },
    };
    const res = parseGenomeValue(mutated);
    expect(res.ok).toBe(false);
  });
});

