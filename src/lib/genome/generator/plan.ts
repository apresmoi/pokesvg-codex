import type { Prng } from "@/lib/prng";
import type { GeneratorPreset } from "@/lib/settings";

import type { BodyPlan } from "../types";

const BODY_PLANS: readonly BodyPlan[] = [
  "biped",
  "quadruped",
  "avian",
  "serpentine",
  "blob",
  "insectoid",
];

export function pickPlan(prng: Prng, preset: GeneratorPreset): BodyPlan {
  if (preset === "cute") {
    return prng.pick([
      "blob",
      "biped",
      "quadruped",
      "avian",
      "blob",
      "biped",
    ] as const);
  }

  if (preset === "weird") {
    return prng.pick([
      "insectoid",
      "serpentine",
      "biped",
      "blob",
      "insectoid",
      "avian",
    ] as const);
  }

  return prng.pick(BODY_PLANS);
}
