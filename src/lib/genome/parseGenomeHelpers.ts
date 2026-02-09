import { deriveAnim } from "./generateGenome";
import type {
  AccessoryGene,
  AnimGene,
  BodyPlan,
  EarType,
  EyeType,
  MouthType,
  TailStyle,
  WingType,
} from "./types";

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/;

export function isHexColor(value: unknown): value is string {
  return typeof value === "string" && HEX_COLOR_RE.test(value);
}

export function makeId(seed: number) {
  return `seed_${seed.toString(16).padStart(8, "0")}`;
}

export function parseSeed(seed: unknown): number | null {
  if (typeof seed !== "number") return null;
  if (!Number.isFinite(seed)) return null;
  const s = Math.floor(seed) >>> 0;
  return s;
}

export function parseBodyPlan(value: unknown): BodyPlan | null {
  if (value === "biped") return "biped";
  if (value === "quadruped") return "quadruped";
  if (value === "avian") return "avian";
  if (value === "serpentine") return "serpentine";
  if (value === "blob") return "blob";
  if (value === "insectoid") return "insectoid";
  return null;
}

export function parseEarType(value: unknown): EarType | null {
  if (value === "none") return "none";
  if (value === "pointy") return "pointy";
  if (value === "round") return "round";
  return null;
}

export function parseEyeType(value: unknown): EyeType | null {
  if (value === "dot") return "dot";
  if (value === "oval") return "oval";
  if (value === "slit") return "slit";
  return null;
}

export function parseMouthType(value: unknown): MouthType | null {
  if (value === "smile") return "smile";
  if (value === "frown") return "frown";
  if (value === "beak") return "beak";
  return null;
}

export function parseWingType(value: unknown): WingType | null {
  if (value === "none") return "none";
  if (value === "small") return "small";
  if (value === "big") return "big";
  return null;
}

export function parseTailStyle(value: unknown): TailStyle | null {
  if (value === "taper") return "taper";
  if (value === "leaf") return "leaf";
  if (value === "club") return "club";
  return null;
}

export function parseAccessory(value: unknown): AccessoryGene {
  if (!isRecord(value)) return { kind: "none" };
  if (value.kind === "none") return { kind: "none" };
  if (value.kind === "gem") return { kind: "gem" };
  if (value.kind === "collar") return { kind: "collar" };
  if (value.kind === "antenna") {
    const count = value.count === 1 || value.count === 2 ? value.count : null;
    if (!count) return { kind: "none" };
    return { kind: "antenna", count };
  }
  return { kind: "none" };
}

export function parseAnim(seed: number, value: unknown): AnimGene {
  if (!isRecord(value)) return deriveAnim(seed);
  const blinkMs = typeof value.blinkMs === "number" ? value.blinkMs : null;
  const bobMs = typeof value.bobMs === "number" ? value.bobMs : null;
  const bobAmpPx = typeof value.bobAmpPx === "number" ? value.bobAmpPx : null;

  if (
    blinkMs === null ||
    bobMs === null ||
    bobAmpPx === null ||
    !Number.isFinite(blinkMs) ||
    !Number.isFinite(bobMs) ||
    !Number.isFinite(bobAmpPx) ||
    blinkMs < 1000 ||
    blinkMs > 15000 ||
    bobMs < 600 ||
    bobMs > 8000 ||
    bobAmpPx < 0 ||
    bobAmpPx > 12
  ) {
    return deriveAnim(seed);
  }

  return {
    blinkMs: Math.floor(blinkMs),
    bobMs: Math.floor(bobMs),
    bobAmpPx: Math.floor(bobAmpPx),
  };
}
