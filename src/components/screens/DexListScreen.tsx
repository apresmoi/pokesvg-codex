import type { Genome } from "@/lib/genome";
import { MonSvg } from "@/lib/genome/render";

type DexListScreenProps = {
  width: number;
  height: number;
  genomes: Genome[];
  selectedIndex: number;
};

export function DexListScreen({
  width,
  height,
  genomes,
  selectedIndex,
}: DexListScreenProps) {
  const pad = 12;
  const headerH = 30;
  const contentTop = pad + headerH + 10;
  const footerH = 18;
  // Fit ~3 rows in the default screen viewport (240px tall).
  const rowH = 52;
  const listH = height - contentTop - footerH - pad;
  const visibleRows = Math.max(1, Math.floor(listH / rowH));
  const maxStart = Math.max(0, genomes.length - visibleRows);
  const startRow = Math.min(
    maxStart,
    Math.max(0, selectedIndex - Math.floor(visibleRows / 2)),
  );
  const endRow = Math.min(genomes.length, startRow + visibleRows);
  const visibleGenomes = genomes.slice(startRow, endRow);

  return (
    <g>
      {/* Header bar */}
      <rect
        x={0}
        y={0}
        width={width}
        height={pad + headerH}
        fill="#000"
        opacity="0.25"
      />
      <path
        d={`M 0 ${pad + headerH} H ${width}`}
        stroke="#111827"
        strokeWidth="2"
        opacity="0.9"
      />

      <text
        x={pad}
        y={pad + 12}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontSize="12"
        fill="#a7f3d0"
      >
        DEX LIST
      </text>

      <text
        x={width - pad}
        y={pad + 12}
        textAnchor="end"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontSize="12"
        fill="#6ee7b7"
        opacity="0.9"
      >
        {genomes.length.toString().padStart(3, "0")} MONS
      </text>

      {genomes.length === 0 ? (
        <text
          x={pad}
          y={pad + headerH + 34}
          fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
          fontSize="12"
          fill="#9ca3af"
        >
          EMPTY - PRESS DISCOVER
        </text>
      ) : null}

      <g transform={`translate(${pad}, ${contentTop})`}>
        <g transform={`translate(0, ${-startRow * rowH})`}>
          {visibleGenomes.map((g, i) => {
            const idx = startRow + i;
            const y = idx * rowH;
            const isSelected = idx === selectedIndex;

            return (
              <g key={g.id} transform={`translate(0, ${y})`}>
                {isSelected ? (
                  <rect
                    x={-6}
                    y={-10}
                    width={width - pad * 2 + 12}
                    height={rowH - 6}
                    rx={6}
                    fill="#0f2f25"
                    stroke="#34d399"
                    strokeOpacity="0.8"
                  />
                ) : null}
                <g transform="translate(2, -12)">
                  <MonSvg genome={g} width={38} height={38} />
                </g>
                <text
                  x={48}
                  y={6}
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                  fontSize="12"
                  fill={isSelected ? "#d1fae5" : "#9ca3af"}
                >
                  {String(idx + 1).padStart(3, "0")} {g.meta.name}
                </text>
                <text
                  x={48}
                  y={22}
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                  fontSize="11"
                  fill={isSelected ? "#a7f3d0" : "#6b7280"}
                  opacity={0.95}
                >
                  {g.plan.toUpperCase()} {g.spine.curve.toUpperCase()} S
                  {g.spine.points.length} {g.head.family.toUpperCase()} #
                  {(g.seed >>> 0).toString(16).padStart(8, "0")}
                </text>
              </g>
            );
          })}
        </g>
      </g>

      <g opacity="0.35">
        <path
          d={`M ${width - 18} ${height + 20} L ${width + 40} ${height - 40}`}
          stroke="#93c5fd"
          strokeWidth="40"
          strokeLinecap="round"
        />
      </g>

      {/* Scroll indicator */}
      {genomes.length > visibleRows ? (
        <g>
          <rect
            x={width - 8}
            y={contentTop}
            width={4}
            height={listH}
            rx={2}
            fill="#111827"
          />
          <rect
            x={width - 8}
            y={
              contentTop +
              (listH * startRow) / Math.max(1, genomes.length - visibleRows)
            }
            width={4}
            height={(listH * visibleRows) / genomes.length}
            rx={2}
            fill="#34d399"
            opacity="0.65"
          />
        </g>
      ) : null}

      <text
        x={pad}
        y={height - 10}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontSize="11"
        fill="#6b7280"
      >
        UP/DN: MOVE RIGHT/A: OPEN
      </text>
    </g>
  );
}
