function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function toHexByte(n: number) {
  const v = Math.round(clamp01(n) * 255);
  return v.toString(16).padStart(2, "0");
}

export function hslToHex(h: number, s: number, l: number) {
  const hue = ((h % 360) + 360) % 360;
  const sat = clamp01(s);
  const lig = clamp01(l);

  const c = (1 - Math.abs(2 * lig - 1)) * sat;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = lig - c / 2;

  let rp = 0;
  let gp = 0;
  let bp = 0;

  if (hue < 60) [rp, gp, bp] = [c, x, 0];
  else if (hue < 120) [rp, gp, bp] = [x, c, 0];
  else if (hue < 180) [rp, gp, bp] = [0, c, x];
  else if (hue < 240) [rp, gp, bp] = [0, x, c];
  else if (hue < 300) [rp, gp, bp] = [x, 0, c];
  else [rp, gp, bp] = [c, 0, x];

  const r = rp + m;
  const g = gp + m;
  const b = bp + m;

  return `#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}`;
}
