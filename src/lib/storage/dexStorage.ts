import type { Genome, GenomeV1 } from "@/lib/genome";
import { parseGenomeValue } from "@/lib/genome/parseGenome";

export const DEX_STORAGE_KEY = "pokesvg.collection.v1";

type DexStorageV1 = {
  schemaVersion: 1;
  genomes: GenomeV1[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function serializeDex(genomes: Genome[]) {
  const payload: DexStorageV1 = {
    schemaVersion: 1,
    genomes: genomes as GenomeV1[],
  };
  return JSON.stringify(payload);
}

export function deserializeDex(raw: string): Genome[] {
  const parsed: unknown = JSON.parse(raw);

  // Back-compat: allow a bare array payload.
  if (Array.isArray(parsed)) {
    return parsed
      .map(parseGenomeValue)
      .filter((r) => r.ok)
      .map((r) => r.genome);
  }

  if (!isRecord(parsed)) return [];
  if (parsed.schemaVersion !== 1) return [];
  if (!Array.isArray(parsed.genomes)) return [];

  return parsed.genomes
    .map(parseGenomeValue)
    .filter((r) => r.ok)
    .map((r) => r.genome);
}

export function loadDex(): Genome[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(DEX_STORAGE_KEY);
    if (!raw) return [];
    return deserializeDex(raw);
  } catch {
    return [];
  }
}

export function saveDex(genomes: Genome[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DEX_STORAGE_KEY, serializeDex(genomes));
  } catch {
    // ignore
  }
}
