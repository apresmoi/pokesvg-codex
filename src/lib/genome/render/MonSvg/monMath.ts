import type { SpineFrame } from "../tubePath";

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export function limbBaseAngle(frame: SpineFrame, side: "left" | "right") {
  const a = Math.atan2(frame.n.y, frame.n.x);
  return side === "right" ? a + Math.PI : a;
}

export function limbAnchor(frame: SpineFrame, side: "left" | "right") {
  const sign = side === "left" ? 1 : -1;
  const r = frame.r * 0.92;
  return {
    x: frame.p.x + frame.n.x * r * sign,
    y: frame.p.y + frame.n.y * r * sign,
  };
}

export function limbTip(
  anchor: { x: number; y: number },
  angleRad: number,
  lengthPx: number,
) {
  return {
    x: anchor.x + Math.cos(angleRad) * lengthPx,
    y: anchor.y + Math.sin(angleRad) * lengthPx,
  };
}
