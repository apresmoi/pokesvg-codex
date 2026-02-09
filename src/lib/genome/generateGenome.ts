import { hslToHex } from "@/lib/color";
import { createPrng } from "@/lib/prng";

import { pickAbilities } from "./abilities";
import { generateName } from "./name";
import type {
  BlobShape,
  BodyGene,
  BodyPlan,
  FaceGene,
  Genome,
  HeadGene,
  LimbsGene,
  Palette,
  PatternGene,
  Spot,
} from "./types";

const BODY_PLANS: readonly BodyPlan[] = [
  "biped",
  "quadruped",
  "avian",
  "serpentine",
  "blob",
  "insectoid",
];

function makeId(seed: number) {
  return `seed_${seed.toString(16).padStart(8, "0")}`;
}

function generatePalette(seed: number): Palette {
  const prng = createPrng(seed ^ 0x9e3779b9);
  const hue = prng.nextInt(0, 359);
  const accentHue = (hue + prng.nextInt(20, 120)) % 360;

  const base = hslToHex(hue, 0.62, 0.52);
  const shade = hslToHex(hue, 0.62, 0.36);
  const accent = hslToHex(accentHue, 0.78, 0.55);
  const eye = "#e5e7eb";
  const outline = "#0b0b10";

  return { base, shade, accent, eye, outline };
}

function generateBlobShape(seed: number, wMin: number, wMax: number, hMin: number, hMax: number): BlobShape {
  const prng = createPrng(seed);
  const width = prng.nextInt(wMin, wMax);
  const height = prng.nextInt(hMin, hMax);
  const points = prng.nextInt(8, 12);
  const jitter: number[] = [];
  for (let i = 0; i < points; i++) {
    // Keep tight enough to stay creature-like.
    jitter.push(0.82 + prng.nextFloat() * 0.36);
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

function generateBody(seed: number, plan: BodyPlan): BodyGene {
  const baseSeed = seed ^ 0x1337b00b;
  const shape =
    plan === "serpentine"
      ? generateBlobShape(baseSeed, 160, 190, 66, 86)
      : generateBlobShape(baseSeed, 120, 156, 96, 136);

  const prng = createPrng(seed ^ 0x7f4a7c15);
  const belly = plan !== "serpentine" && prng.bool(0.75);
  const pattern = generatePattern(seed ^ 0x2b992ddf);

  return { shape, belly, pattern };
}

function generateHead(seed: number, plan: BodyPlan): HeadGene {
  const baseSeed = seed ^ 0x6c8e9cf5;
  const shape =
    plan === "serpentine"
      ? generateBlobShape(baseSeed, 90, 120, 70, 96)
      : generateBlobShape(baseSeed, 88, 130, 72, 110);

  const prng = createPrng(seed ^ 0x8bd63af1);
  const earType = prng.pick(["none", "pointy", "round"] as const);
  const hornCount = (prng.nextFloat() < 0.55 ? prng.pick([0, 1, 2] as const) : 0) as 0 | 1 | 2;

  // Keep some plans more themed.
  if (plan === "avian") return { shape, earType: "none", hornCount: 0 };
  if (plan === "insectoid") return { shape, earType: prng.pick(["none", "pointy"] as const), hornCount: 0 };
  return { shape, earType, hornCount };
}

function generateFace(seed: number, plan: BodyPlan): FaceGene {
  const prng = createPrng(seed ^ 0x3c6ef372);

  const eyeType = prng.pick(["dot", "oval", "slit"] as const);
  const eyeCount = (
    plan === "insectoid"
      ? prng.pick([2, 3, 4] as const)
      : prng.pick([1, 2] as const)
  ) as 1 | 2 | 3 | 4;

  const eyeSpacing = 0.18 + prng.nextFloat() * 0.26;
  const eyeSize = 0.06 + prng.nextFloat() * 0.08;

  const mouthType = plan === "avian" ? "beak" : prng.pick(["smile", "frown"] as const);
  const fangs = plan === "avian" ? 0 : (prng.pick([0, 0, 1, 2] as const) as 0 | 1 | 2);

  return { eyeType, eyeCount, eyeSpacing, eyeSize, mouthType, fangs };
}

function generateLimbs(seed: number, plan: BodyPlan): LimbsGene {
  const prng = createPrng(seed ^ 0xdaa66d2b);

  if (plan === "serpentine") {
    return { arms: 0, legs: 0, wingType: "none", tail: false };
  }

  if (plan === "quadruped") {
    return { arms: 0, legs: 4, wingType: "none", tail: true };
  }

  if (plan === "avian") {
    return {
      arms: 0,
      legs: 2,
      wingType: prng.pick(["small", "big"] as const),
      tail: prng.bool(0.7),
    };
  }

  if (plan === "insectoid") {
    return { arms: 0, legs: 6, wingType: prng.bool(0.45) ? "small" : "none", tail: prng.bool(0.55) };
  }

  // biped/blob
  const arms = prng.pick([0, 1, 2] as const);
  const legs = prng.pick([0, 2] as const);
  return { arms, legs, wingType: "none", tail: prng.bool(0.55) };
}

export function generateGenome(seed: number): Genome {
  const prng = createPrng(seed);
  const plan = prng.pick(BODY_PLANS);

  const palette = generatePalette(seed);
  const body = generateBody(seed, plan);
  const head = generateHead(seed, plan);
  const face = generateFace(seed, plan);
  const limbs = generateLimbs(seed, plan);

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
    meta: { name, abilities, lore },
  };
}

