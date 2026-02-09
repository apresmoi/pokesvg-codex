type DeviceControlsRightProps = {
  stroke: string;
  onA: () => void;
  onB: () => void;
  onDiscover: () => void;
  onExport: () => void;
};

export function DeviceControlsRight({
  stroke,
  onA,
  onB,
  onDiscover,
  onExport,
}: DeviceControlsRightProps) {
  return (
    <g transform="translate(226, 438)">
      {/* A button */}
      <g
        onClick={onA}
        className="pokesvg-clickable pokesvg-pressable"
        role="button"
        aria-label="A"
      >
        <circle
          cx="98"
          cy="30"
          r="22"
          fill="#2563eb"
          stroke={stroke}
          strokeWidth="6"
        />
        <text
          x="98"
          y="36"
          textAnchor="middle"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
          fontSize="16"
          fill="#e5e7eb"
        >
          A
        </text>
      </g>

      {/* B button */}
      <g
        onClick={onB}
        className="pokesvg-clickable pokesvg-pressable"
        role="button"
        aria-label="B"
      >
        <circle
          cx="150"
          cy="68"
          r="22"
          fill="#ef4444"
          stroke={stroke}
          strokeWidth="6"
        />
        <text
          x="150"
          y="74"
          textAnchor="middle"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
          fontSize="16"
          fill="#111827"
        >
          B
        </text>
      </g>

      {/* Discover */}
      <g
        transform="translate(-16, 60)"
        onClick={onDiscover}
        className="pokesvg-clickable"
        role="button"
        aria-label="Discover"
      >
        <title>Discover</title>
        <g className="pokesvg-pressable">
          <rect
            x="0"
            y="0"
            width="122"
            height="28"
            rx="14"
            fill="#111827"
            stroke={stroke}
            strokeWidth="4"
          />
          {/* Crosshair icon */}
          <circle
            cx="61"
            cy="14"
            r="8"
            fill="none"
            stroke="#fde68a"
            strokeWidth="2.4"
            opacity="0.95"
            pointerEvents="none"
          />
          <circle
            cx="61"
            cy="14"
            r="2.2"
            fill="#fde68a"
            opacity="0.95"
            pointerEvents="none"
          />
          <path
            d="M 61 5 V 8"
            stroke="#fde68a"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.95"
            pointerEvents="none"
          />
          <path
            d="M 61 20 V 23"
            stroke="#fde68a"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.95"
            pointerEvents="none"
          />
          <path
            d="M 52 14 H 55"
            stroke="#fde68a"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.95"
            pointerEvents="none"
          />
          <path
            d="M 67 14 H 70"
            stroke="#fde68a"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.95"
            pointerEvents="none"
          />
        </g>
      </g>

      {/* Export */}
      <g
        transform="translate(-16, 94)"
        onClick={onExport}
        className="pokesvg-clickable"
        role="button"
        aria-label="Export genome"
      >
        <title>Export</title>
        <g className="pokesvg-pressable">
          <rect
            x="0"
            y="0"
            width="122"
            height="28"
            rx="14"
            fill="#111827"
            stroke={stroke}
            strokeWidth="4"
          />
          {/* Export icon (arrow out of box) */}
          <rect
            x="42"
            y="9"
            width="30"
            height="16"
            rx="4"
            fill="none"
            stroke="#93c5fd"
            strokeWidth="2.4"
            opacity="0.95"
            pointerEvents="none"
          />
          <path
            d="M 56 17 H 84"
            fill="none"
            stroke="#93c5fd"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
            pointerEvents="none"
          />
          <path
            d="M 78 11 L 84 17 L 78 23"
            fill="none"
            stroke="#93c5fd"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
            pointerEvents="none"
          />
        </g>
      </g>
    </g>
  );
}
