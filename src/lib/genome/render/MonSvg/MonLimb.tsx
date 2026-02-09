import type { Genome } from "../../types";
import type { SpineFrame } from "../tubePath";

import { clamp, degToRad, limbAnchor, limbBaseAngle, limbTip } from "./monMath";

type MonLimbProps = {
  genome: Genome;
  strokeW: number;
  frame: SpineFrame;
  limb: Genome["limbs"][number];
};

function strokeTube(
  d: string,
  w: number,
  outline: string,
  fill: string,
  strokeW: number,
) {
  const outerW = w + Math.max(6, Math.round(strokeW * 1.1));
  return (
    <>
      <path
        d={d}
        fill="none"
        stroke={outline}
        strokeWidth={outerW}
        strokeLinecap="round"
      />
      <path
        d={d}
        fill="none"
        stroke={fill}
        strokeWidth={w}
        strokeLinecap="round"
      />
    </>
  );
}

export function MonLimb({ genome, strokeW, frame, limb }: MonLimbProps) {
  const outline = genome.palette.outline;
  const base = genome.palette.base;
  const shade = genome.palette.shade;
  const accent = genome.palette.accent;

  const anchor = limbAnchor(frame, limb.side);
  const baseAngle = limbBaseAngle(frame, limb.side);
  const angle = baseAngle + degToRad(limb.angleDeg);

  const lenPx = clamp(
    frame.r * limb.length * limb.scale * 1.15,
    12,
    limb.slot === "wing" ? 110 : 72,
  );
  const w = clamp(frame.r * 0.32 * limb.scale, 6, 22);
  const tip = limbTip(anchor, angle, lenPx);

  if (limb.family === "fin") {
    const a = degToRad(22);
    const p1 = limbTip(anchor, angle + a, lenPx * 0.95);
    const p2 = limbTip(anchor, angle - a, lenPx * 0.95);
    const d = `M ${anchor.x} ${anchor.y} L ${p1.x} ${p1.y} L ${tip.x} ${tip.y} L ${p2.x} ${p2.y} Z`;
    return (
      <path
        d={d}
        fill={accent}
        stroke={outline}
        strokeWidth={strokeW}
        strokeLinejoin="round"
      />
    );
  }

  if (limb.family === "wing") {
    const wingSpan = clamp(lenPx * 0.9, 36, 120);
    const wingH = clamp(lenPx * 0.55, 22, 84);
    const x0 = anchor.x;
    const y0 = anchor.y;
    const d = `M ${x0} ${y0} C ${x0 + wingSpan} ${y0 - wingH * 0.7}, ${x0 + wingSpan} ${
      y0 + wingH * 0.7
    }, ${x0} ${y0 + wingH} C ${x0 - wingSpan * 0.45} ${y0 + wingH * 0.5}, ${
      x0 - wingSpan * 0.45
    } ${y0 - wingH * 0.2}, ${x0} ${y0} Z`;
    const angleSvg = (angle * 180) / Math.PI;
    return (
      <g transform={`rotate(${angleSvg} ${anchor.x} ${anchor.y})`}>
        <path d={d} fill={accent} stroke={outline} strokeWidth={strokeW} />
        <path
          d={d}
          fill="none"
          stroke={base}
          strokeOpacity="0.22"
          strokeWidth={2}
        />
      </g>
    );
  }

  if (limb.family === "pincer") {
    const split = lenPx * 0.75;
    const mid = limbTip(anchor, angle, split);
    const forkA = limbTip(mid, angle + degToRad(26), lenPx * 0.28);
    const forkB = limbTip(mid, angle - degToRad(26), lenPx * 0.28);
    const dA = `M ${anchor.x} ${anchor.y} Q ${mid.x} ${mid.y} ${forkA.x} ${forkA.y}`;
    const dB = `M ${anchor.x} ${anchor.y} Q ${mid.x} ${mid.y} ${forkB.x} ${forkB.y}`;
    return (
      <>
        {strokeTube(dA, w, outline, shade, strokeW)}
        {strokeTube(dB, w, outline, shade, strokeW)}
      </>
    );
  }

  if (limb.family === "tentacle") {
    const wiggle = frame.r * 0.55 * (limb.side === "left" ? 1 : -1);
    const c1 = limbTip(anchor, angle + degToRad(18), lenPx * 0.35);
    const c2 = {
      x: tip.x + frame.n.x * wiggle * 0.35,
      y: tip.y + frame.n.y * wiggle * 0.35,
    };
    const d = `M ${anchor.x} ${anchor.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${tip.x} ${tip.y}`;
    return (
      <>
        {strokeTube(d, w, outline, shade, strokeW)}
        <circle
          cx={tip.x}
          cy={tip.y}
          r={clamp(w * 0.45, 3, 10)}
          fill={accent}
          stroke={outline}
          strokeWidth={strokeW}
        />
      </>
    );
  }

  // stub / claw
  const d = `M ${anchor.x} ${anchor.y} L ${tip.x} ${tip.y}`;
  return (
    <>
      {strokeTube(d, w, outline, shade, strokeW)}
      {limb.family === "claw" ? (
        <path
          d={`M ${tip.x} ${tip.y} L ${tip.x + Math.cos(angle + Math.PI / 2) * w * 0.6} ${
            tip.y + Math.sin(angle + Math.PI / 2) * w * 0.6
          } L ${tip.x + Math.cos(angle - Math.PI / 2) * w * 0.6} ${
            tip.y + Math.sin(angle - Math.PI / 2) * w * 0.6
          } Z`}
          fill={accent}
          stroke={outline}
          strokeWidth={Math.max(2, Math.round(strokeW * 0.6))}
          strokeLinejoin="round"
        />
      ) : null}
    </>
  );
}
