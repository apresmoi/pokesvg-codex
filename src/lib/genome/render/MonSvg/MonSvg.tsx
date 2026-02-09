import type { CSSProperties } from "react";

import type { Genome } from "../../types";
import { makeBlobPath } from "../blobPath";

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

  const bodyW = genome.body.shape.width;
  const bodyH = genome.body.shape.height;
  const headW = genome.head.shape.width;
  const headH = genome.head.shape.height;

  const bodyCx = 128;
  const bodyCy = genome.plan === "serpentine" ? 170 : 168;

  const bodyPath = makeBlobPath(
    bodyCx,
    bodyCy,
    bodyW,
    bodyH,
    genome.body.shape.jitter,
  );

  const headCx = genome.plan === "serpentine" ? bodyCx - bodyW * 0.28 : bodyCx;
  const headCy =
    bodyCy - bodyH / 2 - headH / 2 + (genome.plan === "serpentine" ? 20 : 24);

  const headPath = makeBlobPath(
    headCx,
    headCy,
    headW,
    headH,
    genome.head.shape.jitter,
  );

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
          strokeW={strokeW}
          bodyClipId={bodyClipId}
          bodyCx={bodyCx}
          bodyCy={bodyCy}
          bodyW={bodyW}
          bodyH={bodyH}
          bodyPath={bodyPath}
        />

        <MonHead
          genome={genome}
          strokeW={strokeW}
          headCx={headCx}
          headCy={headCy}
          headW={headW}
          headH={headH}
          headPath={headPath}
          animate={animate}
        />

        {/* Little shadow line */}
        <path
          d={bodyPath}
          fill="none"
          stroke={genome.palette.shade}
          strokeOpacity="0.25"
          strokeWidth={strokeW}
          transform={`translate(0, ${Math.round(bodyH * 0.06)})`}
        />
      </g>
    </svg>
  );
}
