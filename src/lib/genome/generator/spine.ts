import type { Prng } from "@/lib/prng";
import { createPrng } from "@/lib/prng";
import type { GeneratorPreset } from "@/lib/settings";
import type { BodyPlan, SpineCurve, SpineGene, Vec2 } from "../types";
import { clamp, lerp } from "./math";

function pickCurve(
  prng: Prng,
  plan: BodyPlan,
  preset: GeneratorPreset,
): SpineCurve {
  if (plan === "serpentine")
    return prng.pick(["horizontal", "s-bend", "coiled"] as const);
  if (plan === "quadruped")
    return prng.pick(["horizontal", "hunched", "s-bend"] as const);
  if (plan === "insectoid")
    return prng.pick(["horizontal", "s-bend", "hunched"] as const);
  if (plan === "avian")
    return prng.pick(["upright", "hunched", "horizontal"] as const);
  if (preset === "weird" && prng.bool(0.25)) return "coiled";
  return prng.pick(["upright", "hunched", "horizontal"] as const);
}

function pickSegmentCount(prng: Prng, plan: BodyPlan): number {
  if (plan === "serpentine") return prng.nextInt(4, 6);
  if (plan === "insectoid") return prng.nextInt(4, 6);
  if (plan === "quadruped") return prng.nextInt(3, 5);
  if (plan === "avian") return prng.nextInt(3, 5);
  if (plan === "blob") return prng.nextInt(2, 4);
  return prng.nextInt(3, 5);
}

function clampPoint(p: Vec2): Vec2 {
  return { x: clamp(p.x, 34, 222), y: clamp(p.y, 38, 232) };
}

function generateSpinePoints(
  prng: Prng,
  curve: SpineCurve,
  count: number,
): Vec2[] {
  const points: Vec2[] = [];
  if (count < 2) return points;

  const phase = prng.nextFloat() * Math.PI * 2;

  if (curve === "upright" || curve === "hunched") {
    const x0 = 128 + prng.nextInt(-16, 16);
    const y0 = 214 + prng.nextInt(-6, 6);
    const y1 = 100 + prng.nextInt(-12, 12);
    const amp = prng.nextInt(8, 26);
    const lean = curve === "hunched" ? prng.nextInt(-32, 32) : 0;

    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const y = lerp(y0, y1, t);
      const x =
        x0 + Math.sin(phase + t * Math.PI * 1.35) * amp + t ** 1.25 * lean;
      points.push(clampPoint({ x, y }));
    }
    return points;
  }

  if (curve === "coiled") {
    const cx = 128 + prng.nextInt(-10, 10);
    const cy = 158 + prng.nextInt(-10, 14);
    const r0 = prng.nextInt(52, 66);
    const r1 = prng.nextInt(18, 28);
    const a0 = phase * 0.35;
    const turns = prng.nextFloat() < 0.5 ? 2.25 : 2.75;

    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const a = a0 + t * (Math.PI * 2) * turns;
      const r = lerp(r0, r1, t);
      points.push(
        clampPoint({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }),
      );
    }
    return points;
  }

  // horizontal / s-bend
  const x0 = 72 + prng.nextInt(-8, 8);
  const x1 = 196 + prng.nextInt(-8, 8);
  const y0 = 170 + prng.nextInt(-10, 10);
  const amp = prng.nextInt(8, 24);
  const freq = curve === "s-bend" ? 2 : 1;

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const x = lerp(x0, x1, t);
    const y = y0 + Math.sin(phase + t * Math.PI * freq) * amp;
    points.push(clampPoint({ x, y }));
  }

  return points;
}

function baseRadius(
  prng: Prng,
  plan: BodyPlan,
  preset: GeneratorPreset,
): number {
  if (plan === "serpentine")
    return prng.nextInt(18, preset === "weird" ? 30 : 26);
  if (plan === "insectoid")
    return prng.nextInt(18, preset === "cute" ? 26 : 30);
  if (plan === "blob") return prng.nextInt(32, preset === "cute" ? 52 : 46);
  if (plan === "quadruped") return prng.nextInt(26, 44);
  if (plan === "avian") return prng.nextInt(22, 40);
  return prng.nextInt(24, 44);
}

function generateRadii(
  prng: Prng,
  plan: BodyPlan,
  preset: GeneratorPreset,
  count: number,
): number[] {
  const radii: number[] = [];
  const base = baseRadius(prng, plan, preset);

  const taper =
    plan === "serpentine"
      ? 0.55 + prng.nextFloat() * 0.2
      : 0.2 + prng.nextFloat() * 0.35;
  const bulgeCenter = 0.25 + prng.nextFloat() * 0.55;
  const bulgeAmp = 0.12 + prng.nextFloat() * (preset === "weird" ? 0.55 : 0.35);
  const bulgeWidth = 0.22 + prng.nextFloat() * 0.18;

  for (let i = 0; i < count; i++) {
    const t = count <= 1 ? 0 : i / (count - 1);
    const g = (t - bulgeCenter) / bulgeWidth;
    const bulge = 1 + bulgeAmp * Math.exp(-(g * g));
    const noise = 0.86 + prng.nextFloat() * 0.3;
    const r = base * (1 - t * taper) * bulge * noise;
    radii.push(clamp(Math.round(r), 10, 68));
  }

  return radii;
}

export function generateSpine(
  seed: number,
  plan: BodyPlan,
  preset: GeneratorPreset,
): SpineGene {
  const prng = createPrng(seed ^ 0x1337b00b);
  const curve = pickCurve(prng, plan, preset);
  const count = pickSegmentCount(prng, plan);
  const points = generateSpinePoints(prng, curve, count);
  const radii = generateRadii(
    createPrng(seed ^ 0x7f4a7c15),
    plan,
    preset,
    points.length,
  );
  return { curve, points, radii };
}
