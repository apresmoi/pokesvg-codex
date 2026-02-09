import type { Prng } from "@/lib/prng";
import { createPrng } from "@/lib/prng";
import type { GeneratorPreset } from "@/lib/settings";

import type { BodyPlan, TailFamily, TailGene } from "../types";

function pickTailFamily(
  prng: Prng,
  preset: GeneratorPreset,
): Exclude<TailFamily, "none"> {
  if (preset === "cute") return prng.pick(["leaf", "taper", "leaf"] as const);
  if (preset === "weird")
    return prng.pick(["stinger", "club", "taper", "leaf"] as const);
  return prng.pick(["taper", "leaf", "club"] as const);
}

export function generateTail(
  seed: number,
  plan: BodyPlan,
  preset: GeneratorPreset,
): TailGene {
  const prng = createPrng(seed ^ 0x243f6a88);
  const tailChance =
    plan === "serpentine"
      ? 0.9
      : plan === "quadruped"
        ? 0.75
        : plan === "avian"
          ? 0.6
          : plan === "blob"
            ? 0.35
            : 0.55;

  if (!prng.bool(tailChance)) return { family: "none", length: 0, curl: 0 };

  const family = pickTailFamily(prng, preset);
  const length =
    plan === "serpentine"
      ? 1.35 + prng.nextFloat() * 0.9
      : 0.85 + prng.nextFloat() * 0.85;
  const curl =
    preset === "weird"
      ? -1 + prng.nextFloat() * 2
      : -0.5 + prng.nextFloat() * 1;
  return { family, length, curl };
}
