import { describe, expect, it } from "vitest";

import { generateGenome } from "@/lib/genome";
import { DEFAULT_SETTINGS } from "@/lib/settings";

import { reduceAppState } from "./usePokesvgApp";

type AppState = Parameters<typeof reduceAppState>[0];

function makeBaseState(overrides: Partial<AppState> = {}): AppState {
  return {
    screen: "dex_list",
    selectedIndex: 0,
    configIndex: 0,
    genomes: [],
    encounter: null,
    settings: DEFAULT_SETTINGS,
    toast: null,
    ...overrides,
  };
}

describe("usePokesvgApp reducer (encounter/catch flow)", () => {
  it("discover creates an encounter without mutating the collection", () => {
    const genomes = [generateGenome(1), generateGenome(2), generateGenome(3)];
    const state = makeBaseState({ genomes });
    const next = reduceAppState(state, { type: "discover" });

    expect(next.genomes).toEqual(genomes);
    expect(next.encounter).not.toBeNull();
    expect(next.screen).toBe("dex_detail");
    expect(next.toast).toBe("ENCOUNTER");

    const used = new Set(genomes.map((g) => g.seed >>> 0));
    expect(used.has((next.encounter?.seed ?? 0) >>> 0)).toBe(false);
  });

  it("A catches the encounter (adds to collection, clears encounter)", () => {
    const caught = [generateGenome(1)];
    const encounter = generateGenome(123);
    const state = makeBaseState({
      screen: "dex_detail",
      genomes: caught,
      encounter,
      selectedIndex: 0,
    });
    const next = reduceAppState(state, { type: "input/a" });

    expect(next.encounter).toBeNull();
    expect(next.genomes).toEqual([...caught, encounter]);
    expect(next.selectedIndex).toBe(caught.length);
    expect(next.screen).toBe("dex_detail");
    expect(next.toast).toBe("CAUGHT");
  });

  it("B lets go of the encounter (does not mutate the collection)", () => {
    const caught = [generateGenome(1)];
    const encounter = generateGenome(123);
    const state = makeBaseState({
      screen: "dex_detail",
      genomes: caught,
      encounter,
      selectedIndex: 0,
    });
    const next = reduceAppState(state, { type: "input/b" });

    expect(next.encounter).toBeNull();
    expect(next.genomes).toEqual(caught);
    expect(next.screen).toBe("dex_list");
    expect(next.toast).toBe("LET GO");
  });

  it("blocks discover while an encounter is pending", () => {
    const state = makeBaseState({
      screen: "dex_detail",
      genomes: [generateGenome(1)],
      encounter: generateGenome(222),
    });
    const next = reduceAppState(state, { type: "discover" });

    expect(next.encounter).not.toBeNull();
    expect(next.genomes).toEqual(state.genomes);
    expect(next.toast).toBe("DECIDE");
  });
});

describe("usePokesvgApp reducer (D-046 control mapping)", () => {
  it("Dex List: Right opens detail, Left/B are no-ops", () => {
    const genomes = [generateGenome(1), generateGenome(2)];
    const state = makeBaseState({
      genomes,
      screen: "dex_list",
      selectedIndex: 0,
    });

    const left = reduceAppState(state, { type: "input/left" });
    expect(left).toEqual(state);

    const b = reduceAppState(state, { type: "input/b" });
    expect(b).toEqual(state);

    const right = reduceAppState(state, { type: "input/right" });
    expect(right.screen).toBe("dex_detail");
  });

  it("Dex Detail: Left returns to list when not in an encounter", () => {
    const genomes = [generateGenome(1)];
    const state = makeBaseState({
      genomes,
      screen: "dex_detail",
      selectedIndex: 0,
      encounter: null,
    });
    const next = reduceAppState(state, { type: "input/left" });
    expect(next.screen).toBe("dex_list");
  });

  it("Config: Left cycles backward, Right/A cycles forward", () => {
    const state = makeBaseState({
      screen: "config",
      configIndex: 0, // preset
      settings: DEFAULT_SETTINGS,
    });

    const right = reduceAppState(state, { type: "input/right" });
    expect(right.settings.generatorPreset).not.toBe(
      state.settings.generatorPreset,
    );

    const a = reduceAppState(state, { type: "input/a" });
    expect(a.settings.generatorPreset).not.toBe(state.settings.generatorPreset);

    const left = reduceAppState(state, { type: "input/left" });
    expect(left.settings.generatorPreset).not.toBe(
      state.settings.generatorPreset,
    );
  });
});
