import type { Settings } from "@/lib/settings";

type SystemConfigScreenProps = {
  width: number;
  height: number;
  settings: Settings;
  selectedIndex: number;
};

export function SystemConfigScreen({
  width,
  height,
  settings,
  selectedIndex,
}: SystemConfigScreenProps) {
  const pad = 12;
  const headerH = 30;
  const contentTop = pad + headerH + 18;
  const rowH = 18;

  const options = [
    {
      key: "preset",
      label: "PRESET",
      value: settings.generatorPreset.toUpperCase(),
    },
    { key: "bg", label: "BG", value: settings.backgroundVariant.toUpperCase() },
    { key: "anim", label: "ANIM", value: settings.animations ? "ON" : "OFF" },
  ];

  return (
    <g>
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
        fill="#fca5a5"
      >
        SYSTEM CONFIG
      </text>

      <g transform={`translate(${pad}, ${contentTop})`}>
        {options.map((opt, idx) => {
          const y = idx * rowH;
          const isSelected = idx === selectedIndex % options.length;
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
        DPAD: MOVE A: TOGGLE B: BACK
      </text>
    </g>
  );
}
