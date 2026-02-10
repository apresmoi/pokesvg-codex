import { describe, expect, it } from "vitest";

import { generateGenome } from "@/lib/genome";
import { parseGenomeJson } from "@/lib/genome/parseGenome";

import {
  decodeShareCodeToJson,
  encodeShareCode,
  looksLikeShareCode,
} from "./shareCode";

describe("shareCode", () => {
  it("encodes/decodes a genome payload via pokesvg: base64url", () => {
    const genome = generateGenome(123);
    const code = encodeShareCode(genome);
    expect(code.startsWith("pokesvg:")).toBe(true);
    expect(looksLikeShareCode(code)).toBe(true);

    const decoded = decodeShareCodeToJson(code);
    expect(decoded.ok).toBe(true);
    if (!decoded.ok) throw new Error("decode failed");

    const parsed = parseGenomeJson(decoded.json);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) throw new Error("parse failed");

    expect(parsed.genome.seed >>> 0).toBe(genome.seed >>> 0);
    expect(parsed.genome.schemaVersion).toBe(2);
  });
});
