import type { Genome, GenomeV1 } from "@/lib/genome";

export const DEX_STORAGE_KEY = "pokesvg.collection.v1";

type DexStorageV1 = {
  schemaVersion: 1;
  genomes: GenomeV1[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStringRecord(value: unknown): value is Record<string, string> {
  if (!isRecord(value)) return false;
  return Object.values(value).every((v) => typeof v === "string");
}

function isGenomeV1(value: unknown): value is GenomeV1 {
  if (!isRecord(value)) return false;

  if (value.schemaVersion !== 1) return false;
  if (typeof value.id !== "string") return false;
  if (typeof value.seed !== "number") return false;
  if (typeof value.plan !== "string") return false;

  if (!isStringRecord(value.palette)) return false;
  if (!isRecord(value.body)) return false;
  if (!isRecord(value.head)) return false;
  if (!isRecord(value.face)) return false;
  if (!isRecord(value.limbs)) return false;
  if (!isRecord(value.meta)) return false;

  return true;
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
    return parsed.filter(isGenomeV1);
  }

  if (!isRecord(parsed)) return [];
  if (parsed.schemaVersion !== 1) return [];
  if (!Array.isArray(parsed.genomes)) return [];

  return parsed.genomes.filter(isGenomeV1);
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

