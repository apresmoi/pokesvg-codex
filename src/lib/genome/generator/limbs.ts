import type { Prng } from "@/lib/prng";
import { createPrng } from "@/lib/prng";
import type { GeneratorPreset } from "@/lib/settings";
import type {
  BodyPlan,
  LimbFamily,
  LimbGene,
  LimbSlot,
  SpineGene,
} from "../types";
import { clamp } from "./math";

function pickLimbFamily(
  prng: Prng,
  slot: LimbSlot,
  plan: BodyPlan,
  preset: GeneratorPreset,
): LimbFamily {
  if (slot === "wing") {
    if (plan === "serpentine") return "fin";
    return "wing";
  }

  if (preset === "cute")
    return prng.pick(["stub", "stub", "claw", "pincer"] as const);
  if (preset === "weird")
    return prng.pick(["tentacle", "claw", "pincer", "fin", "stub"] as const);
  return prng.pick(["stub", "claw", "tentacle", "pincer"] as const);
}

function makeLimb(
  prng: Prng,
  slot: LimbSlot,
  segment: number,
  side: "left" | "right",
  family: LimbFamily,
  preset: GeneratorPreset,
): LimbGene {
  const scale =
    preset === "cute"
      ? 0.75 + prng.nextFloat() * 0.55
      : 0.65 + prng.nextFloat() * 0.75;
  const length =
    slot === "wing"
      ? 0.9 + prng.nextFloat() * 1.0
      : 0.7 + prng.nextFloat() * 1.2;
  const angleDeg =
    slot === "leg"
      ? prng.nextInt(34, 82)
      : slot === "arm"
        ? prng.nextInt(-35, 35)
        : prng.nextInt(-22, 22);
  return { slot, segment, side, family, scale, length, angleDeg };
}

function addPair(
  limbs: LimbGene[],
  prng: Prng,
  slot: LimbSlot,
  segment: number,
  plan: BodyPlan,
  preset: GeneratorPreset,
) {
  const family = pickLimbFamily(prng, slot, plan, preset);
  limbs.push(makeLimb(prng, slot, segment, "left", family, preset));
  limbs.push(makeLimb(prng, slot, segment, "right", family, preset));
}

export function generateLimbs(
  seed: number,
  plan: BodyPlan,
  preset: GeneratorPreset,
  spine: SpineGene,
): LimbGene[] {
  const prng = createPrng(seed ^ 0xdaa66d2b);
  const n = spine.points.length;
  const limbs: LimbGene[] = [];
  if (n < 2) return limbs;

  const seg = (idx: number) => clamp(Math.floor(idx), 0, n - 1);
  const low = seg(n <= 3 ? 0 : 1);
  const mid = seg(Math.floor((n - 1) / 2));
  const high = seg(n - 2);

  if (plan === "serpentine") {
    const pairs =
      preset === "weird" ? prng.nextInt(1, 2) : prng.bool(0.6) ? 1 : 0;
    const used = new Set<number>();
    for (let i = 0; i < pairs; i++) {
      const s = seg(1 + prng.nextInt(0, Math.max(0, n - 3)));
      if (used.has(s)) continue;
      used.add(s);
      addPair(limbs, prng, "wing", s, plan, preset);
    }
    return limbs;
  }

  if (plan === "quadruped") {
    addPair(limbs, prng, "leg", low, plan, preset);
    if (n >= 4) addPair(limbs, prng, "leg", high, plan, preset);
    return limbs;
  }

  if (plan === "avian") {
    addPair(limbs, prng, "wing", seg(mid + 1), plan, preset);
    addPair(limbs, prng, "leg", low, plan, preset);
    return limbs;
  }

  if (plan === "insectoid") {
    const maxPairs = Math.min(3, Math.max(1, n - 2));
    for (let i = 0; i < maxPairs; i++)
      addPair(limbs, prng, "leg", seg(1 + i), plan, preset);
    if (prng.bool(0.45)) addPair(limbs, prng, "wing", high, plan, preset);
    return limbs;
  }

  if (plan === "blob") {
    if (prng.bool(0.55)) addPair(limbs, prng, "leg", low, plan, preset);
    if (prng.bool(0.45)) addPair(limbs, prng, "arm", mid, plan, preset);
    return limbs;
  }

  // biped
  addPair(limbs, prng, "leg", low, plan, preset);
  if (prng.bool(preset === "cute" ? 0.85 : 0.65))
    addPair(limbs, prng, "arm", mid, plan, preset);
  return limbs;
}
