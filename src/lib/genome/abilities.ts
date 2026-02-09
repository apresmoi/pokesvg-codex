import type { BodyPlan } from "./types";

const ABILITIES = [
  "Gleam",
  "Skitter",
  "Charge",
  "Mosscoat",
  "Guststep",
  "Embergut",
  "Bubbleveil",
  "Stonehide",
  "Oozeform",
  "Needlesense",
  "Blinkmesh",
  "Hollowhowl",
  "Sparkbite",
  "Petalguard",
  "Frostwink",
] as const;

const PLAN_BIASES: Record<BodyPlan, readonly string[]> = {
  biped: ["Charge", "Stonehide", "Sparkbite"],
  quadruped: ["Mosscoat", "Stonehide", "Charge"],
  avian: ["Guststep", "Gleam", "Blinkmesh"],
  serpentine: ["Oozeform", "Skitter", "Hollowhowl"],
  blob: ["Oozeform", "Bubbleveil", "Gleam"],
  insectoid: ["Skitter", "Needlesense", "Blinkmesh"],
};

export function pickAbilities(plan: BodyPlan, seed: number): [string, string] {
  // Simple deterministic picks (no PRNG import): hash-ish choice by seed.
  const biased = PLAN_BIASES[plan];
  const a = biased[seed % biased.length] ?? ABILITIES[seed % ABILITIES.length];
  const b =
    ABILITIES[(seed * 2654435761) % ABILITIES.length] ??
    ABILITIES[(seed + 1) % ABILITIES.length];
  return a === b ? [a, "Gleam"] : [a, b];
}
