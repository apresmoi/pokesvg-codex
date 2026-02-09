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

      {/* D-pad center */}
      <g transform="translate(74, 74)">
        <rect x="-22" y="-18" width="44" height="36" rx="10" fill="#111827" />
        <rect x="-18" y="-54" width="36" height="108" rx="10" fill="#111827" />

        {/* Up */}
        <g
          onClick={onDpadUp}
          className="pokesvg-clickable pokesvg-pressable"
          role="button"
          aria-label="Up"
        >
          <rect x="-18" y="-54" width="36" height="34" rx="10" fill="#1f2937" />
        </g>
        <path
          d="M 0 -44 L -8 -32 H 8 Z"
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
          <rect x="-18" y="20" width="36" height="34" rx="10" fill="#1f2937" />
        </g>
        <path
          d="M 0 44 L -8 32 H 8 Z"
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
            <text
              x="41"
              y="18"
              textAnchor="middle"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              fontSize="12"
              fill="#e5e7eb"
            >
              LIST
            </text>
          </g>
        </g>

        <g
          transform="translate(88, 0)"
          onClick={onConfig}
          className="pokesvg-clickable"
          role="button"
          aria-label="System config screen"
        >
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
            <text
              x="41"
              y="18"
              textAnchor="middle"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              fontSize="12"
              fill="#e5e7eb"
            >
              CFG
            </text>
          </g>
        </g>
      </g>
    </g>
  );
}
