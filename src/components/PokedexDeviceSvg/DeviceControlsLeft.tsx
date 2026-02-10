type DeviceControlsLeftProps = {
  stroke: string;
  onDpadUp: () => void;
  onDpadDown: () => void;
  onDpadLeft: () => void;
  onDpadRight: () => void;
  onConfig: () => void;
  onExport: () => void;
};

export function DeviceControlsLeft({
  stroke,
  onDpadUp,
  onDpadDown,
  onDpadLeft,
  onDpadRight,
  onConfig,
  onExport,
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

        {/* Left */}
        <g
          onClick={onDpadLeft}
          className="pokesvg-clickable pokesvg-pressable"
          role="button"
          aria-label="Left"
        >
          <rect x="-50" y="-18" width="32" height="36" rx="12" fill="#1f2937" />
        </g>
        <path
          d="M -38 0 L -26 -8 V 8 Z"
          fill="#e5e7eb"
          opacity="0.85"
          pointerEvents="none"
        />

        {/* Right */}
        <g
          onClick={onDpadRight}
          className="pokesvg-clickable pokesvg-pressable"
          role="button"
          aria-label="Right"
        >
          <rect x="18" y="-18" width="32" height="36" rx="12" fill="#1f2937" />
        </g>
        <path
          d="M 38 0 L 26 -8 V 8 Z"
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
              d="M 24 8 H 58"
              stroke="#e5e7eb"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.9"
              pointerEvents="none"
            />
            <circle
              cx="34"
              cy="8"
              r="3"
              fill="#e5e7eb"
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
            <circle
              cx="48"
              cy="13"
              r="3"
              fill="#e5e7eb"
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
            <circle
              cx="40"
              cy="18"
              r="3"
              fill="#e5e7eb"
              opacity="0.9"
              pointerEvents="none"
            />
          </g>
        </g>

        <g
          transform="translate(88, 0)"
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
              width="82"
              height="26"
              rx="13"
              fill="#111827"
              stroke={stroke}
              strokeWidth="4"
            />
            {/* Export icon (arrow out of box) */}
            <rect
              x="20"
              y="7"
              width="28"
              height="14"
              rx="4"
              fill="none"
              stroke="#93c5fd"
              strokeWidth="2.4"
              opacity="0.95"
              pointerEvents="none"
            />
            <path
              d="M 32 14 H 60"
              fill="none"
              stroke="#93c5fd"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.95"
              pointerEvents="none"
            />
            <path
              d="M 54 9 L 60 14 L 54 19"
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
    </g>
  );
}
