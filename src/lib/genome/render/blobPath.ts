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
    mids.push(midpoint(points[i]!, points[(i + 1) % k]!));
  }

  let d = `M ${fmt(mids[0]!.x)} ${fmt(mids[0]!.y)}`;
  for (let i = 0; i < k; i++) {
    const p = points[(i + 1) % k]!;
    const m = mids[(i + 1) % k]!;
    d += ` Q ${fmt(p.x)} ${fmt(p.y)} ${fmt(m.x)} ${fmt(m.y)}`;
  }
  d += " Z";
  return d;
}

