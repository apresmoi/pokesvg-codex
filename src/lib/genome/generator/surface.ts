import type { Prng } from "@/lib/prng";
import { createPrng } from "@/lib/prng";
import type { GeneratorPreset } from "@/lib/settings";

import type {
  BodyPlan,
  SpineGene,
  SurfaceFamily,
  SurfaceGene,
  SurfacePlacement,
} from "../types";

function pickSurfaceFamily(prng: Prng, preset: GeneratorPreset): SurfaceFamily {
  if (preset === "cute")
    return prng.pick(["bumps", "crystals", "bumps", "ridges"] as const);
  if (preset === "weird")
    return prng.pick(["spikes", "ridges", "crystals", "spikes"] as const);
  return prng.pick(["spikes", "bumps", "ridges", "crystals"] as const);
}

export function generateSurface(
  seed: number,
  plan: BodyPlan,
  preset: GeneratorPreset,
  spine: SpineGene,
): SurfaceGene {
  const prng = createPrng(seed ^ 0x9e3779b1);
  const n = spine.points.length;
  const placements: SurfacePlacement[] = [];
  if (n < 3) return { placements };

  const baseChance =
    preset === "cute" ? 0.45 : preset === "weird" ? 0.85 : 0.65;
  const count = !prng.bool(baseChance)
    ? 0
    : plan === "serpentine"
      ? prng.nextInt(1, 3)
      : prng.nextInt(1, 2);

  const used = new Set<string>();
  for (let i = 0; i < count; i++) {
    const segment = prng.nextInt(1, n - 2);
    const side = prng.bool(0.85) ? "dorsal" : "ventral";
    const key = `${segment}:${side}`;
    if (used.has(key)) continue;
    used.add(key);

    const family = pickSurfaceFamily(prng, preset);
    const scale = 0.7 + prng.nextFloat() * (preset === "weird" ? 1.0 : 0.75);
    const featureCount =
      family === "ridges"
        ? prng.nextInt(2, 5)
        : family === "crystals"
          ? prng.nextInt(1, 3)
          : prng.nextInt(3, 7);

    placements.push({ family, segment, side, count: featureCount, scale });
  }

  return { placements };
}
