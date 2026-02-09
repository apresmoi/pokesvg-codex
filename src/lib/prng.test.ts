import { describe, expect, it } from "vitest";

import { createPrng } from "./prng";

describe("createPrng", () => {
  it("is deterministic for the same seed", () => {
    const a = createPrng(123456);
    const b = createPrng(123456);

    const seqA = Array.from({ length: 10 }, () => a.nextFloat());
    const seqB = Array.from({ length: 10 }, () => b.nextFloat());

    expect(seqA).toEqual(seqB);
  });

  it("differs for different seeds", () => {
    const a = createPrng(1);
    const b = createPrng(2);

    const seqA = Array.from({ length: 6 }, () => a.nextFloat());
    const seqB = Array.from({ length: 6 }, () => b.nextFloat());

    expect(seqA).not.toEqual(seqB);
  });
});
