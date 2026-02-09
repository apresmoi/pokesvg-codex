type Vec2 = { x: number; y: number };

export type SpineFrame = {
  p: Vec2;
  r: number;
  t: Vec2; // tangent (unit)
  n: Vec2; // normal (unit, left of tangent)
};

function fmt(n: number) {
  return Number(n.toFixed(2));
}

function midpoint(a: Vec2, b: Vec2): Vec2 {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function normalize(v: Vec2): Vec2 {
  const len = Math.hypot(v.x, v.y);
  if (len <= 1e-6) return { x: 1, y: 0 };
  return { x: v.x / len, y: v.y / len };
}

export function computeSpineFrames(
  points: Vec2[],
  radii: number[],
): SpineFrame[] {
  const n = points.length;
  if (n < 2) throw new Error("computeSpineFrames requires points.length >= 2");
  if (radii.length !== n)
    throw new Error("computeSpineFrames radii length mismatch");

  const frames: SpineFrame[] = [];
  for (let i = 0; i < n; i++) {
    const p = points[i];
    const r = radii[i] ?? 0;
    const prev = points[Math.max(0, i - 1)] ?? p;
    const next = points[Math.min(n - 1, i + 1)] ?? p;
    const t = normalize({ x: next.x - prev.x, y: next.y - prev.y });
    const nrm = normalize({ x: -t.y, y: t.x });
    frames.push({ p, r, t, n: nrm });
  }

  return frames;
}

function smoothClosedPath(points: Vec2[]) {
  const k = points.length;
  if (k < 3) throw new Error("smoothClosedPath requires points.length >= 3");

  const mids: Vec2[] = [];
  for (let i = 0; i < k; i++) {
    const a = points[i];
    const b = points[(i + 1) % k];
    if (!a || !b) throw new Error("smoothClosedPath internal error");
    mids.push(midpoint(a, b));
  }

  const first = mids[0];
  if (!first) throw new Error("smoothClosedPath internal error");

  let d = `M ${fmt(first.x)} ${fmt(first.y)}`;
  for (let i = 0; i < k; i++) {
    const p = points[(i + 1) % k];
    const m = mids[(i + 1) % k];
    if (!p || !m) throw new Error("smoothClosedPath internal error");
    d += ` Q ${fmt(p.x)} ${fmt(p.y)} ${fmt(m.x)} ${fmt(m.y)}`;
  }
  d += " Z";
  return d;
}

export function makeTubePath(frames: SpineFrame[], radiusScale = 1) {
  if (frames.length < 2)
    throw new Error("makeTubePath requires frames.length >= 2");

  const left: Vec2[] = [];
  const right: Vec2[] = [];

  for (const f of frames) {
    const r = Math.max(0, f.r * radiusScale);
    left.push({ x: f.p.x + f.n.x * r, y: f.p.y + f.n.y * r });
    right.push({ x: f.p.x - f.n.x * r, y: f.p.y - f.n.y * r });
  }

  const poly = [...left, ...right.reverse()];
  return smoothClosedPath(poly);
}
