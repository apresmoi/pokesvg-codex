import type { ReactNode } from "react";

import { DeviceControlsLeft } from "./DeviceControlsLeft";
import { DeviceControlsRight } from "./DeviceControlsRight";
import { POKEDEX_DEVICE, POKEDEX_SCREEN } from "./geometry";
import { ScreenToast } from "./ScreenToast";

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
  const w = POKEDEX_DEVICE.width;
  const h = POKEDEX_DEVICE.height;

  const bodyFill = "#d11f2e";
  const bodyShadow = "#a31724";
  const stroke = "#121216";

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label="PokeSVG Pokedex device"
      className="pokesvg-device"
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

        <linearGradient id="screen-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b1110" />
          <stop offset="100%" stopColor="#070b0a" />
        </linearGradient>

        <pattern
          id="scanlines"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <rect x="0" y="0" width="4" height="1" fill="#000" opacity="0.35" />
        </pattern>

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
        rx="56"
        fill="url(#body-grad)"
        stroke={stroke}
        strokeWidth="6"
      />

      {/* Bevel highlight */}
      <path
        d="M 44 70 C 120 36 210 28 332 28 L 378 28 C 392 28 402 38 402 52 L 402 100 C 356 72 306 64 246 66 C 164 70 104 84 44 118 Z"
        fill="#ff4a57"
        opacity="0.25"
      />

      {/* Lens cluster */}
      <g transform="translate(92, 86)">
        <circle r="34" fill="#e5e7eb" stroke={stroke} strokeWidth="5" />
        <circle r="26" fill="url(#lens-grad)" stroke={stroke} strokeWidth="3" />
        <circle
          cx="-62"
          cy="-18"
          r="10"
          fill="#22c55e"
          stroke={stroke}
          strokeWidth="3"
        />
        <circle
          cx="-36"
          cy="-32"
          r="10"
          fill="#f59e0b"
          stroke={stroke}
          strokeWidth="3"
        />
        <circle
          cx="-10"
          cy="-18"
          r="10"
          fill="#ef4444"
          stroke={stroke}
          strokeWidth="3"
        />
      </g>

      {/* Hinged seam */}
      <g opacity="0.85">
        <path
          d="M 30 418 H 390"
          stroke={stroke}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 30 414 H 390"
          stroke="#ff4a57"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.25"
        />
      </g>

      {/* Screen bezel */}
      <g>
        <rect
          x={POKEDEX_SCREEN.x - 10}
          y={POKEDEX_SCREEN.y - 12}
          width={POKEDEX_SCREEN.width + 20}
          height={POKEDEX_SCREEN.height + 24}
          rx="22"
          fill="#d1d5db"
          stroke={stroke}
          strokeWidth="6"
        />
        <rect
          x={POKEDEX_SCREEN.x}
          y={POKEDEX_SCREEN.y}
          width={POKEDEX_SCREEN.width}
          height={POKEDEX_SCREEN.height}
          rx={POKEDEX_SCREEN.rx}
          fill="url(#screen-grad)"
          stroke="#111827"
          strokeWidth="3"
        />
      </g>

      {/* Screen content (clipped) */}
      <g clipPath={`url(#${CLIP_ID})`}>
        <g transform={`translate(${POKEDEX_SCREEN.x}, ${POKEDEX_SCREEN.y})`}>
          {screen}
        </g>

        {/* Screen effects */}
        <rect
          x={POKEDEX_SCREEN.x}
          y={POKEDEX_SCREEN.y}
          width={POKEDEX_SCREEN.width}
          height={POKEDEX_SCREEN.height}
          fill="url(#scanlines)"
          opacity="0.08"
        />
        <rect
          x={POKEDEX_SCREEN.x}
          y={POKEDEX_SCREEN.y}
          width={POKEDEX_SCREEN.width}
          height={POKEDEX_SCREEN.height}
          fill="#000"
          opacity="0.08"
        />

        {toast ? <ScreenToast toast={toast} /> : null}
      </g>

      {/* Top label */}
      <text
        x="168"
        y="72"
        fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
        fontSize="20"
        fill="#111827"
        opacity="0.85"
      >
        POKESVG
      </text>

      {/* Speaker grille */}
      <g transform="translate(254, 608)" opacity="0.6">
        <path
          d="M 0 0 H 132"
          stroke={stroke}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 0 14 H 132"
          stroke={stroke}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 0 28 H 132"
          stroke={stroke}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 0 42 H 132"
          stroke={stroke}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>

      <DeviceControlsLeft
        stroke={stroke}
        onDpadUp={onDpadUp}
        onDpadDown={onDpadDown}
        onList={onList}
        onConfig={onConfig}
      />

      <DeviceControlsRight
        stroke={stroke}
        onA={onA}
        onB={onB}
        onDiscover={onDiscover}
        onExport={onExport}
      />
    </svg>
  );
}
