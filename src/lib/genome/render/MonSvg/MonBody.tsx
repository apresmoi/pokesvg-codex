import type { Genome } from "../../types";
import type { SpineFrame } from "../tubePath";
import { MonLimb } from "./MonLimb";
import { MonSurfaceFeatures } from "./MonSurfaceFeatures";
import { MonTail } from "./MonTail";
import { clamp } from "./monMath";

type MonBodyProps = {
  genome: Genome;
  frames: SpineFrame[];
  strokeW: number;
  bodyClipId: string;
  bodyPath: string;
};

export function MonBody({
  genome,
  frames,
  strokeW,
  bodyClipId,
  bodyPath,
}: MonBodyProps) {
  const outline = genome.palette.outline;
  const base = genome.palette.base;
  const accent = genome.palette.accent;

  const backLimbs = genome.limbs.filter(
    (l) => l.slot === "wing" || l.side === "left",
  );
  const frontLimbs = genome.limbs.filter(
    (l) => l.slot !== "wing" && l.side === "right",
  );

  const neckFrame =
    frames.length >= 2 ? frames[frames.length - 2] : frames[frames.length - 1];
  const collarX = neckFrame ? neckFrame.p.x : 0;
  const collarY = neckFrame ? neckFrame.p.y : 0;
  const collarRx = neckFrame ? neckFrame.r * 0.95 : 0;
  const collarRy = neckFrame ? clamp(neckFrame.r * 0.38, 8, 22) : 0;

  return (
    <>
      {/* Tail behind body */}
      <MonTail genome={genome} strokeW={strokeW} baseFrame={frames[0]} />

      {/* Limbs behind body */}
      <g opacity="0.98">
        {backLimbs.map((limb) => {
          const frame = frames[clamp(limb.segment, 0, frames.length - 1)];
          if (!frame) return null;
          return (
            <MonLimb
              key={`${limb.segment}-${limb.side}-${limb.slot}-${limb.family}-${limb.angleDeg}`}
              genome={genome}
              strokeW={strokeW}
              frame={frame}
              limb={limb}
            />
          );
        })}
      </g>

      {/* Body */}
      <path d={bodyPath} fill={base} stroke={outline} strokeWidth={strokeW} />

      {/* Surface overlays that change silhouette */}
      <MonSurfaceFeatures genome={genome} frames={frames} strokeW={strokeW} />

      {/* Collar accessory */}
      {genome.accessory.kind === "collar" && neckFrame ? (
        <g opacity="0.95" clipPath={`url(#${bodyClipId})`}>
          <ellipse
            cx={collarX}
            cy={collarY}
            rx={collarRx}
            ry={collarRy}
            fill={accent}
            stroke={outline}
            strokeWidth={strokeW}
          />
          <ellipse
            cx={collarX}
            cy={collarY + collarRy * 0.2}
            rx={collarRx * 0.75}
            ry={collarRy * 0.55}
            fill="none"
            stroke={base}
            strokeOpacity="0.18"
            strokeWidth={2}
          />
        </g>
      ) : null}

      {/* Limbs in front */}
      <g opacity="0.98">
        {frontLimbs.map((limb) => {
          const frame = frames[clamp(limb.segment, 0, frames.length - 1)];
          if (!frame) return null;
          return (
            <MonLimb
              key={`${limb.segment}-${limb.side}-${limb.slot}-${limb.family}-${limb.angleDeg}`}
              genome={genome}
              strokeW={strokeW}
              frame={frame}
              limb={limb}
            />
          );
        })}
      </g>
    </>
  );
}
