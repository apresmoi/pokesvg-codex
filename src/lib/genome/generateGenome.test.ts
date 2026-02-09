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
});

