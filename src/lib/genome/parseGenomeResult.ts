import type { Genome } from "./types";

export type ParseOk = { ok: true; genome: Genome };
export type ParseErr = { ok: false; error: string };
export type ParseGenomeResult = ParseOk | ParseErr;
