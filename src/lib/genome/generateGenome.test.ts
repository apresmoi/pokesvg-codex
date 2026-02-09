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
    expect(g.schemaVersion).toBe(2);
  });

  it("applies generator preset settings", () => {
    const seed = 0x12345678;
    const classic = generateGenome(seed, { preset: "classic" });
    const cute = generateGenome(seed, { preset: "cute" });
    expect(classic).not.toEqual(cute);
  });

  it("generates bounded topology and consistent derived fields", () => {
    for (let seed = 0; seed < 64; seed++) {
      const g = generateGenome(seed, { preset: "classic" });
      expect(g.spine.points.length).toBeGreaterThanOrEqual(2);
      expect(g.spine.points.length).toBeLessThanOrEqual(6);
      expect(g.spine.radii.length).toBe(g.spine.points.length);

      for (const p of g.spine.points) {
        expect(p.x).toBeGreaterThanOrEqual(0);
        expect(p.x).toBeLessThanOrEqual(256);
        expect(p.y).toBeGreaterThanOrEqual(0);
        expect(p.y).toBeLessThanOrEqual(256);
      }
      for (const r of g.spine.radii) {
        expect(r).toBeGreaterThanOrEqual(8);
        expect(r).toBeLessThanOrEqual(90);
      }

      for (const limb of g.limbs) {
        expect(limb.segment).toBeGreaterThanOrEqual(0);
        expect(limb.segment).toBeLessThan(g.spine.points.length);
      }

      if (g.tail.family === "none") {
        expect(g.tail.length).toBe(0);
      } else {
        expect(g.tail.length).toBeGreaterThan(0);
      }
    }
  });

  it("produces diverse topology across seeds", () => {
    const curves = new Set<string>();
    const segmentCounts = new Set<number>();
    const headFamilies = new Set<string>();
    const tailFamilies = new Set<string>();
    let withSurface = 0;

    for (let seed = 0; seed < 64; seed++) {
      const g = generateGenome(seed, { preset: "classic" });
      curves.add(g.spine.curve);
      segmentCounts.add(g.spine.points.length);
      headFamilies.add(g.head.family);
      tailFamilies.add(g.tail.family);
      if (g.surface.placements.length > 0) withSurface++;
    }

    expect(curves.size).toBeGreaterThanOrEqual(3);
    expect(segmentCounts.size).toBeGreaterThanOrEqual(3);
    expect(headFamilies.size).toBeGreaterThanOrEqual(3);
    expect(tailFamilies.size).toBeGreaterThanOrEqual(3);
    expect(withSurface).toBeGreaterThanOrEqual(12);
  });
});
