import { generateGenome } from "./generateGenome";
import { isRecord, parseSeed } from "./parseGenomeHelpers";
import type { ParseGenomeResult } from "./parseGenomeResult";
import { parseGenomeValueV2 } from "./parseGenomeV2";

export type { ParseGenomeResult } from "./parseGenomeResult";

export function parseGenomeValue(value: unknown): ParseGenomeResult {
  return parseGenomeValueV2(value);
}

export function parseGenomeJson(text: string): ParseGenomeResult {
  let parsedValue: unknown;
  try {
    parsedValue = JSON.parse(text);
  } catch {
    return { ok: false, error: "Invalid JSON" };
  }

  return parseGenomeValueV2(parsedValue);
}

// Accept v2 genomes; otherwise, seed-regenerate (number or object with numeric `seed`).
export function parseGenomeJsonOrRegenerate(text: string): ParseGenomeResult {
  let parsedValue: unknown;
  try {
    parsedValue = JSON.parse(text);
  } catch {
    return { ok: false, error: "Invalid JSON" };
  }

  const parsed = parseGenomeValueV2(parsedValue);
  if (parsed.ok) return parsed;

  const seed =
    typeof parsedValue === "number"
      ? parseSeed(parsedValue)
      : isRecord(parsedValue)
        ? parseSeed(parsedValue.seed)
        : null;
  if (seed !== null) return { ok: true, genome: generateGenome(seed) };

  return parsed;
}
