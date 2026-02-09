import { describe, expect, it } from "vitest";

import { generateGenome } from "./generateGenome";

describe("generateGenome", () => {
  it("is deterministic for the same seed", () => {
    const a = generateGenome(0xdeadbeef);
    const b = generateGenome(0xdeadbeef);
    expect(a).toEqual(b);
  });

  it("produces stable ids", () => {
    const g = generateGenome(0x0000002a);
    expect(g.id).toBe("seed_0000002a");
    expect(g.schemaVersion).toBe(1);
  });

  it("applies generator preset settings", () => {
    const seed = 0x12345678;
    const classic = generateGenome(seed, { preset: "classic" });
    const cute = generateGenome(seed, { preset: "cute" });
    expect(classic).not.toEqual(cute);
  });

  it("generates bounded shapes and consistent derived fields", () => {
    for (let seed = 0; seed < 64; seed++) {
      const g = generateGenome(seed, { preset: "classic" });
      expect(g.head.shape.width).toBeLessThanOrEqual(g.body.shape.width);
      expect(g.head.shape.height).toBeLessThanOrEqual(Math.floor(g.body.shape.height * 1.4));

      if (g.limbs.tail) {
        expect(g.limbs.tailStyle).toBeDefined();
      }
    }
  });
});
