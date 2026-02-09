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
    <g transform="translate(424, 312)">
      {/* A button */}
      <g
        onClick={onA}
        style={{ cursor: "pointer" }}
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
        style={{ cursor: "pointer" }}
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
        style={{ cursor: "pointer" }}
        role="button"
        aria-label="Discover"
      >
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
        <text
          x="61"
          y="19"
          textAnchor="middle"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
          fontSize="12"
          fill="#fde68a"
        >
          DISCOVER
        </text>
      </g>

      {/* Export */}
      <g
        transform="translate(-16, 94)"
        onClick={onExport}
        style={{ cursor: "pointer" }}
        role="button"
        aria-label="Export genome"
      >
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
        <text
          x="61"
          y="19"
          textAnchor="middle"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
          fontSize="12"
          fill="#93c5fd"
        >
          EXPORT
        </text>
      </g>
    </g>
  );
}
