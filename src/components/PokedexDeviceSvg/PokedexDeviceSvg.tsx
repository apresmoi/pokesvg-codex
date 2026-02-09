import type { ReactNode } from "react";

import { POKEDEX_SCREEN } from "./geometry";

type PokedexDeviceSvgProps = {
  screen: ReactNode;
  toast: string | null;
  onDpadUp: () => void;
  onDpadDown: () => void;
  onA: () => void;
  onB: () => void;
  onConfig: () => void;
  onList: () => void;
  onDiscover: () => void;
  onExport: () => void;
};

const CLIP_ID = "pokesvg-screen-clip";

export function PokedexDeviceSvg({
  screen,
  toast,
  onDpadUp,
  onDpadDown,
  onA,
  onB,
  onConfig,
  onList,
  onDiscover,
  onExport,
}: PokedexDeviceSvgProps) {
  const w = 640;
  const h = 420;

  const bodyFill = "#d11f2e";
  const bodyShadow = "#a31724";
  const stroke = "#121216";

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label="PokeSVG Pokedex device"
      style={{
        height: "80vh",
        width: "auto",
        filter: "drop-shadow(0 22px 40px rgba(0, 0, 0, 0.55))",
      }}
    >
      <defs>
        <linearGradient id="body-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={bodyFill} />
          <stop offset="65%" stopColor={bodyFill} />
          <stop offset="100%" stopColor={bodyShadow} />
        </linearGradient>

        <radialGradient id="lens-grad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#e0fbff" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#48c5ff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0a4cff" stopOpacity="0.95" />
        </radialGradient>

        <clipPath id={CLIP_ID}>
          <rect
            x={POKEDEX_SCREEN.x}
            y={POKEDEX_SCREEN.y}
            width={POKEDEX_SCREEN.width}
            height={POKEDEX_SCREEN.height}
            rx={POKEDEX_SCREEN.rx}
          />
        </clipPath>
      </defs>

      {/* Outer casing */}
      <rect
        x="16"
        y="16"
        width={w - 32}
        height={h - 32}
        rx="44"
        fill="url(#body-grad)"
        stroke={stroke}
        strokeWidth="6"
      />

      {/* Bevel highlight */}
      <path
        d="M 54 58 C 110 30 170 26 240 26 L 586 26 C 604 26 614 36 614 54 L 614 90 C 558 60 496 54 418 58 C 290 66 196 90 54 144 Z"
        fill="#ff4a57"
        opacity="0.25"
      />

      {/* Lens cluster */}
      <g transform="translate(68, 70)">
        <circle r="34" fill="#e5e7eb" stroke={stroke} strokeWidth="5" />
        <circle r="26" fill="url(#lens-grad)" stroke={stroke} strokeWidth="3" />
        <circle cx="-62" cy="-18" r="10" fill="#22c55e" stroke={stroke} strokeWidth="3" />
        <circle cx="-36" cy="-32" r="10" fill="#f59e0b" stroke={stroke} strokeWidth="3" />
        <circle cx="-10" cy="-18" r="10" fill="#ef4444" stroke={stroke} strokeWidth="3" />
      </g>

      {/* Screen bezel */}
      <g>
        <path
          d="M 226 64 H 606 Q 620 64 620 78 V 306 Q 620 320 606 320 H 254 Q 238 320 232 306 L 222 280 Q 218 270 218 258 V 78 Q 218 64 226 64 Z"
          fill="#d1d5db"
          stroke={stroke}
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <rect
          x={POKEDEX_SCREEN.x}
          y={POKEDEX_SCREEN.y}
          width={POKEDEX_SCREEN.width}
          height={POKEDEX_SCREEN.height}
          rx={POKEDEX_SCREEN.rx}
          fill="#0b1110"
          stroke="#111827"
          strokeWidth="3"
        />
      </g>

      {/* Screen content (clipped) */}
      <g clipPath={`url(#${CLIP_ID})`}>
        <g transform={`translate(${POKEDEX_SCREEN.x}, ${POKEDEX_SCREEN.y})`}>
          {screen}
        </g>
        {toast ? (
          <text
            x={POKEDEX_SCREEN.x + POKEDEX_SCREEN.width - 10}
            y={POKEDEX_SCREEN.y + 18}
            textAnchor="end"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
            fontSize="12"
            fill="#e5e7eb"
            opacity="0.9"
          >
            {toast}
          </text>
        ) : null}
      </g>

      {/* Top label */}
      <text
        x="250"
        y="54"
        fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
        fontSize="18"
        fill="#111827"
        opacity="0.85"
      >
        POKESVG
      </text>

      {/* Left controls panel */}
      <g transform="translate(78, 232)">
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
          <rect
            x="-18"
            y="-54"
            width="36"
            height="34"
            rx="10"
            fill="#1f2937"
            onClick={onDpadUp}
            style={{ cursor: "pointer" }}
          />
          <path d="M 0 -44 L -8 -32 H 8 Z" fill="#e5e7eb" opacity="0.85" pointerEvents="none" />

          {/* Down */}
          <rect
            x="-18"
            y="20"
            width="36"
            height="34"
            rx="10"
            fill="#1f2937"
            onClick={onDpadDown}
            style={{ cursor: "pointer" }}
          />
          <path d="M 0 44 L -8 32 H 8 Z" fill="#e5e7eb" opacity="0.85" pointerEvents="none" />
        </g>

        {/* Function buttons */}
        <g transform="translate(0, 154)">
          <g
            onClick={onList}
            style={{ cursor: "pointer" }}
            role="button"
            aria-label="List screen"
          >
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

          <g
            transform="translate(88, 0)"
            onClick={onConfig}
            style={{ cursor: "pointer" }}
            role="button"
            aria-label="System config screen"
          >
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

      {/* Right controls */}
      <g transform="translate(424, 312)">
        {/* A button */}
        <g onClick={onA} style={{ cursor: "pointer" }} role="button" aria-label="A">
          <circle cx="98" cy="30" r="22" fill="#2563eb" stroke={stroke} strokeWidth="6" />
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
        <g onClick={onB} style={{ cursor: "pointer" }} role="button" aria-label="B">
          <circle cx="150" cy="68" r="22" fill="#ef4444" stroke={stroke} strokeWidth="6" />
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
    </svg>
  );
}
