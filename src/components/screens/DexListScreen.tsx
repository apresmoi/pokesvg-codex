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
  const headerH = 28;
  const footerH = 18;
  const rowH = 54;
  const listH = height - pad * 2 - headerH - footerH;
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
      <rect x={0} y={0} width={width} height={height} fill="#0b1110" />

      <text
        x={pad}
        y={pad + 10}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontSize="12"
        fill="#a7f3d0"
      >
        DEX LIST
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

      <g transform={`translate(${pad}, ${pad + headerH})`}>
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
                    y={-16}
                    width={width - pad * 2 + 12}
                    height={rowH - 6}
                    rx={6}
                    fill="#113b2e"
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
                  {g.plan.toUpperCase()} {g.id}
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
            y={pad + headerH}
            width={4}
            height={listH}
            rx={2}
            fill="#111827"
          />
          <rect
            x={width - 8}
            y={
              pad +
              headerH +
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
    </g>
  );
}
