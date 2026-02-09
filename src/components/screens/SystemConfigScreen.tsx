type SystemConfigScreenProps = {
  width: number;
  height: number;
  selectedIndex: number;
};

const OPTIONS = [
  { key: "preset", label: "PRESET", value: "CLASSIC" },
  { key: "outline", label: "OUTLINE", value: "THICK" },
  { key: "bg", label: "BG", value: "AURORA" },
  { key: "anim", label: "ANIM", value: "ON" },
];

export function SystemConfigScreen({
  width,
  height,
  selectedIndex,
}: SystemConfigScreenProps) {
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
        fill="#fca5a5"
      >
        SYSTEM CONFIG
      </text>

      <g transform={`translate(${pad}, ${pad + 22})`}>
        {OPTIONS.map((opt, idx) => {
          const y = idx * rowH;
          const isSelected = idx === selectedIndex % OPTIONS.length;
          return (
            <g key={opt.key} transform={`translate(0, ${y})`}>
              {isSelected ? (
                <rect
                  x={-6}
                  y={-12}
                  width={width - pad * 2 + 12}
                  height={rowH}
                  rx={6}
                  fill="#3b0f0f"
                  stroke="#f87171"
                  strokeOpacity="0.8"
                />
              ) : null}
              <text
                x={0}
                y={0}
                fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                fontSize="12"
                fill={isSelected ? "#fee2e2" : "#9ca3af"}
              >
                {opt.label}: {opt.value}
              </text>
            </g>
          );
        })}
      </g>

      <text
        x={pad}
        y={height - 12}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontSize="11"
        fill="#6b7280"
      >
        DPAD: MOVE  A: TOGGLE  B: BACK
      </text>
    </g>
  );
}

