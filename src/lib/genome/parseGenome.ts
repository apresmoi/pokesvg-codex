import { generateGenome } from "./generateGenome";
import {
  isHexColor,
  isRecord,
  makeId,
  parseAccessory,
  parseAnim,
  parseBodyPlan,
  parseEarType,
  parseEyeType,
  parseMouthType,
  parseSeed,
  parseTailStyle,
  parseWingType,
} from "./parseGenomeHelpers";
import type { Genome, TailStyle } from "./types";

type ParseOk = { ok: true; genome: Genome };
type ParseErr = { ok: false; error: string };
export type ParseGenomeResult = ParseOk | ParseErr;

export function parseGenomeValue(value: unknown): ParseGenomeResult {
  if (!isRecord(value)) return { ok: false, error: "Genome must be an object" };
  if (value.schemaVersion !== 1)
    return { ok: false, error: "Unsupported schemaVersion" };

  const seed = parseSeed(value.seed);
  if (seed === null) return { ok: false, error: "Invalid seed" };

  const plan = parseBodyPlan(value.plan);
  if (!plan) return { ok: false, error: "Invalid plan" };

  if (!isRecord(value.palette)) return { ok: false, error: "Invalid palette" };
  const { palette } = value;
  if (
    !isHexColor(palette.base) ||
    !isHexColor(palette.shade) ||
    !isHexColor(palette.accent) ||
    !isHexColor(palette.eye) ||
    !isHexColor(palette.outline)
  ) {
    return { ok: false, error: "Invalid palette colors" };
  }

  // Body
  if (
    !isRecord(value.body) ||
    !isRecord(value.head) ||
    !isRecord(value.face) ||
    !isRecord(value.limbs)
  ) {
    return { ok: false, error: "Invalid body/head/face/limbs" };
  }

  const body = value.body;
  if (!isRecord(body.shape) || body.shape.kind !== "blob")
    return { ok: false, error: "Invalid body shape" };
  const bodyW = typeof body.shape.width === "number" ? body.shape.width : null;
  const bodyH =
    typeof body.shape.height === "number" ? body.shape.height : null;
  const bodyJitter = Array.isArray(body.shape.jitter)
    ? body.shape.jitter
    : null;
  if (
    bodyW === null ||
    bodyH === null ||
    !Number.isFinite(bodyW) ||
    !Number.isFinite(bodyH) ||
    bodyW < 40 ||
    bodyW > 260 ||
    bodyH < 40 ||
    bodyH > 260 ||
    bodyJitter === null ||
    bodyJitter.length < 6 ||
    bodyJitter.length > 24 ||
    bodyJitter.some(
      (j) => typeof j !== "number" || !Number.isFinite(j) || j < 0.5 || j > 1.8,
    )
  ) {
    return { ok: false, error: "Invalid body shape params" };
  }

  const belly = typeof body.belly === "boolean" ? body.belly : false;

  const patternValue = body.pattern;
  let pattern:
    | { kind: "none" }
    | { kind: "spots"; spots: { x: number; y: number; r: number }[] }
    | { kind: "stripes"; angleDeg: number; count: number; width: number } = {
    kind: "none",
  };

  if (isRecord(patternValue)) {
    if (patternValue.kind === "spots" && Array.isArray(patternValue.spots)) {
      const spots = patternValue.spots
        .filter(isRecord)
        .slice(0, 12)
        .map((s) => ({
          x: typeof s.x === "number" && Number.isFinite(s.x) ? s.x : 0,
          y: typeof s.y === "number" && Number.isFinite(s.y) ? s.y : 0,
          r: typeof s.r === "number" && Number.isFinite(s.r) ? s.r : 0.1,
        }))
        .filter(
          (s) =>
            Math.abs(s.x) <= 1.2 &&
            Math.abs(s.y) <= 1.2 &&
            s.r > 0 &&
            s.r <= 0.6,
        );
      pattern = { kind: "spots", spots };
    } else if (patternValue.kind === "stripes") {
      const angleDeg =
        typeof patternValue.angleDeg === "number" ? patternValue.angleDeg : 0;
      const count =
        typeof patternValue.count === "number" ? patternValue.count : 0;
      const width =
        typeof patternValue.width === "number" ? patternValue.width : 0;
      if (
        Number.isFinite(angleDeg) &&
        Number.isFinite(count) &&
        Number.isFinite(width) &&
        Math.abs(angleDeg) <= 90 &&
        count >= 2 &&
        count <= 12 &&
        width >= 2 &&
        width <= 64
      ) {
        pattern = {
          kind: "stripes",
          angleDeg: Math.floor(angleDeg),
          count: Math.floor(count),
          width: Math.floor(width),
        };
      }
    }
  }

  // Head
  const head = value.head;
  if (!isRecord(head.shape) || head.shape.kind !== "blob")
    return { ok: false, error: "Invalid head shape" };
  const headW = typeof head.shape.width === "number" ? head.shape.width : null;
  const headH =
    typeof head.shape.height === "number" ? head.shape.height : null;
  const headJitter = Array.isArray(head.shape.jitter)
    ? head.shape.jitter
    : null;
  if (
    headW === null ||
    headH === null ||
    !Number.isFinite(headW) ||
    !Number.isFinite(headH) ||
    headW < 40 ||
    headW > 220 ||
    headH < 40 ||
    headH > 220 ||
    headJitter === null ||
    headJitter.length < 6 ||
    headJitter.length > 24 ||
    headJitter.some(
      (j) => typeof j !== "number" || !Number.isFinite(j) || j < 0.5 || j > 1.8,
    )
  ) {
    return { ok: false, error: "Invalid head shape params" };
  }

  const earType = parseEarType(head.earType) ?? "none";
  const hornCount =
    head.hornCount === 0 || head.hornCount === 1 || head.hornCount === 2
      ? head.hornCount
      : 0;

  // Face
  const face = value.face;
  const eyeType = parseEyeType(face.eyeType);
  const mouthType = parseMouthType(face.mouthType);
  if (!eyeType || !mouthType) return { ok: false, error: "Invalid face types" };
  const eyeCount =
    face.eyeCount === 1 ||
    face.eyeCount === 2 ||
    face.eyeCount === 3 ||
    face.eyeCount === 4
      ? face.eyeCount
      : null;
  const fangs =
    face.fangs === 0 || face.fangs === 1 || face.fangs === 2
      ? face.fangs
      : null;
  const eyeSpacing =
    typeof face.eyeSpacing === "number" ? face.eyeSpacing : null;
  const eyeSize = typeof face.eyeSize === "number" ? face.eyeSize : null;
  if (
    eyeCount === null ||
    fangs === null ||
    eyeSpacing === null ||
    eyeSize === null ||
    !Number.isFinite(eyeSpacing) ||
    !Number.isFinite(eyeSize) ||
    eyeSpacing < 0.05 ||
    eyeSpacing > 0.9 ||
    eyeSize < 0.02 ||
    eyeSize > 0.35
  ) {
    return { ok: false, error: "Invalid face params" };
  }

  // Limbs
  const limbs = value.limbs;
  const arms =
    limbs.arms === 0 || limbs.arms === 1 || limbs.arms === 2
      ? limbs.arms
      : null;
  const legs =
    limbs.legs === 0 || limbs.legs === 2 || limbs.legs === 4 || limbs.legs === 6
      ? limbs.legs
      : null;
  const wingType = parseWingType(limbs.wingType);
  const tail = typeof limbs.tail === "boolean" ? limbs.tail : null;
  if (arms === null || legs === null || !wingType || tail === null)
    return { ok: false, error: "Invalid limbs" };
  const tailStyle: TailStyle | undefined = tail
    ? (parseTailStyle(limbs.tailStyle) ?? undefined)
    : undefined;

  // Meta
  if (!isRecord(value.meta)) return { ok: false, error: "Invalid meta" };
  const meta = value.meta;
  const name = typeof meta.name === "string" ? meta.name.trim() : "";
  const lore = typeof meta.lore === "string" ? meta.lore.trim() : "";
  const abilitiesRaw = meta.abilities;
  const abilities =
    Array.isArray(abilitiesRaw) &&
    abilitiesRaw.length === 2 &&
    abilitiesRaw.every((a) => typeof a === "string")
      ? ([
          String(abilitiesRaw[0]).trim(),
          String(abilitiesRaw[1]).trim(),
        ] as const)
      : null;
  if (
    name.length < 1 ||
    name.length > 24 ||
    lore.length > 240 ||
    abilities === null
  ) {
    return { ok: false, error: "Invalid meta fields" };
  }

  const anim = parseAnim(seed, value.anim);
  const accessory = parseAccessory(value.accessory);

  const genome: Genome = {
    schemaVersion: 1,
    id: makeId(seed),
    seed,
    plan,
    palette: {
      base: palette.base,
      shade: palette.shade,
      accent: palette.accent,
      eye: palette.eye,
      outline: palette.outline,
    },
    body: {
      shape: {
        kind: "blob",
        width: Math.floor(bodyW),
        height: Math.floor(bodyH),
        points: bodyJitter.length,
        jitter: bodyJitter.map((j) => Number(j)),
      },
      belly,
      pattern,
    },
    head: {
      shape: {
        kind: "blob",
        width: Math.floor(headW),
        height: Math.floor(headH),
        points: headJitter.length,
        jitter: headJitter.map((j) => Number(j)),
      },
      earType,
      hornCount,
    },
    face: {
      eyeType,
      eyeCount,
      eyeSpacing,
      eyeSize,
      mouthType,
      fangs,
    },
    limbs: {
      arms,
      legs,
      wingType,
      tail,
      tailStyle,
    },
    accessory,
    anim,
    meta: {
      name,
      abilities: [abilities[0], abilities[1]],
      lore,
    },
  };

  return { ok: true, genome };
}

export function parseGenomeJson(text: string): ParseGenomeResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, error: "Invalid JSON" };
  }

  return parseGenomeValue(parsed);
}

// Convenience: for future migrations, allow regenerating a genome from seed if payload is missing.
export function parseGenomeJsonOrRegenerate(text: string): ParseGenomeResult {
  const parsed = parseGenomeJson(text);
  if (parsed.ok) return parsed;

  // If it's a number, treat as seed.
  try {
    const maybe = JSON.parse(text);
    const seed = parseSeed(maybe);
    if (seed !== null) {
      return { ok: true, genome: generateGenome(seed) };
    }
  } catch {
    // ignore
  }

  return parsed;
}
