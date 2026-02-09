import type { Genome } from "../../types";

type MonBodyProps = {
  genome: Genome;
  strokeW: number;
  bodyClipId: string;
  bodyCx: number;
  bodyCy: number;
  bodyW: number;
  bodyH: number;
  bodyPath: string;
};

function distribute(count: number, span: number) {
  if (count <= 1) return [0];
  const out: number[] = [];
  for (let i = 0; i < count; i++) {
    out.push(-span / 2 + (span * i) / (count - 1));
  }
  return out;
}

export function MonBody({
  genome,
  strokeW,
  bodyClipId,
  bodyCx,
  bodyCy,
  bodyW,
  bodyH,
  bodyPath,
}: MonBodyProps) {
  const outline = genome.palette.outline;
  const base = genome.palette.base;
  const shade = genome.palette.shade;
  const accent = genome.palette.accent;
  const eye = genome.palette.eye;

  const pattern = genome.body.pattern;

  const legCount = genome.limbs.legs;
  const legXs = distribute(legCount, bodyW * 0.8);
  const legH = Math.max(18, Math.round(bodyH * 0.22));
  const legW = Math.max(10, Math.round(bodyW * 0.1));
  const legY = bodyCy + bodyH * 0.22;

  const armCount = genome.limbs.arms;
  const armSpan = bodyW * 0.55;
  const armW = Math.max(10, Math.round(bodyW * 0.1));
  const armL = Math.max(18, Math.round(bodyH * 0.18));
  const armY = bodyCy - bodyH * 0.15;

  const hasLeftArm =
    armCount === 2 || (armCount === 1 && (genome.seed & 1) === 0);
  const hasRightArm =
    armCount === 2 || (armCount === 1 && (genome.seed & 1) === 1);

  const tailAnchorX = bodyCx + bodyW * 0.48;
  const tailAnchorY = bodyCy + bodyH * 0.06;
  const tailTipX = tailAnchorX + bodyW * 0.55;
  const tailTipY = tailAnchorY + bodyH * 0.25;
  const tailW = Math.max(10, Math.round(bodyW * 0.08));
  const tailD = `M ${tailAnchorX} ${tailAnchorY} C ${
    tailAnchorX + bodyW * 0.25
  } ${tailAnchorY - bodyH * 0.12}, ${tailTipX - bodyW * 0.18} ${
    tailTipY + bodyH * 0.1
  }, ${tailTipX} ${tailTipY}`;

  const wing = genome.limbs.wingType;
  const wingSize = wing === "big" ? 52 : 36;
  const wingY = bodyCy - bodyH * 0.12;
  const wingX = bodyCx + bodyW * 0.28;
  const wingPath = `M ${wingX} ${wingY} C ${wingX + wingSize} ${
    wingY - wingSize * 0.6
  }, ${wingX + wingSize} ${wingY + wingSize * 0.6}, ${wingX} ${
    wingY + wingSize
  } C ${wingX - wingSize * 0.45} ${wingY + wingSize * 0.5}, ${
    wingX - wingSize * 0.45
  } ${wingY - wingSize * 0.2}, ${wingX} ${wingY} Z`;

  return (
    <>
      {/* Wings behind body */}
      {wing !== "none" ? (
        <g opacity="0.95">
          <path d={wingPath} fill={accent} stroke={outline} strokeWidth={strokeW} />
          <path
            d={wingPath}
            fill="none"
            stroke={eye}
            strokeOpacity="0.22"
            strokeWidth={2}
          />
        </g>
      ) : null}

      {/* Tail behind body */}
      {genome.limbs.tail ? (
        <>
          <path
            d={tailD}
            fill="none"
            stroke={outline}
            strokeWidth={tailW + 6}
            strokeLinecap="round"
          />
          <path
            d={tailD}
            fill="none"
            stroke={base}
            strokeWidth={tailW}
            strokeLinecap="round"
          />
        </>
      ) : null}

      {/* Legs behind body */}
      <g>
        {legXs.map((dx, i) => (
          <rect
            key={i}
            x={bodyCx + dx - legW / 2}
            y={legY}
            width={legW}
            height={legH}
            rx={legW / 2}
            fill={shade}
            stroke={outline}
            strokeWidth={strokeW}
          />
        ))}
      </g>

      {/* Arms behind body */}
      <g>
        {hasLeftArm ? (
          <g transform={`rotate(-18 ${bodyCx - armSpan} ${armY})`}>
            <rect
              x={bodyCx - armSpan - armL}
              y={armY}
              width={armL}
              height={armW}
              rx={armW / 2}
              fill={shade}
              stroke={outline}
              strokeWidth={strokeW}
            />
          </g>
        ) : null}
        {hasRightArm ? (
          <g transform={`rotate(18 ${bodyCx + armSpan} ${armY})`}>
            <rect
              x={bodyCx + armSpan}
              y={armY}
              width={armL}
              height={armW}
              rx={armW / 2}
              fill={shade}
              stroke={outline}
              strokeWidth={strokeW}
            />
          </g>
        ) : null}
      </g>

      {/* Body */}
      <path d={bodyPath} fill={base} stroke={outline} strokeWidth={strokeW} />

      {/* Patterns */}
      {pattern.kind !== "none" ? (
        <g clipPath={`url(#${bodyClipId})`} opacity="0.35">
          {pattern.kind === "spots"
            ? pattern.spots.map((s, i) => {
                const r = s.r * Math.min(bodyW, bodyH) * 0.5;
                return (
                  <circle
                    key={i}
                    cx={bodyCx + s.x * (bodyW * 0.48)}
                    cy={bodyCy + s.y * (bodyH * 0.48)}
                    r={r}
                    fill={accent}
                  />
                );
              })
            : null}

          {pattern.kind === "stripes" ? (
            <g transform={`rotate(${pattern.angleDeg} ${bodyCx} ${bodyCy})`}>
              {Array.from({ length: pattern.count }).map((_, i) => {
                const gap = (bodyW * 1.25) / (pattern.count + 1);
                const x = bodyCx - bodyW * 0.62 + gap * (i + 1);
                return (
                  <rect
                    key={i}
                    x={x - pattern.width / 2}
                    y={bodyCy - bodyH}
                    width={pattern.width}
                    height={bodyH * 2}
                    fill={accent}
                  />
                );
              })}
            </g>
          ) : null}
        </g>
      ) : null}

      {/* Belly patch */}
      {genome.body.belly ? (
        <ellipse
          cx={bodyCx}
          cy={bodyCy + bodyH * 0.12}
          rx={bodyW * 0.22}
          ry={bodyH * 0.18}
          fill={eye}
          opacity="0.18"
        />
      ) : null}
    </>
  );
}

