import { hslToHex } from "@/lib/color";
import { createPrng } from "@/lib/prng";
import type { GeneratorPreset } from "@/lib/settings";

import { pickAbilities } from "./abilities";
import { generateName } from "./name";
import type {
  AccessoryGene,
  BlobShape,
  BodyGene,
  BodyPlan,
  AnimGene,
  FaceGene,
  Genome,
  HeadGene,
  LimbsGene,
  Palette,
  PatternGene,
  Spot,
  TailStyle,
} from "./types";

const BODY_PLANS: readonly BodyPlan[] = [
  "biped",
  "quadruped",
  "avian",
  "serpentine",
  "blob",
  "insectoid",
];

export type GeneratorSettings = {
  preset: GeneratorPreset;
};

function makeId(seed: number) {
  return `seed_${seed.toString(16).padStart(8, "0")}`;
}

function generatePalette(seed: number, preset: GeneratorPreset): Palette {
  const prng = createPrng(seed ^ 0x9e3779b9);
  const hue = prng.nextInt(0, 359);
  const accentHue = (hue + prng.nextInt(20, 120)) % 360;

  const [baseL, shadeL, accL] =
    preset === "cute"
      ? ([0.62, 0.45, 0.64] as const)
      : preset === "weird"
        ? ([0.48, 0.32, 0.58] as const)
        : ([0.52, 0.36, 0.55] as const);

  const base = hslToHex(hue, preset === "cute" ? 0.52 : 0.62, baseL);
  const shade = hslToHex(hue, preset === "cute" ? 0.52 : 0.62, shadeL);
  const accent = hslToHex(accentHue, preset === "weird" ? 0.86 : 0.78, accL);
  const eye = "#e5e7eb";
  const outline = "#0b0b10";

  return { base, shade, accent, eye, outline };
}

function clampInt(value: number, min: number, max: number) {
  const lo = Math.floor(Math.min(min, max));
  const hi = Math.floor(Math.max(min, max));
  const v = Math.floor(value);
  return Math.min(hi, Math.max(lo, v));
}

function generateBlobShape(
  seed: number,
  wMin: number,
  wMax: number,
  hMin: number,
  hMax: number,
  preset: GeneratorPreset,
): BlobShape {
  const prng = createPrng(seed);
  const width = prng.nextInt(wMin, wMax);
  const height = prng.nextInt(hMin, hMax);
  const points =
    preset === "cute"
      ? prng.nextInt(8, 10)
      : preset === "weird"
        ? prng.nextInt(10, 14)
        : prng.nextInt(8, 12);
  const jitter: number[] = [];
  for (let i = 0; i < points; i++) {
    // Keep tight enough to stay creature-like (preset widens/narrows the range).
    const [jMin, jSpan] =
      preset === "cute"
        ? ([0.9, 0.2] as const)
        : preset === "weird"
          ? ([0.74, 0.68] as const)
          : ([0.82, 0.36] as const);
    jitter.push(jMin + prng.nextFloat() * jSpan);
  }
  return { kind: "blob", width, height, points, jitter };
}

function generateSpots(seed: number): Spot[] {
  const prng = createPrng(seed);
  const count = prng.nextInt(3, 7);
  const spots: Spot[] = [];
  for (let i = 0; i < count; i++) {
    spots.push({
      x: -0.45 + prng.nextFloat() * 0.9,
      y: -0.35 + prng.nextFloat() * 0.9,
      r: 0.06 + prng.nextFloat() * 0.12,
    });
  }
  return spots;
}

function generatePattern(seed: number): PatternGene {
  const prng = createPrng(seed);
  const roll = prng.nextFloat();
  if (roll < 0.55) return { kind: "none" };
  if (roll < 0.85) return { kind: "spots", spots: generateSpots(seed ^ 0xa5a5a5a5) };
  return {
    kind: "stripes",
    angleDeg: prng.nextInt(-25, 25),
    count: prng.nextInt(3, 6),
    width: prng.nextInt(8, 16),
  };
}

function generateBody(seed: number, plan: BodyPlan, preset: GeneratorPreset): BodyGene {
  const baseSeed = seed ^ 0x1337b00b;
  const shape =
    plan === "serpentine"
      ? generateBlobShape(baseSeed, 160, 196, 66, 88, preset)
      : generateBlobShape(baseSeed, 118, 160, 94, 140, preset);

  const prng = createPrng(seed ^ 0x7f4a7c15);
  const belly = plan !== "serpentine" && prng.bool(0.75);
  const pattern = generatePattern(seed ^ 0x2b992ddf);

  return { shape, belly, pattern };
}

