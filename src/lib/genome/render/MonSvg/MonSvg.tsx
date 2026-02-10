import type { CSSProperties } from "react";

import type { Genome } from "../../types";
import { computeSpineFrames, makeTubePath } from "../tubePath";

import { MonBody } from "./MonBody";
import { MonHead } from "./MonHead";

type MonSvgProps = {
  genome: Genome;
  width: number;
  height: number;
  animate?: boolean;
};

export function MonSvg({
  genome,
  width,
  height,
  animate = false,
}: MonSvgProps) {
  const vb = 256;
  const frames = computeSpineFrames(genome.spine.points, genome.spine.radii);
  const bodyPath = makeTubePath(frames);

  const strokeW = 5;
  const bodyClipId = `mon-${genome.id}-body-clip`;

  const bobStyle = animate
    ? ({
        // Implemented in CSS keyframes so SVG stays simple.
        ["--bob-amp" as never]: `${genome.anim.bobAmpPx}px`,
        animationDuration: `${genome.anim.bobMs}ms`,
        animationDelay: `${(genome.seed >>> 0) % 800}ms`,
      } as CSSProperties)
    : undefined;

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${vb} ${vb}`}
      width={width}
      height={height}
      overflow="visible"
    >
      <defs>
        <clipPath id={bodyClipId}>
          <path d={bodyPath} />
        </clipPath>
      </defs>

      <g className={animate ? "mon-bob" : undefined} style={bobStyle}>
        <MonBody
          genome={genome}
          frames={frames}
          strokeW={strokeW}
          bodyClipId={bodyClipId}
          bodyPath={bodyPath}
          animate={animate}
        />

        <MonHead
          genome={genome}
          frames={frames}
          strokeW={strokeW}
          animate={animate}
        />

        {/* Little shadow line */}
        <path
          d={bodyPath}
          fill="none"
          stroke={genome.palette.shade}
          strokeOpacity="0.25"
          strokeWidth={strokeW}
          transform="translate(0, 10)"
        />
      </g>
    </svg>
  );
}
