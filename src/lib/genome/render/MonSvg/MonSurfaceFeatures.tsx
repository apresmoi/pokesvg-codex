import { createPrng } from "@/lib/prng";

import type { Genome } from "../../types";
import type { SpineFrame } from "../tubePath";

import { clamp } from "./monMath";

type MonSurfaceFeaturesProps = {
  genome: Genome;
  frames: SpineFrame[];
  strokeW: number;
};

export function MonSurfaceFeatures({
  genome,
  frames,
  strokeW,
}: MonSurfaceFeaturesProps) {
  if (genome.surface.placements.length === 0) return null;

  const outline = genome.palette.outline;
  const accent = genome.palette.accent;
  const shade = genome.palette.shade;

  const prng = createPrng((genome.seed ^ 0x51c0ffee) >>> 0);

  return (
    <g opacity="0.95">
      {genome.surface.placements.flatMap((pl, i) => {
        const f = frames[clamp(pl.segment, 0, frames.length - 1)];
        if (!f) return [];
        const sideSign = pl.side === "dorsal" ? 1 : -1;
        const base = {
          x: f.p.x + f.n.x * f.r * 0.98 * sideSign,
          y: f.p.y + f.n.y * f.r * 0.98 * sideSign,
        };

        const step = f.r * 0.55;
        const items: JSX.Element[] = [];
        for (let j = 0; j < pl.count; j++) {
          const t = pl.count <= 1 ? 0 : j - (pl.count - 1) / 2;
          const pos = {
            x: base.x + f.t.x * t * step,
            y: base.y + f.t.y * t * step,
          };
          const size = clamp(
            f.r * 0.22 * pl.scale * (0.75 + prng.nextFloat() * 0.6),
            4,
            34,
          );
          const dir = { x: f.n.x * sideSign, y: f.n.y * sideSign };

          if (pl.family === "bumps") {
            items.push(
              <circle
                key={`${i}-${j}`}
                cx={pos.x}
                cy={pos.y}
                r={size * 0.65}
                fill={shade}
                stroke={outline}
                strokeWidth={Math.max(2, Math.round(strokeW * 0.7))}
              />,
            );
            continue;
          }

          if (pl.family === "crystals") {
            const tip = {
              x: pos.x + dir.x * size * 1.8,
              y: pos.y + dir.y * size * 1.8,
            };
            const left = {
              x: pos.x + f.t.x * size * 0.7,
              y: pos.y + f.t.y * size * 0.7,
            };
            const right = {
              x: pos.x - f.t.x * size * 0.7,
              y: pos.y - f.t.y * size * 0.7,
            };
            const basePt = {
              x: pos.x - dir.x * size * 0.35,
              y: pos.y - dir.y * size * 0.35,
            };
            items.push(
              <path
                key={`${i}-${j}`}
                d={`M ${basePt.x} ${basePt.y} L ${left.x} ${left.y} L ${tip.x} ${tip.y} L ${right.x} ${right.y} Z`}
                fill={accent}
                stroke={outline}
                strokeWidth={strokeW}
                strokeLinejoin="round"
              />,
            );
            continue;
          }

          if (pl.family === "ridges") {
            const ridgeLen = size * 1.6;
            const ridgeW = clamp(size * 0.55, 3, 14);
            const tip = {
              x: pos.x + dir.x * ridgeLen,
              y: pos.y + dir.y * ridgeLen,
            };
            const d = `M ${pos.x} ${pos.y} L ${tip.x} ${tip.y}`;
            items.push(
              <path
                key={`${i}-${j}-o`}
                d={d}
                fill="none"
                stroke={outline}
                strokeWidth={ridgeW + Math.max(4, Math.round(strokeW * 0.7))}
                strokeLinecap="round"
              />,
            );
            items.push(
              <path
                key={`${i}-${j}-i`}
                d={d}
                fill="none"
                stroke={accent}
                strokeWidth={ridgeW}
                strokeLinecap="round"
              />,
            );
            continue;
          }

          // spikes
          const tip = {
            x: pos.x + dir.x * size * 2.0,
            y: pos.y + dir.y * size * 2.0,
          };
          const w = size * 0.8;
          const left = { x: pos.x + f.t.x * w, y: pos.y + f.t.y * w };
          const right = { x: pos.x - f.t.x * w, y: pos.y - f.t.y * w };
          items.push(
            <path
              key={`${i}-${j}`}
              d={`M ${left.x} ${left.y} L ${tip.x} ${tip.y} L ${right.x} ${right.y} Z`}
              fill={accent}
              stroke={outline}
              strokeWidth={strokeW}
              strokeLinejoin="round"
            />,
          );
        }

        return items;
      })}
    </g>
  );
}
