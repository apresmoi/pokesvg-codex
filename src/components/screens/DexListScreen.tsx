import type { DexListItem } from "./types";

type DexListScreenProps = {
  width: number;
  height: number;
  items: DexListItem[];
  selectedIndex: number;
};

export function DexListScreen({
  width,
  height,
  items,
  selectedIndex,
}: DexListScreenProps) {
  const pad = 12;
  const rowH = 18;

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

      <g transform={`translate(${pad}, ${pad + 22})`}>
        {items.map((it, idx) => {
          const y = idx * rowH;
          const isSelected = idx === selectedIndex;
          return (
            <g key={it.id} transform={`translate(0, ${y})`}>
              {isSelected ? (
                <rect
                  x={-6}
                  y={-12}
                  width={width - pad * 2 + 12}
                  height={rowH}
                  rx={6}
                  fill="#113b2e"
                  stroke="#34d399"
                  strokeOpacity="0.8"
                />
              ) : null}
              <text
                x={0}
                y={0}
                fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                fontSize="12"
                fill={isSelected ? "#d1fae5" : "#9ca3af"}
              >
                {String(idx + 1).padStart(3, "0")} {it.name}
              </text>
            </g>
          );
        })}
      </g>

      <g opacity="0.35">
        <path
          d={`M ${width - 18} ${height + 20} L ${width + 40} ${
            height - 40
          }`}
          stroke="#93c5fd"
          strokeWidth="40"
          strokeLinecap="round"
        />
      </g>
    </g>
  );
}

