import type { Genome } from "@/lib/genome";
import { MonSvg } from "@/lib/genome/render";

type DexDetailScreenProps = {
  width: number;
  height: number;
  genome?: Genome;
  animate: boolean;
};

export function DexDetailScreen({
  width,
  height,
  genome,
  animate,
}: DexDetailScreenProps) {
  return (
    <g>
      <rect x={0} y={0} width={width} height={height} fill="#0b1110" />

      <text
        x={12}
        y={22}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontSize="12"
        fill="#fde68a"
      >
        DETAIL
      </text>

      <text
        x={12}
        y={44}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontSize="12"
        fill="#e5e7eb"
      >
        {genome ? `${genome.meta.name} (${genome.id})` : "-"}
      </text>

      {genome ? (
        <>
          <g transform="translate(14, 52)">
            <MonSvg
              genome={genome}
              width={120}
              height={120}
              animate={animate}
            />
          </g>

          <g transform="translate(148, 60)">
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
              y={20}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              fontSize="12"
              fill="#9ca3af"
            >
              ABIL: {genome.meta.abilities[0]}
            </text>
            <text
              x={0}
              y={36}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              fontSize="12"
              fill="#9ca3af"
            >
              ABIL: {genome.meta.abilities[1]}
            </text>
            <text
              x={0}
              y={60}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              fontSize="11"
              fill="#6b7280"
            >
              {genome.meta.lore}
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
        EXPORT: BUTTON | IMPORT: PASTE (CTRL+V)
      </text>
    </g>
  );
}
