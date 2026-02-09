import { createPrng } from "@/lib/prng";
import type { GeneratorPreset } from "@/lib/settings";

import { pickAbilities } from "./abilities";
import { generateAccessory } from "./accessories";
import { generateFace } from "./generator/face";
import { generateHead } from "./generator/head";
import { generateLimbs } from "./generator/limbs";
import { generatePalette } from "./generator/palette";
import { pickPlan } from "./generator/plan";
import { generateSpine } from "./generator/spine";
import { generateSurface } from "./generator/surface";
import { generateTail } from "./generator/tail";
import { generateName } from "./name";
import type { AnimGene, Genome } from "./types";

export type GeneratorSettings = {
  preset: GeneratorPreset;
};

function makeId(seed: number) {
  return `seed_${seed.toString(16).padStart(8, "0")}`;
}

export function deriveAnim(seed: number): AnimGene {
  const prng = createPrng(seed ^ 0x85ebca6b);
  return {
    blinkMs: prng.nextInt(3200, 5200),
    bobMs: prng.nextInt(1600, 2400),
    bobAmpPx: prng.nextInt(2, 5),
  };
}

export function generateGenome(
  seed: number,
  settings?: GeneratorSettings,
): Genome {
  const s = seed >>> 0;
  const prng = createPrng(s);
  const preset: GeneratorPreset = settings?.preset ?? "classic";

  const plan = pickPlan(prng, preset);
  const palette = generatePalette(s, preset);
  const spine = generateSpine(s, plan, preset);
  const head = generateHead(s, plan, preset);
  const face = generateFace(s, plan, preset);
  const limbs = generateLimbs(s, plan, preset, spine);
  const tail = generateTail(s, plan, preset);
  const surface = generateSurface(s, plan, preset, spine);
  const accessory = generateAccessory(s, plan, preset);
  const anim = deriveAnim(s);

  const name = generateName(createPrng(s ^ 0x1b873593));
  const abilities = pickAbilities(plan, s);
  const lore = `A ${plan} mon with a ${spine.curve} spine.`;

  return {
    schemaVersion: 2,
    id: makeId(s),
    seed: s,
    plan,
    palette,
    spine,
    head,
    face,
    limbs,
    tail,
    surface,
    accessory,
    anim,
    meta: { name, abilities, lore },
  };
}
