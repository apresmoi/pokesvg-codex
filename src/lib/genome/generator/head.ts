import type { Prng } from "@/lib/prng";
import { createPrng } from "@/lib/prng";
import type { GeneratorPreset } from "@/lib/settings";

import type { BodyPlan, HeadFamily, HeadGene } from "../types";

function pickHeadFamily(prng: Prng, preset: GeneratorPreset): HeadFamily {
  if (preset === "cute")
    return prng.pick(["round", "round", "flat", "angular"] as const);
  if (preset === "weird")
    return prng.pick(["angular", "pointed", "star", "flat"] as const);
  return prng.pick(["round", "angular", "pointed", "flat"] as const);
}

export function generateHead(
  seed: number,
  plan: BodyPlan,
  preset: GeneratorPreset,
): HeadGene {
  const prng = createPrng(seed ^ 0x6c8e9cf5);

  const family = pickHeadFamily(prng, preset);
  const size =
    preset === "cute"
      ? 1.15 + prng.nextFloat() * 0.45
      : 0.95 + prng.nextFloat() * 0.55;
  const aspect =
    family === "flat"
      ? 0.65 + prng.nextFloat() * 0.25
      : 0.75 + prng.nextFloat() * 0.6;
  const tiltDeg =
    prng.nextInt(-22, 22) + (family === "pointed" ? prng.nextInt(-8, 8) : 0);

  const earType =
    preset === "cute"
      ? prng.pick(["round", "pointy", "round", "none"] as const)
      : prng.pick(["none", "pointy", "round"] as const);

  const hornChance = preset === "cute" ? 0.15 : preset === "weird" ? 0.7 : 0.45;
  const hornCount = (
    prng.nextFloat() < hornChance ? prng.pick([0, 1, 2] as const) : 0
  ) as 0 | 1 | 2;

  if (plan === "avian") {
    return { family, size, aspect, tiltDeg, earType: "none", hornCount: 0 };
  }
  if (plan === "insectoid") {
    return {
      family,
      size,
      aspect,
      tiltDeg,
      earType: prng.pick(["none", "pointy"] as const),
      hornCount: 0,
    };
  }

  return { family, size, aspect, tiltDeg, earType, hornCount };
}
