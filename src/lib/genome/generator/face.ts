import { createPrng } from "@/lib/prng";
import type { GeneratorPreset } from "@/lib/settings";

import type { BodyPlan, FaceGene } from "../types";

export function generateFace(
  seed: number,
  plan: BodyPlan,
  preset: GeneratorPreset,
): FaceGene {
  const prng = createPrng(seed ^ 0x3c6ef372);

  const eyeType =
    preset === "cute"
      ? prng.pick(["dot", "oval", "dot", "oval", "slit"] as const)
      : preset === "weird"
        ? prng.pick(["slit", "oval", "slit", "dot"] as const)
        : prng.pick(["dot", "oval", "slit"] as const);

  const eyeCount = (
    plan === "insectoid"
      ? prng.pick([2, 3, 4] as const)
      : preset === "weird"
        ? prng.pick([1, 2, 3] as const)
        : prng.pick([1, 2] as const)
  ) as 1 | 2 | 3 | 4;

  const eyeSpacing = 0.18 + prng.nextFloat() * 0.3;
  const eyeSize = 0.06 + prng.nextFloat() * 0.085;

  const mouthType =
    plan === "avian" ? "beak" : prng.pick(["smile", "frown"] as const);
  const fangs =
    plan === "avian"
      ? 0
      : preset === "cute"
        ? (prng.pick([0, 0, 0, 1] as const) as 0 | 1 | 2)
        : (prng.pick([0, 0, 1, 2] as const) as 0 | 1 | 2);

  return { eyeType, eyeCount, eyeSpacing, eyeSize, mouthType, fangs };
}
