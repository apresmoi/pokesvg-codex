import { makeBlobPath } from "./blobPath";
import type { Genome } from "../types";

type MonSvgProps = {
  genome: Genome;
  width: number;
  height: number;
};

function distribute(count: number, span: number) {
  if (count <= 1) return [0];
  const out: number[] = [];
  for (let i = 0; i < count; i++) {
    out.push(-span / 2 + (span * i) / (count - 1));
  }
  return out;
}

export function MonSvg({ genome, width, height }: MonSvgProps) {
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

  const headCx =
    genome.plan === "serpentine" ? bodyCx - bodyW * 0.28 : bodyCx;
  const headCy =
    bodyCy - bodyH / 2 - headH / 2 + (genome.plan === "serpentine" ? 20 : 24);

  const headPath = makeBlobPath(
    headCx,
    headCy,
    headW,
    headH,
    genome.head.shape.jitter,
  );

  const outline = genome.palette.outline;
  const base = genome.palette.base;
  const shade = genome.palette.shade;
  const accent = genome.palette.accent;
  const eye = genome.palette.eye;

  const strokeW = 5;
  const bodyClipId = `mon-${genome.id}-body-clip`;
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

  const hasLeftArm = armCount === 2 || (armCount === 1 && (genome.seed & 1) === 0);
  const hasRightArm = armCount === 2 || (armCount === 1 && (genome.seed & 1) === 1);

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

  const headLeft = headCx - headW / 2;
  const headTop = headCy - headH / 2;

  const eyeY = headTop + headH * 0.48;
  const eyeSpacing = genome.face.eyeSpacing * headW;
  const eyeSize = genome.face.eyeSize * headW;

  const eyeXs =
    genome.face.eyeCount === 1
      ? [headCx]
      : genome.face.eyeCount === 2
        ? [headCx - eyeSpacing / 2, headCx + eyeSpacing / 2]
        : distribute(genome.face.eyeCount, eyeSpacing * 1.35).map((dx) => headCx + dx);

  const mouthY = headTop + headH * 0.7;
  const mouthW = Math.max(16, headW * 0.26);

  const mouthD =
    genome.face.mouthType === "smile"
      ? `M ${headCx - mouthW / 2} ${mouthY} C ${headCx - mouthW / 4} ${
          mouthY + 10
        }, ${headCx + mouthW / 4} ${mouthY + 10}, ${headCx + mouthW / 2} ${mouthY}`
      : genome.face.mouthType === "frown"
        ? `M ${headCx - mouthW / 2} ${mouthY + 8} C ${headCx - mouthW / 4} ${
            mouthY - 4
          }, ${headCx + mouthW / 4} ${mouthY - 4}, ${headCx + mouthW / 2} ${mouthY + 8}`
        : `M ${headCx - 10} ${mouthY - 4} L ${headCx + 10} ${mouthY - 4} L ${headCx} ${
            mouthY + 10
          } Z`;

  return (
    <svg
      viewBox={`0 0 ${vb} ${vb}`}
      width={width}
      height={height}
      style={{ overflow: "visible" }}
    >
      <defs>
        <clipPath id={bodyClipId}>
          <path d={bodyPath} />
        </clipPath>
      </defs>

      <g>
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
                  const x = bodyCx - (bodyW * 0.62) + gap * (i + 1);
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

        {/* Head */}
        <path d={headPath} fill={base} stroke={outline} strokeWidth={strokeW} />

        {/* Ears */}
        {genome.head.earType !== "none" ? (
          genome.head.earType === "pointy" ? (
            <>
              <path
                d={`M ${headLeft + headW * 0.18} ${headTop + 16} L ${
                  headLeft + headW * 0.05
                } ${headTop - 14} L ${headLeft + headW * 0.28} ${
                  headTop + 6
                } Z`}
                fill={accent}
                stroke={outline}
                strokeWidth={strokeW}
                strokeLinejoin="round"
              />
              <path
                d={`M ${headLeft + headW * 0.82} ${headTop + 16} L ${
                  headLeft + headW * 0.95
                } ${headTop - 14} L ${headLeft + headW * 0.72} ${
                  headTop + 6
                } Z`}
                fill={accent}
                stroke={outline}
                strokeWidth={strokeW}
                strokeLinejoin="round"
              />
            </>
          ) : (
            <>
              <circle
                cx={headLeft + headW * 0.18}
                cy={headTop + 10}
                r={12}
                fill={accent}
                stroke={outline}
                strokeWidth={strokeW}
              />
              <circle
                cx={headLeft + headW * 0.82}
                cy={headTop + 10}
                r={12}
                fill={accent}
                stroke={outline}
                strokeWidth={strokeW}
              />
            </>
          )
        ) : null}

        {/* Horns */}
        {genome.head.hornCount > 0 ? (
          <g>
            {Array.from({ length: genome.head.hornCount }).map((_, i) => {
              const x =
                genome.head.hornCount === 1
                  ? headCx
                  : i === 0
                    ? headCx - headW * 0.18
                    : headCx + headW * 0.18;
              return (
                <path
                  key={i}
                  d={`M ${x} ${headTop + 8} L ${x - 10} ${headTop - 18} L ${x + 10} ${
                    headTop - 18
                  } Z`}
                  fill={shade}
                  stroke={outline}
                  strokeWidth={strokeW}
                  strokeLinejoin="round"
                />
              );
            })}
          </g>
        ) : null}

        {/* Eyes */}
        <g>
          {eyeXs.map((x, i) => {
            if (genome.face.eyeType === "dot") {
              return (
                <g key={i}>
                  <circle cx={x} cy={eyeY} r={eyeSize * 0.42} fill={eye} />
                  <circle cx={x + eyeSize * 0.12} cy={eyeY + 1} r={eyeSize * 0.16} fill={outline} />
                </g>
              );
            }

            if (genome.face.eyeType === "slit") {
              return (
                <g key={i}>
                  <ellipse
                    cx={x}
                    cy={eyeY}
                    rx={eyeSize * 0.6}
                    ry={eyeSize * 0.2}
                    fill={eye}
                  />
                  <ellipse
                    cx={x + eyeSize * 0.1}
                    cy={eyeY}
                    rx={eyeSize * 0.22}
                    ry={eyeSize * 0.12}
                    fill={outline}
                  />
                </g>
              );
            }

            return (
              <g key={i}>
                <ellipse
                  cx={x}
                  cy={eyeY}
                  rx={eyeSize * 0.62}
                  ry={eyeSize * 0.42}
                  fill={eye}
                />
                <circle cx={x + eyeSize * 0.1} cy={eyeY + 1} r={eyeSize * 0.18} fill={outline} />
              </g>
            );
          })}
        </g>

        {/* Mouth */}
        {genome.face.mouthType === "beak" ? (
          <path d={mouthD} fill={accent} stroke={outline} strokeWidth={strokeW} strokeLinejoin="round" />
        ) : (
          <path
            d={mouthD}
            fill="none"
            stroke={outline}
            strokeWidth={strokeW}
            strokeLinecap="round"
          />
        )}

        {/* Fangs */}
        {genome.face.fangs > 0 ? (
          <g>
            {Array.from({ length: genome.face.fangs }).map((_, i) => {
              const x = genome.face.fangs === 1 ? headCx : i === 0 ? headCx - 10 : headCx + 10;
              const y = mouthY + 2;
              return (
                <path
                  key={i}
                  d={`M ${x} ${y} L ${x - 6} ${y + 12} L ${x + 6} ${y + 12} Z`}
                  fill={eye}
                  stroke={outline}
                  strokeWidth={3}
                  strokeLinejoin="round"
                />
              );
            })}
          </g>
        ) : null}

        {/* Little shadow line */}
        <path
          d={bodyPath}
          fill="none"
          stroke={shade}
          strokeOpacity="0.25"
          strokeWidth={strokeW}
          transform={`translate(0, ${Math.round(bodyH * 0.06)})`}
        />
      </g>
    </svg>
  );
}
