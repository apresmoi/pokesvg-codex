function getCryptoSeed() {
  try {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return buf[0] ?? 0;
  } catch {
    // Non-crypto fallback (should not happen in modern browsers).
    return Math.floor(Math.random() * 2 ** 32) >>> 0;
  }
}

export function generateUniqueSeed(usedSeeds: ReadonlySet<number>) {
  for (let i = 0; i < 32; i++) {
    const seed = getCryptoSeed() >>> 0;
    if (!usedSeeds.has(seed)) return seed;
  }

  // Fallback: probe sequentially from a random start.
  let seed = getCryptoSeed() >>> 0;
  while (usedSeeds.has(seed)) seed = (seed + 1) >>> 0;
  return seed;
}
