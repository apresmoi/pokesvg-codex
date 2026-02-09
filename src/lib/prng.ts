export type Prng = {
  nextFloat: () => number;
  nextInt: (minInclusive: number, maxInclusive: number) => number;
  pick: <T>(items: readonly T[]) => T;
  bool: (trueProbability?: number) => boolean;
};

// Small, deterministic PRNG for controlled randomness.
// Algorithm: mulberry32 (fast, good enough for procedural art; not crypto-secure).
export function createPrng(seed: number): Prng {
  let a = seed >>> 0;

  function nextFloat() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  function nextInt(minInclusive: number, maxInclusive: number) {
    if (!Number.isFinite(minInclusive) || !Number.isFinite(maxInclusive)) {
      throw new Error("nextInt bounds must be finite numbers");
    }
    const min = Math.ceil(Math.min(minInclusive, maxInclusive));
    const max = Math.floor(Math.max(minInclusive, maxInclusive));
    const span = max - min + 1;
    return min + Math.floor(nextFloat() * span);
  }

  function pick<T>(items: readonly T[]) {
    if (items.length === 0) {
      throw new Error("pick() requires a non-empty array");
    }
    return items[nextInt(0, items.length - 1)];
  }

  function bool(trueProbability = 0.5) {
    return nextFloat() < trueProbability;
  }

  return { nextFloat, nextInt, pick, bool };
}

