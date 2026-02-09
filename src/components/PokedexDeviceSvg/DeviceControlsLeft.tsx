type DeviceControlsLeftProps = {
  stroke: string;
  onDpadUp: () => void;
  onDpadDown: () => void;
  onList: () => void;
  onConfig: () => void;
};

export function DeviceControlsLeft({
  stroke,
  onDpadUp,
  onDpadDown,
  onList,
  onConfig,
}: DeviceControlsLeftProps) {
  return (
    <g transform="translate(46, 434)">
      {/* D-pad base */}
      <rect
        x="8"
        y="8"
        width="132"
        height="132"
        rx="18"
        fill="#b31724"
        stroke={stroke}
        strokeWidth="6"
      />

      {/* D-pad (plus + center) */}
      <g transform="translate(74, 74)">
        <rect x="-50" y="-18" width="100" height="36" rx="12" fill="#111827" />
        <rect x="-18" y="-50" width="36" height="100" rx="12" fill="#111827" />
        <circle r="16" fill="#1f2937" stroke="#0b1220" strokeWidth="4" />
        <circle r="6" fill="#0b1220" opacity="0.45" />

        {/* Up */}
        <g
          onClick={onDpadUp}
          className="pokesvg-clickable pokesvg-pressable"
          role="button"
          aria-label="Up"
        >
          <rect x="-18" y="-50" width="36" height="32" rx="12" fill="#1f2937" />
        </g>
        <path
          d="M 0 -38 L -8 -26 H 8 Z"
          fill="#e5e7eb"
          opacity="0.85"
          pointerEvents="none"
        />

        {/* Down */}
        <g
          onClick={onDpadDown}
          className="pokesvg-clickable pokesvg-pressable"
          role="button"
          aria-label="Down"
        >
          <rect x="-18" y="18" width="36" height="32" rx="12" fill="#1f2937" />
        </g>
        <path
          d="M 0 38 L -8 26 H 8 Z"
          fill="#e5e7eb"
          opacity="0.85"
          pointerEvents="none"
        />
      </g>

      {/* Function buttons */}
      <g transform="translate(0, 154)">
        <g
          onClick={onList}
          className="pokesvg-clickable"
          role="button"
          aria-label="List screen"
        >
          <title>List</title>
          <g className="pokesvg-pressable">
            <rect
              x="0"
              y="0"
              width="82"
              height="26"
              rx="13"
              fill="#111827"
              stroke={stroke}
              strokeWidth="4"
            />
            <path
              d="M 24 8 H 58"
              stroke="#e5e7eb"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.9"
              pointerEvents="none"
            />
            <path
              d="M 24 13 H 58"
              stroke="#e5e7eb"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.9"
              pointerEvents="none"
            />
            <path
              d="M 24 18 H 58"
              stroke="#e5e7eb"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.9"
              pointerEvents="none"
            />
          </g>
        </g>

        <g
          transform="translate(88, 0)"
          onClick={onConfig}
          className="pokesvg-clickable"
          role="button"
          aria-label="System config screen"
        >
          <title>Config</title>
          <g className="pokesvg-pressable">
            <rect
              x="0"
              y="0"
              width="82"
              height="26"
              rx="13"
              fill="#111827"
              stroke={stroke}
              strokeWidth="4"
            />
            <path
              d="M 24 9 H 58"
              stroke="#e5e7eb"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.9"
              pointerEvents="none"
            />
            <circle
              cx="34"
              cy="9"
              r="3"
              fill="#e5e7eb"
              opacity="0.9"
              pointerEvents="none"
            />
            <path
              d="M 24 14 H 58"
              stroke="#e5e7eb"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.9"
              pointerEvents="none"
            />
            <circle
              cx="48"
              cy="14"
              r="3"
              fill="#e5e7eb"
              opacity="0.9"
              pointerEvents="none"
            />
            <path
              d="M 24 19 H 58"
              stroke="#e5e7eb"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.9"
              pointerEvents="none"
            />
            <circle
              cx="40"
              cy="19"
              r="3"
              fill="#e5e7eb"
              opacity="0.9"
              pointerEvents="none"
            />
          </g>
        </g>
      </g>
    </g>
  );
}
