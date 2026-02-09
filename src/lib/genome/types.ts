export type SchemaVersion = 1;

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

export type BlobShape = {
  kind: "blob";
  width: number;
  height: number;
  points: number;
  // Radius multiplier per point (length === points). Example: 0.85 .. 1.2
  jitter: number[];
};

export type Spot = {
  x: number; // -1..1, relative to body center
  y: number; // -1..1
  r: number; // 0..1, relative to min(bodyRx, bodyRy)
};

export type PatternGene =
  | { kind: "none" }
  | { kind: "spots"; spots: Spot[] }
  | { kind: "stripes"; angleDeg: number; count: number; width: number };

export type BodyGene = {
  shape: BlobShape;
  belly: boolean;
  pattern: PatternGene;
};

export type EarType = "none" | "pointy" | "round";

export type HeadGene = {
  shape: BlobShape;
  earType: EarType;
  hornCount: 0 | 1 | 2;
};

export type EyeType = "dot" | "oval" | "slit";
export type MouthType = "smile" | "frown" | "beak";

export type FaceGene = {
  eyeType: EyeType;
  eyeCount: 1 | 2 | 3 | 4;
  eyeSpacing: number; // 0.18 .. 0.5, relative to head width
  eyeSize: number; // 0.05 .. 0.16, relative to head width
  mouthType: MouthType;
  fangs: 0 | 1 | 2;
};

export type WingType = "none" | "small" | "big";

export type LimbsGene = {
  arms: 0 | 1 | 2;
  legs: 0 | 2 | 4 | 6;
  wingType: WingType;
  tail: boolean;
};

export type AnimGene = {
  blinkMs: number;
  bobMs: number;
  bobAmpPx: number;
};

export type MetaGene = {
  name: string;
  abilities: [string, string];
  lore: string;
};

export type GenomeV1 = {
  schemaVersion: SchemaVersion;
  id: string;
  seed: number;
  plan: BodyPlan;
  palette: Palette;
  body: BodyGene;
  head: HeadGene;
  face: FaceGene;
  limbs: LimbsGene;
  anim: AnimGene;
  meta: MetaGene;
};

export type Genome = GenomeV1;
