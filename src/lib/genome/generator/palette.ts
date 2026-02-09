import { hslToHex } from "@/lib/color";
import { createPrng } from "@/lib/prng";
import type { GeneratorPreset } from "@/lib/settings";

import type { Palette } from "../types";

export function generatePalette(
  seed: number,
  preset: GeneratorPreset,
): Palette {
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
