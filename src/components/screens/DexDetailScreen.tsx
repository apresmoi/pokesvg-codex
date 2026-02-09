import type { DexListItem } from "./types";

type DexDetailScreenProps = {
  width: number;
  height: number;
  item?: DexListItem;
};

export function DexDetailScreen({ width, height, item }: DexDetailScreenProps) {
  return (
    <g>
      <rect x={0} y={0} width={width} height={height} fill="#0b1110" />

      <text
        x={12}
        y={22}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontSize="12"
        fill="#fde68a"
      >
        DETAIL
      </text>

      <text
        x={12}
        y={44}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontSize="12"
        fill="#e5e7eb"
      >
        {item ? `${item.name} (${item.id})` : "-"}
      </text>

      <g transform={`translate(${width * 0.62}, ${height * 0.55})`}>
        <circle r={46} fill="#111827" stroke="#60a5fa" strokeWidth="3" />
        <path
          d="M -18 10 C -16 -6, -6 -18, 10 -16 C 24 -14, 24 16, 10 20 C -4 24, -18 22, -18 10 Z"
          fill="#60a5fa"
          fillOpacity="0.35"
          stroke="#93c5fd"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="-8" cy="-6" r="4" fill="#e5e7eb" />
        <circle cx="10" cy="-4" r="4" fill="#e5e7eb" />
        <path
          d="M -2 10 C 4 14 10 14 16 10"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </g>
  );
}

