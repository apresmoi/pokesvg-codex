import { createPrng } from "@/lib/prng";
import type { GeneratorPreset } from "@/lib/settings";

import type { AccessoryGene, BodyPlan } from "./types";

export function generateAccessory(
  seed: number,
  plan: BodyPlan,
  preset: GeneratorPreset,
): AccessoryGene {
  const prng = createPrng(seed ^ 0x243f6a88);

  // Keep accessories sparse so the baseline remains readable.
  const roll = prng.nextFloat();
  const noneChance = preset === "cute" ? 0.65 : preset === "weird" ? 0.55 : 0.6;
  if (roll < noneChance) {
    return { kind: "none" };
  }

  if (plan === "insectoid" && prng.nextFloat() < 0.7) {
    return { kind: "antenna", count: prng.pick([1, 2] as const) };
  }

  if (prng.nextFloat() < 0.55) return { kind: "gem" };
  return { kind: "collar" };
}
