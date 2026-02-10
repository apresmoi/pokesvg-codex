import type { CSSProperties } from "react";

import type { Genome } from "../../types";
import type { SpineFrame } from "../tubePath";

import { clamp } from "./monMath";

type MonTailProps = {
  genome: Genome;
  strokeW: number;
  baseFrame: SpineFrame;
  animate: boolean;
};

export function MonTail({ genome, strokeW, baseFrame, animate }: MonTailProps) {
  if (genome.tail.family === "none") return null;

  const outline = genome.palette.outline;
  const base = genome.palette.base;
  const accent = genome.palette.accent;

  const dir = { x: -baseFrame.t.x, y: -baseFrame.t.y };
  const start = {
    x: baseFrame.p.x + dir.x * baseFrame.r * 0.75,
    y: baseFrame.p.y + dir.y * baseFrame.r * 0.75,
  };
  const len = clamp(baseFrame.r * genome.tail.length * 1.55, 18, 150);
  const end = { x: start.x + dir.x * len, y: start.y + dir.y * len };
  const curl = genome.tail.curl;
  const c1 = {
    x: start.x + dir.x * len * 0.35 + baseFrame.n.x * curl * baseFrame.r * 0.55,
    y: start.y + dir.y * len * 0.35 + baseFrame.n.y * curl * baseFrame.r * 0.55,
  };
  const c2 = {
    x: start.x + dir.x * len * 0.75 + baseFrame.n.x * curl * baseFrame.r * 0.35,
    y: start.y + dir.y * len * 0.75 + baseFrame.n.y * curl * baseFrame.r * 0.35,
  };
  const d = `M ${start.x} ${start.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${end.x} ${end.y}`;

  const w = clamp(baseFrame.r * 0.42, 8, 24);

  const swingStyle = animate
    ? ({
        ["--swing-amp" as never]: `${clamp(baseFrame.r * 0.08, 2, 6)}deg`,
        animationDuration: `${clamp(genome.anim.bobMs * 1.15, 900, 2200)}ms`,
        animationDelay: `${((genome.seed >>> 0) % 700) * -1}ms`,
      } as CSSProperties)
    : undefined;

  return (
    <g transform={`translate(${start.x} ${start.y})`}>
      <g className={animate ? "mon-swing" : undefined} style={swingStyle}>
        <g transform={`translate(${-start.x} ${-start.y})`}>
          <path
            d={d}
            fill="none"
            stroke={outline}
            strokeWidth={w + 6}
            strokeLinecap="round"
          />
          <path
            d={d}
            fill="none"
            stroke={base}
            strokeWidth={w}
            strokeLinecap="round"
          />

          {genome.tail.family === "club" ? (
            <circle
              cx={end.x}
              cy={end.y}
              r={clamp(w * 0.85, 8, 18)}
              fill={accent}
              stroke={outline}
              strokeWidth={strokeW}
            />
          ) : null}

          {genome.tail.family === "leaf" ? (
            <ellipse
              cx={end.x}
              cy={end.y}
              rx={clamp(w * 1.15, 10, 22)}
              ry={clamp(w * 1.8, 14, 34)}
              fill={accent}
              stroke={outline}
              strokeWidth={strokeW}
              transform={`rotate(-18 ${end.x} ${end.y})`}
            />
          ) : null}

          {genome.tail.family === "stinger" ? (
            <path
              d={`M ${end.x} ${end.y} L ${end.x + dir.x * w * 1.3} ${
                end.y + dir.y * w * 1.3
              } L ${end.x + baseFrame.n.x * w * 0.7} ${
                end.y + baseFrame.n.y * w * 0.7
              } Z`}
              fill={accent}
              stroke={outline}
              strokeWidth={strokeW}
              strokeLinejoin="round"
            />
          ) : null}
        </g>
      </g>
    </g>
  );
}
