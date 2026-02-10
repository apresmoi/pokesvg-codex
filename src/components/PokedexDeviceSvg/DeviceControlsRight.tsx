type DeviceControlsRightProps = {
  stroke: string;
  onA: () => void;
  onB: () => void;
  onDiscover: () => void;
};

export function DeviceControlsRight({
  stroke,
  onA,
  onB,
  onDiscover,
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
        transform="translate(2, 110)"
        onClick={onDiscover}
        className="pokesvg-clickable"
        role="button"
        aria-label="Discover"
      >
        <title>Discover</title>
        {/* Note: keep press animation on a nested element so CSS transform doesn't
           override the SVG `transform` attribute in some browsers. */}
        <g className="pokesvg-pressable">
          <circle
            cx="132"
            cy="30"
            r="18"
            fill="#f59e0b"
            stroke={stroke}
            strokeWidth="6"
          />
          {/* Crosshair icon */}
          <circle
            cx="132"
            cy="30"
            r="7"
            fill="none"
            stroke="#111827"
            strokeWidth="2.6"
            opacity="0.95"
            pointerEvents="none"
          />
          <circle
            cx="132"
            cy="30"
            r="2"
            fill="#111827"
            opacity="0.95"
            pointerEvents="none"
          />
          <path
            d="M 132 22 V 24"
            stroke="#111827"
            strokeWidth="2.6"
            strokeLinecap="round"
            opacity="0.95"
            pointerEvents="none"
          />
          <path
            d="M 132 36 V 38"
            stroke="#111827"
            strokeWidth="2.6"
            strokeLinecap="round"
            opacity="0.95"
            pointerEvents="none"
          />
          <path
            d="M 124 30 H 126"
            stroke="#111827"
            strokeWidth="2.6"
            strokeLinecap="round"
            opacity="0.95"
            pointerEvents="none"
          />
          <path
            d="M 138 30 H 140"
            stroke="#111827"
            strokeWidth="2.6"
            strokeLinecap="round"
            opacity="0.95"
            pointerEvents="none"
          />
        </g>
      </g>
    </g>
  );
}
