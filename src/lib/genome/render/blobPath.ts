type Point = { x: number; y: number };

function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function fmt(n: number) {
  return Number(n.toFixed(2));
}

export function makeBlobPath(
  cx: number,
  cy: number,
  width: number,
  height: number,
  jitter: number[],
) {
  const rx = width / 2;
  const ry = height / 2;
  const k = jitter.length;
  if (k < 3) {
    throw new Error("makeBlobPath requires jitter length >= 3");
  }

  const points: Point[] = [];
  for (let i = 0; i < k; i++) {
    const a = (i / k) * Math.PI * 2;
    const r = jitter[i] ?? 1;
    points.push({
      x: cx + Math.cos(a) * rx * r,
      y: cy + Math.sin(a) * ry * r,
    });
  }

  const mids: Point[] = [];
  for (let i = 0; i < k; i++) {
    const a = points[i];
    const b = points[(i + 1) % k];
    if (!a || !b) {
      throw new Error("makeBlobPath internal error: missing point");
    }
    mids.push(midpoint(a, b));
  }

  const first = mids[0];
  if (!first) {
    throw new Error("makeBlobPath internal error: missing midpoint");
  }
  let d = `M ${fmt(first.x)} ${fmt(first.y)}`;
  for (let i = 0; i < k; i++) {
    const p = points[(i + 1) % k];
    const m = mids[(i + 1) % k];
    if (!p || !m) {
      throw new Error("makeBlobPath internal error: missing point/midpoint");
    }
    d += ` Q ${fmt(p.x)} ${fmt(p.y)} ${fmt(m.x)} ${fmt(m.y)}`;
  }
  d += " Z";
  return d;
}
