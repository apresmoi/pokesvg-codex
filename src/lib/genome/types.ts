export type SchemaVersion = 2;

export type BodyPlan =
  | "biped"
  | "quadruped"
  | "avian"
  | "serpentine"
  | "blob"
  | "insectoid";

export type Palette = {
  base: string;
  shade: string;
  accent: string;
  eye: string;
  outline: string;
};

export type Vec2 = { x: number; y: number };

export type SpineCurve =
  | "upright"
  | "horizontal"
  | "hunched"
  | "coiled"
  | "s-bend";

export type SpineGene = {
  curve: SpineCurve;
  // Points are in the MonSvg viewBox coordinate space (0..256-ish).
  points: Vec2[];
  // Radius per point (same length as points).
  radii: number[];
};

export type EarType = "none" | "pointy" | "round";
export type HeadFamily = "round" | "angular" | "pointed" | "flat" | "star";

export type HeadGene = {
  family: HeadFamily;
  // Ratio relative to spine radius at the head segment.
  size: number;
  // Head height ratio relative to width.
  aspect: number;
  tiltDeg: number;
  earType: EarType;
  hornCount: 0 | 1 | 2;
};

export type EyeType = "dot" | "oval" | "slit";
export type MouthType = "smile" | "frown" | "beak";

export type FaceGene = {
  eyeType: EyeType;
  eyeCount: 1 | 2 | 3 | 4;
  eyeSpacing: number; // relative to head width
  eyeSize: number; // relative to head width
  mouthType: MouthType;
  fangs: 0 | 1 | 2;
};

export type LimbSlot = "arm" | "leg" | "wing";
export type LimbSide = "left" | "right";
export type LimbFamily =
  | "stub"
  | "claw"
  | "tentacle"
  | "fin"
  | "pincer"
  | "wing";

export type LimbGene = {
  slot: LimbSlot;
  segment: number;
  side: LimbSide;
  family: LimbFamily;
  scale: number;
  length: number;
  angleDeg: number;
};

export type TailFamily = "none" | "taper" | "leaf" | "club" | "stinger";

export type TailGene = {
  family: TailFamily;
  length: number;
  curl: number;
};

export type SurfaceFamily = "spikes" | "bumps" | "ridges" | "crystals";
export type SurfaceSide = "dorsal" | "ventral";

export type SurfacePlacement = {
  family: SurfaceFamily;
  segment: number;
  side: SurfaceSide;
  count: number;
  scale: number;
};

export type SurfaceGene = {
  placements: SurfacePlacement[];
};

export type AnimGene = {
  blinkMs: number;
  bobMs: number;
  bobAmpPx: number;
};

export type AccessoryGene =
  | { kind: "none" }
  | { kind: "gem" }
  | { kind: "antenna"; count: 1 | 2 }
  | { kind: "collar" };

export type MetaGene = {
  name: string;
  abilities: [string, string];
  lore: string;
};

export type GenomeV2 = {
  schemaVersion: SchemaVersion;
  id: string;
  seed: number;
  plan: BodyPlan;
  palette: Palette;
  spine: SpineGene;
  head: HeadGene;
  face: FaceGene;
  limbs: LimbGene[];
  tail: TailGene;
  surface: SurfaceGene;
  accessory: AccessoryGene;
  anim: AnimGene;
  meta: MetaGene;
};

export type Genome = GenomeV2;