function generateHead(
  seed: number,
  plan: BodyPlan,
  preset: GeneratorPreset,
  body: BodyGene,
): HeadGene {
  const baseSeed = seed ^ 0x6c8e9cf5;
  const rawShape =
    plan === "serpentine"
      ? generateBlobShape(baseSeed, 92, 128, 70, 100, preset)
      : generateBlobShape(baseSeed, 86, 136, 72, 114, preset);

  const bodyW = body.shape.width;
  const bodyH = body.shape.height;
  const [wMinRatio, wMaxRatio] =
    plan === "serpentine"
      ? ([0.42, 0.74] as const)
      : plan === "insectoid"
        ? ([0.42, 0.86] as const)
        : plan === "avian"
          ? ([0.5, 0.92] as const)
          : ([0.48, 0.95] as const);
  const [hMinRatio, hMaxRatio] =
    plan === "serpentine"
      ? ([0.85, 1.35] as const)
      : plan === "insectoid"
        ? ([0.55, 0.95] as const)
        : ([0.55, 0.9] as const);

  const shape: BlobShape = {
    ...rawShape,
    width: clampInt(rawShape.width, bodyW * wMinRatio, bodyW * wMaxRatio),
    height: clampInt(rawShape.height, bodyH * hMinRatio, bodyH * hMaxRatio),
  };

  const prng = createPrng(seed ^ 0x8bd63af1);
  const earType =
    preset === "cute"
      ? prng.pick(["round", "pointy", "round", "none"] as const)
      : prng.pick(["none", "pointy", "round"] as const);

  const hornChance = preset === "cute" ? 0.18 : preset === "weird" ? 0.75 : 0.55;
  const hornCount = (prng.nextFloat() < hornChance
    ? prng.pick([0, 1, 2] as const)
    : 0) as 0 | 1 | 2;

  // Keep some plans more themed.
  if (plan === "avian") return { shape, earType: "none", hornCount: 0 };
  if (plan === "insectoid") return { shape, earType: prng.pick(["none", "pointy"] as const), hornCount: 0 };
  return { shape, earType, hornCount };
}

function generateFace(seed: number, plan: BodyPlan, preset: GeneratorPreset): FaceGene {
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

  const eyeSpacing = 0.18 + prng.nextFloat() * 0.26;
  const eyeSize = 0.06 + prng.nextFloat() * 0.08;

  const mouthType = plan === "avian" ? "beak" : prng.pick(["smile", "frown"] as const);
  const fangs =
    plan === "avian"
      ? 0
      : preset === "cute"
        ? (prng.pick([0, 0, 0, 1] as const) as 0 | 1 | 2)
        : (prng.pick([0, 0, 1, 2] as const) as 0 | 1 | 2);

  return { eyeType, eyeCount, eyeSpacing, eyeSize, mouthType, fangs };
}

function pickTailStyle(
  prng: ReturnType<typeof createPrng>,
  preset: GeneratorPreset,
): TailStyle {
  if (preset === "cute") return prng.pick(["leaf", "taper", "leaf"] as const);
  if (preset === "weird") return prng.pick(["club", "taper", "leaf"] as const);
  return prng.pick(["taper", "leaf", "club"] as const);
}

function generateLimbs(seed: number, plan: BodyPlan, preset: GeneratorPreset): LimbsGene {
  const prng = createPrng(seed ^ 0xdaa66d2b);

  if (plan === "serpentine") {
    return { arms: 0, legs: 0, wingType: "none", tail: false };
  }

  if (plan === "quadruped") {
    return { arms: 0, legs: 4, wingType: "none", tail: true, tailStyle: pickTailStyle(prng, preset) };
  }

  if (plan === "avian") {
    const tail = prng.bool(0.7);
    return {
      arms: 0,
      legs: 2,
      wingType: prng.pick(["small", "big"] as const),
      tail,
      tailStyle: tail ? pickTailStyle(prng, preset) : undefined,
    };
  }

  if (plan === "insectoid") {
    const tail = prng.bool(0.55);
    return {
      arms: 0,
      legs: 6,
      wingType: prng.bool(0.45) ? "small" : "none",
      tail,
      tailStyle: tail ? pickTailStyle(prng, preset) : undefined,
    };
  }

  // biped/blob
  const arms =
    preset === "cute"
      ? prng.pick([0, 1, 2, 2] as const)
      : prng.pick([0, 1, 2] as const);
  const legs =
    plan === "blob" ? prng.pick([0, 2, 0] as const) : prng.pick([0, 2] as const);
  const tail = prng.bool(0.55);
  return { arms, legs, wingType: "none", tail, tailStyle: tail ? pickTailStyle(prng, preset) : undefined };
}

function generateAccessory(seed: number, plan: BodyPlan, preset: GeneratorPreset): AccessoryGene {
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

function pickPlan(prng: ReturnType<typeof createPrng>, preset: GeneratorPreset): BodyPlan {
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

export function deriveAnim(seed: number): AnimGene {
  const prng = createPrng(seed ^ 0x85ebca6b);
  return {
    blinkMs: prng.nextInt(3200, 5200),
    bobMs: prng.nextInt(1600, 2400),
    bobAmpPx: prng.nextInt(2, 5),
  };
}

export function generateGenome(seed: number, settings?: GeneratorSettings): Genome {
  const prng = createPrng(seed);
  const preset: GeneratorPreset = settings?.preset ?? "classic";
  const plan = pickPlan(prng, preset);

  const palette = generatePalette(seed, preset);
  const body = generateBody(seed, plan, preset);
  const head = generateHead(seed, plan, preset, body);
  const face = generateFace(seed, plan, preset);
  const limbs = generateLimbs(seed, plan, preset);
  const accessory = generateAccessory(seed, plan, preset);
  const anim = deriveAnim(seed);

  const namePrng = createPrng(seed ^ 0x1b873593);
  const name = generateName(namePrng);
  const abilities = pickAbilities(plan, seed >>> 0);

  const lore = `A ${plan} mon with a ${body.pattern.kind === "none" ? "clean" : body.pattern.kind} coat.`;

  return {
    schemaVersion: 1,
    id: makeId(seed >>> 0),
    seed: seed >>> 0,
    plan,
    palette,
    body,
    head,
    face,
    limbs,
    accessory,
    anim,
    meta: { name, abilities, lore },
  };
}
