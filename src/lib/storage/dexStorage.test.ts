import { describe, expect, it } from "vitest";

import { generateGenome } from "@/lib/genome";
import { deserializeDex, serializeDex } from "./dexStorage";

describe("dexStorage", () => {
  it("round-trips genomes through JSON", () => {
    const genomes = [generateGenome(1), generateGenome(2), generateGenome(3)];
    const raw = serializeDex(genomes);
    const parsed = deserializeDex(raw);
    expect(parsed).toEqual(genomes);
  });

  it("returns empty for invalid payloads", () => {
    expect(deserializeDex("null")).toEqual([]);
    expect(deserializeDex('{"schemaVersion":1,"genomes":[]}')).toEqual([]);
    expect(deserializeDex('{"schemaVersion":2,"genomes":{}}')).toEqual([]);
  });
});
