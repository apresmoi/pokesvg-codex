import { POKEDEX_SCREEN } from "./geometry";

type ScreenToastProps = {
  toast: string;
};

export function ScreenToast({ toast }: ScreenToastProps) {
  const padX = 8;
  const charW = 7; // approx for 12px monospace in SVG
  const pillW = Math.min(
    POKEDEX_SCREEN.width - 20,
    toast.length * charW + padX * 2,
  );
  const x = POKEDEX_SCREEN.x + POKEDEX_SCREEN.width - 10 - pillW;
  const y = POKEDEX_SCREEN.y + 6;

  return (
    <g opacity="0.95">
      <rect
        x={x}
        y={y}
        width={pillW}
        height={18}
        rx={9}
        fill="#0b1110"
        stroke="#93c5fd"
        strokeOpacity="0.35"
      />
      <text
        x={x + pillW - padX}
        y={y + 13}
        textAnchor="end"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontSize="12"
        fill="#e5e7eb"
      >
        {toast}
      </text>
    </g>
  );
}
