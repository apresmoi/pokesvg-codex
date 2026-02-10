import type { Genome } from "@/lib/genome";
import { MonSvg } from "@/lib/genome/render";

type DexDetailScreenProps = {
  width: number;
  height: number;
  genome?: Genome;
  animate: boolean;
  isEncounter: boolean;
};

export function DexDetailScreen({
  width,
  height,
  genome,
  animate,
  isEncounter,
}: DexDetailScreenProps) {
  return (
    <g>
      <rect x={0} y={0} width={width} height={42} fill="#000" opacity="0.25" />
      <path
        d={`M 0 42 H ${width}`}
        stroke="#111827"
        strokeWidth="2"
        opacity="0.9"
      />

      <text
        x={12}
        y={24}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontSize="12"
        fill="#fde68a"
      >
        {isEncounter ? "ENCOUNTER" : "DEX ENTRY"}
      </text>

      {genome ? (
        <>
          <text
            x={12}
            y={40}
            fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
            fontSize="12"
            fill="#e5e7eb"
          >
            {genome.meta.name.toUpperCase()} #
            {(genome.seed >>> 0).toString(16).padStart(8, "0")}
          </text>

          <g transform="translate(10, 50)">
            <MonSvg
              genome={genome}
              width={136}
              height={136}
              animate={animate}
            />
          </g>

          <g transform="translate(156, 56)">
            <text
              x={0}
              y={0}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              fontSize="12"
              fill="#9ca3af"
            >
              PLAN: {genome.plan.toUpperCase()}
            </text>
            <text
              x={0}
              y={16}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              fontSize="11"
              fill="#9ca3af"
            >
              SPINE: {genome.spine.curve.toUpperCase()} S
              {genome.spine.points.length}
            </text>
            <text
              x={0}
              y={32}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              fontSize="11"
              fill="#9ca3af"
            >
              HEAD: {genome.head.family.toUpperCase()}
            </text>
            <text
              x={0}
              y={48}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              fontSize="11"
              fill="#9ca3af"
            >
              TAIL: {genome.tail.family.toUpperCase()}
            </text>
            <text
              x={0}
              y={64}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              fontSize="11"
              fill="#9ca3af"
            >
              SURF:{" "}
              {genome.surface.placements.length.toString().padStart(2, "0")}
            </text>
            <text
              x={0}
              y={84}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              fontSize="12"
              fill="#9ca3af"
            >
              ABIL: {genome.meta.abilities[0]}
            </text>
            <text
              x={0}
              y={100}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              fontSize="12"
              fill="#9ca3af"
            >
              ABIL: {genome.meta.abilities[1]}
            </text>
            <text
              x={0}
              y={124}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              fontSize="11"
              fill="#6b7280"
            >
              {genome.meta.lore.slice(0, 44)}
            </text>
          </g>
        </>
      ) : null}

      <text
        x={12}
        y={height - 12}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontSize="11"
        fill="#6b7280"
      >
        {isEncounter
          ? "A: CATCH  B: LET GO"
          : "LEFT/B: BACK | EXPORT: BUTTON | IMPORT: PASTE (CTRL+V)"}
      </text>
    </g>
  );
}
