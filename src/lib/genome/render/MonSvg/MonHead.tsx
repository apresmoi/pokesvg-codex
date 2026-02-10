import type { CSSProperties } from "react";

import { createPrng } from "@/lib/prng";

import type { Genome } from "../../types";
import { makeBlobPath } from "../blobPath";
import type { SpineFrame } from "../tubePath";

type MonHeadProps = {
  genome: Genome;
  frames: SpineFrame[];
  strokeW: number;
  animate: boolean;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function distribute(count: number, span: number) {
  if (count <= 1) return [0];
  const out: number[] = [];
  for (let i = 0; i < count; i++)
    out.push(-span / 2 + (span * i) / (count - 1));
  return out;
}

function makeHeadJitter(family: Genome["head"]["family"], seed: number) {
  const prng = createPrng((seed ^ 0x2c1b3c6d) >>> 0);

  const k = family === "angular" ? 8 : family === "star" ? 12 : 10;
  const jitter: number[] = [];

  for (let i = 0; i < k; i++) {
    const noise = 1 + (prng.nextFloat() - 0.5) * 0.16;

    if (family === "round") {
      jitter.push(1 * noise);
      continue;
    }

    if (family === "angular") {
      jitter.push((i % 2 === 0 ? 0.78 : 1.22) * noise);
      continue;
    }

    if (family === "flat") {
      jitter.push((0.92 + (i % 2 === 0 ? 0.06 : -0.06)) * noise);
      continue;
    }

    if (family === "star") {
      jitter.push((i % 2 === 0 ? 1.5 : 0.64) * noise);
      continue;
    }

    // pointed
    if (i === 0) jitter.push((1.55 + prng.nextFloat() * 0.35) * noise);
    else if (i === 1 || i === k - 1) jitter.push(1.18 * noise);
    else if (i === Math.floor(k / 2)) jitter.push(0.78 * noise);
    else jitter.push(0.98 * noise);
  }

  return jitter;
}

export function MonHead({ genome, frames, strokeW, animate }: MonHeadProps) {
  const headFrame = frames[frames.length - 1];
  if (!headFrame) return null;

  const accessory = genome.accessory;
  const outline = genome.palette.outline;
  const base = genome.palette.base;
  const shade = genome.palette.shade;
  const accent = genome.palette.accent;
  const eye = genome.palette.eye;

  const headCx = headFrame.p.x + headFrame.t.x * headFrame.r * 0.75;
  const headCy = headFrame.p.y + headFrame.t.y * headFrame.r * 0.75;
  const headW = clamp(headFrame.r * 2 * genome.head.size, 52, 190);
  const headH = clamp(headW * genome.head.aspect, 42, 190);

  const headLeft = headCx - headW / 2;
  const headTop = headCy - headH / 2;

  const facingDeg = (Math.atan2(headFrame.t.y, headFrame.t.x) * 180) / Math.PI;
  const headRot = facingDeg + genome.head.tiltDeg;

  const headPath = makeBlobPath(
    headCx,
    headCy,
    headW,
    headH,
    makeHeadJitter(genome.head.family, genome.seed),
  );

  const eyeY = headTop + headH * 0.48;
  const eyeSpacing = genome.face.eyeSpacing * headW;
  const eyeSize = genome.face.eyeSize * headW;

  const eyeXs =
    genome.face.eyeCount === 1
      ? [headCx]
      : genome.face.eyeCount === 2
        ? [headCx - eyeSpacing / 2, headCx + eyeSpacing / 2]
        : distribute(genome.face.eyeCount, eyeSpacing * 1.35).map(
            (dx) => headCx + dx,
          );

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

  const swayStyle = animate
    ? ({
        ["--swing-amp" as never]: `${clamp(headW * 0.015, 1.5, 4.5)}deg`,
        animationDuration: `${clamp(genome.anim.bobMs * 1.05, 900, 2400)}ms`,
        animationDelay: `${(((genome.seed >>> 0) ^ 0x1f4a7c15) % 900) * -1}ms`,
      } as CSSProperties)
    : undefined;

  return (
    <g transform={`translate(${headCx} ${headCy})`}>
      <g className={animate ? "mon-swing" : undefined} style={swayStyle}>
        <g transform={`translate(${-headCx} ${-headCy})`}>
          <g transform={`rotate(${headRot} ${headCx} ${headCy})`}>
            {/* Head */}
            <path
              d={headPath}
              fill={base}
              stroke={outline}
              strokeWidth={strokeW}
            />

            {/* Ears */}
            {genome.head.earType !== "none" ? (
              genome.head.earType === "pointy" ? (
                <>
                  <path
                    d={`M ${headLeft + headW * 0.18} ${
                      headTop + headH * 0.22
                    } L ${headLeft + headW * 0.05} ${headTop - headH * 0.12} L ${
                      headLeft + headW * 0.28
                    } ${headTop + headH * 0.12} Z`}
                    fill={accent}
                    stroke={outline}
                    strokeWidth={strokeW}
                    strokeLinejoin="round"
                  />
                  <path
                    d={`M ${headLeft + headW * 0.82} ${
                      headTop + headH * 0.22
                    } L ${headLeft + headW * 0.95} ${headTop - headH * 0.12} L ${
                      headLeft + headW * 0.72
                    } ${headTop + headH * 0.12} Z`}
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
                    cy={headTop + headH * 0.18}
                    r={Math.max(10, Math.round(headW * 0.09))}
                    fill={accent}
                    stroke={outline}
                    strokeWidth={strokeW}
                  />
                  <circle
                    cx={headLeft + headW * 0.82}
                    cy={headTop + headH * 0.18}
                    r={Math.max(10, Math.round(headW * 0.09))}
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
                      key={`horn-${i}`}
                      d={`M ${x} ${headTop + headH * 0.1} L ${x - headW * 0.08} ${
                        headTop - headH * 0.16
                      } L ${x + headW * 0.08} ${headTop - headH * 0.16} Z`}
                      fill={shade}
                      stroke={outline}
                      strokeWidth={strokeW}
                      strokeLinejoin="round"
                    />
                  );
                })}
              </g>
            ) : null}

            {/* Accessories (head-mounted) */}
            {accessory.kind === "gem" ? (
              <path
                d={`M ${headCx} ${headTop + headH * 0.16} L ${
                  headCx - Math.max(10, Math.round(headW * 0.08))
                } ${headTop + headH * 0.24} L ${headCx} ${headTop + headH * 0.32} L ${
                  headCx + Math.max(10, Math.round(headW * 0.08))
                } ${headTop + headH * 0.24} Z`}
                fill={accent}
                stroke={outline}
                strokeWidth={strokeW}
                strokeLinejoin="round"
                opacity="0.95"
              />
            ) : null}

            {accessory.kind === "antenna" ? (
              <g opacity="0.95">
                {Array.from({ length: accessory.count }).map((_, i) => {
                  const dx =
                    accessory.count === 1
                      ? 0
                      : i === 0
                        ? -headW * 0.14
                        : headW * 0.14;
                  const x = headCx + dx;
                  const y0 = headTop + headH * 0.08;
                  const y1 = headTop - headH * 0.18;
                  return (
                    <g key={`ant-${i}`}>
                      <path
                        d={`M ${x} ${y0} C ${x + dx * 0.12} ${(y0 + y1) / 2} ${x} ${y1} ${x} ${y1}`}
                        fill="none"
                        stroke={accent}
                        strokeWidth={Math.max(4, Math.round(strokeW * 0.9))}
                        strokeLinecap="round"
                      />
                      <circle
                        cx={x}
                        cy={y1}
                        r={Math.max(6, Math.round(headW * 0.045))}
                        fill={eye}
                        stroke={outline}
                        strokeWidth={strokeW}
                      />
                    </g>
                  );
                })}
              </g>
            ) : null}

            {/* Eyes */}
            <g>
              {eyeXs.map((x, i) => {
                const blinkStyle = animate
                  ? ({
                      animationDuration: `${genome.anim.blinkMs}ms`,
                      animationDelay: `${((genome.seed >>> 0) % 1200) + i * 120}ms`,
                    } as CSSProperties)
                  : undefined;

                if (genome.face.eyeType === "dot") {
                  return (
                    <g
                      key={`eye-${i}`}
                      className={animate ? "mon-blink" : undefined}
                      style={blinkStyle}
                    >
                      <circle cx={x} cy={eyeY} r={eyeSize * 0.42} fill={eye} />
                      <circle
                        cx={x + eyeSize * 0.12}
                        cy={eyeY + 1}
                        r={eyeSize * 0.16}
                        fill={outline}
                      />
                    </g>
                  );
                }

                if (genome.face.eyeType === "slit") {
                  return (
                    <g
                      key={`eye-${i}`}
                      className={animate ? "mon-blink" : undefined}
                      style={blinkStyle}
                    >
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
                  <g
                    key={`eye-${i}`}
                    className={animate ? "mon-blink" : undefined}
                    style={blinkStyle}
                  >
                    <ellipse
                      cx={x}
                      cy={eyeY}
                      rx={eyeSize * 0.62}
                      ry={eyeSize * 0.42}
                      fill={eye}
                    />
                    <circle
                      cx={x + eyeSize * 0.1}
                      cy={eyeY + 1}
                      r={eyeSize * 0.18}
                      fill={outline}
                    />
                  </g>
                );
              })}
            </g>

            {/* Mouth */}
            {genome.face.mouthType === "beak" ? (
              <path
                d={mouthD}
                fill={accent}
                stroke={outline}
                strokeWidth={strokeW}
                strokeLinejoin="round"
              />
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
                  const x =
                    genome.face.fangs === 1
                      ? headCx
                      : i === 0
                        ? headCx - 10
                        : headCx + 10;
                  const y = mouthY + 2;
                  return (
                    <path
                      key={`fang-${i}`}
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
          </g>
        </g>
      </g>
    </g>
  );
}
