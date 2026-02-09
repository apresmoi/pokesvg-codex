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
} from "./parseGenomeHelpers";
import type { ParseGenomeResult } from "./parseGenomeResult";
import type {
  Genome,
  HeadFamily,
  LimbFamily,
  LimbSide,
  LimbSlot,
  SpineCurve,
  SurfaceFamily,
  SurfaceGene,
  SurfacePlacement,
  SurfaceSide,
  TailFamily,
  TailGene,
  Vec2,
} from "./types";

function parseNumberInRange(
  value: unknown,
  min: number,
  max: number,
): number | null {
  if (typeof value !== "number") return null;
  if (!Number.isFinite(value)) return null;
  if (value < min || value > max) return null;
  return value;
}

function parseIntInRange(
  value: unknown,
  min: number,
  max: number,
): number | null {
  const n = parseNumberInRange(value, min, max);
  if (n === null) return null;
  return Math.floor(n);
}

function parseSpineCurve(value: unknown): SpineCurve | null {
  if (value === "upright") return "upright";
  if (value === "horizontal") return "horizontal";
  if (value === "hunched") return "hunched";
  if (value === "coiled") return "coiled";
  if (value === "s-bend") return "s-bend";
  return null;
}

function parseHeadFamily(value: unknown): HeadFamily | null {
  if (value === "round") return "round";
  if (value === "angular") return "angular";
  if (value === "pointed") return "pointed";
  if (value === "flat") return "flat";
  if (value === "star") return "star";
  return null;
}

function parseLimbSlot(value: unknown): LimbSlot | null {
  if (value === "arm") return "arm";
  if (value === "leg") return "leg";
  if (value === "wing") return "wing";
  return null;
}

function parseLimbSide(value: unknown): LimbSide | null {
  if (value === "left") return "left";
  if (value === "right") return "right";
  return null;
}

function parseLimbFamily(value: unknown): LimbFamily | null {
  if (value === "stub") return "stub";
  if (value === "claw") return "claw";
  if (value === "tentacle") return "tentacle";
  if (value === "fin") return "fin";
  if (value === "pincer") return "pincer";
  if (value === "wing") return "wing";
  return null;
}

function parseTailFamily(value: unknown): TailFamily | null {
  if (value === "none") return "none";
  if (value === "taper") return "taper";
  if (value === "leaf") return "leaf";
  if (value === "club") return "club";
  if (value === "stinger") return "stinger";
  return null;
}

function parseSurfaceFamily(value: unknown): SurfaceFamily | null {
  if (value === "spikes") return "spikes";
  if (value === "bumps") return "bumps";
  if (value === "ridges") return "ridges";
  if (value === "crystals") return "crystals";
  return null;
}

function parseSurfaceSide(value: unknown): SurfaceSide | null {
  if (value === "dorsal") return "dorsal";
  if (value === "ventral") return "ventral";
  return null;
}

function parseVec2(value: unknown): Vec2 | null {
  if (!isRecord(value)) return null;
  const x = parseNumberInRange(value.x, 0, 256);
  const y = parseNumberInRange(value.y, 0, 256);
  if (x === null || y === null) return null;
  return { x, y };
}

function notNull<T>(value: T | null): value is T {
  return value !== null;
}

export function parseGenomeValueV2(value: unknown): ParseGenomeResult {
  if (!isRecord(value)) return { ok: false, error: "Genome must be an object" };
  if (value.schemaVersion !== 2)
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

  // Spine
  if (!isRecord(value.spine)) return { ok: false, error: "Invalid spine" };
  const spineValue = value.spine;
  const curve = parseSpineCurve(spineValue.curve);
  if (!curve) return { ok: false, error: "Invalid spine.curve" };
  const rawPoints = Array.isArray(spineValue.points) ? spineValue.points : null;
  const rawRadii = Array.isArray(spineValue.radii) ? spineValue.radii : null;
  if (!rawPoints || !rawRadii)
    return { ok: false, error: "Invalid spine arrays" };
  if (rawPoints.length < 2 || rawPoints.length > 6)
    return { ok: false, error: "Invalid spine.points length" };
  if (rawRadii.length !== rawPoints.length)
    return { ok: false, error: "spine.radii length mismatch" };

  const parsedPoints = rawPoints.map(parseVec2);
  const points = parsedPoints.filter(notNull);
  if (points.length !== rawPoints.length)
    return { ok: false, error: "Invalid spine point" };

  const radii: number[] = [];
  for (let i = 0; i < rawRadii.length; i++) {
    const r = parseNumberInRange(rawRadii[i], 8, 90);
    if (r === null) return { ok: false, error: "Invalid spine radius" };
    radii.push(Math.round(r));
  }

  // Head
  if (!isRecord(value.head)) return { ok: false, error: "Invalid head" };
  const headValue = value.head;
  const family = parseHeadFamily(headValue.family);
  if (!family) return { ok: false, error: "Invalid head.family" };
  const size = parseNumberInRange(headValue.size, 0.6, 2.2);
  const aspect = parseNumberInRange(headValue.aspect, 0.45, 1.8);
  const tiltDeg = parseNumberInRange(headValue.tiltDeg, -60, 60);
  if (size === null || aspect === null || tiltDeg === null)
    return { ok: false, error: "Invalid head params" };
  const earType = parseEarType(headValue.earType) ?? "none";
  const hornCount =
    headValue.hornCount === 0 ||
    headValue.hornCount === 1 ||
    headValue.hornCount === 2
      ? headValue.hornCount
      : 0;

  // Face
  if (!isRecord(value.face)) return { ok: false, error: "Invalid face" };
  const faceValue = value.face;
  const eyeType = parseEyeType(faceValue.eyeType);
  const mouthType = parseMouthType(faceValue.mouthType);
  if (!eyeType || !mouthType) return { ok: false, error: "Invalid face types" };
  const eyeCount =
    faceValue.eyeCount === 1 ||
    faceValue.eyeCount === 2 ||
    faceValue.eyeCount === 3 ||
    faceValue.eyeCount === 4
      ? faceValue.eyeCount
      : null;
  const fangs =
    faceValue.fangs === 0 || faceValue.fangs === 1 || faceValue.fangs === 2
      ? faceValue.fangs
      : null;
  const eyeSpacing = parseNumberInRange(faceValue.eyeSpacing, 0.05, 0.95);
  const eyeSize = parseNumberInRange(faceValue.eyeSize, 0.02, 0.35);
  if (
    eyeCount === null ||
    fangs === null ||
    eyeSpacing === null ||
    eyeSize === null
  )
    return { ok: false, error: "Invalid face params" };

  // Limbs
  const limbsValue = Array.isArray(value.limbs) ? value.limbs : null;
  if (!limbsValue) return { ok: false, error: "Invalid limbs" };
  if (limbsValue.length > 24) return { ok: false, error: "Too many limbs" };
  const limbRecords = limbsValue.filter(isRecord);
  const limbs = limbRecords
    .map((l) => {
      const slot = parseLimbSlot(l.slot);
      const side = parseLimbSide(l.side);
      const lf = parseLimbFamily(l.family);
      const segment = parseIntInRange(l.segment, 0, points.length - 1);
      const scale = parseNumberInRange(l.scale, 0.35, 2.5);
      const length = parseNumberInRange(l.length, 0.25, 3.2);
      const angleDeg = parseNumberInRange(l.angleDeg, -120, 120);
      if (!slot || !side || !lf) return null;
      if (
        segment === null ||
        scale === null ||
        length === null ||
        angleDeg === null
      )
        return null;
      return {
        slot,
        side,
        family: lf,
        segment,
        scale,
        length,
        angleDeg: Math.floor(angleDeg),
      };
    })
    .filter(notNull);
  if (limbs.length !== limbRecords.length)
    return { ok: false, error: "Invalid limb entry" };

  // Tail
  if (!isRecord(value.tail)) return { ok: false, error: "Invalid tail" };
  const tailValue = value.tail;
  const tailFamily = parseTailFamily(tailValue.family);
  if (!tailFamily) return { ok: false, error: "Invalid tail.family" };
  const tailLength = parseNumberInRange(tailValue.length, 0, 3.2);
  const tailCurl = parseNumberInRange(tailValue.curl, -2, 2);
  if (tailLength === null || tailCurl === null)
    return { ok: false, error: "Invalid tail params" };
  if (tailFamily === "none" && tailLength !== 0)
    return { ok: false, error: "tail.length must be 0 when none" };

  const tail: TailGene = {
    family: tailFamily,
    length: tailLength,
    curl: tailCurl,
  };

  // Surface
  if (!isRecord(value.surface)) return { ok: false, error: "Invalid surface" };
  const surfaceValue = value.surface;
  const placementsValue = Array.isArray(surfaceValue.placements)
    ? surfaceValue.placements
    : null;
  if (!placementsValue)
    return { ok: false, error: "Invalid surface.placements" };
  if (placementsValue.length > 12)
    return { ok: false, error: "Too many surface placements" };
  const placementRecords = placementsValue.filter(isRecord);
  const placements = placementRecords
    .map((p) => {
      const family = parseSurfaceFamily(p.family);
      const side = parseSurfaceSide(p.side);
      const segment = parseIntInRange(p.segment, 0, points.length - 1);
      const count = parseIntInRange(p.count, 1, 12);
      const scale = parseNumberInRange(p.scale, 0.35, 3);
      if (!family || !side) return null;
      if (segment === null || count === null || scale === null) return null;
      return { family, side, segment, count, scale };
    })
    .filter(notNull);
  if (placements.length !== placementRecords.length)
    return { ok: false, error: "Invalid surface placement" };

  const surface: SurfaceGene = { placements: placements as SurfacePlacement[] };

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
    schemaVersion: 2,
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
    spine: { curve, points: points.map((p) => ({ x: p.x, y: p.y })), radii },
    head: { family, size, aspect, tiltDeg, earType, hornCount },
    face: { eyeType, eyeCount, eyeSpacing, eyeSize, mouthType, fangs },
    limbs,
    tail,
    surface,
    accessory,
    anim,
    meta: { name, abilities: [abilities[0], abilities[1]], lore },
  };

  return { ok: true, genome };
}
