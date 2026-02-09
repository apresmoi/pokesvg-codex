import { useCallback, useEffect, useMemo, useReducer } from "react";
import type { ScreenId } from "@/lib/app/screen";
import type { Genome } from "@/lib/genome";
import { generateGenome, generateUniqueSeed } from "@/lib/genome";
import { parseGenomeJsonOrRegenerate } from "@/lib/genome/parseGenome";
import type { Settings } from "@/lib/settings";
import { loadDex, saveDex } from "@/lib/storage/dexStorage";
import { loadSettings, saveSettings } from "@/lib/storage/settingsStorage";

const TOAST_DURATION_MS = 1100;

const CONFIG_OPTIONS = ["preset", "background", "animations"] as const;
type ConfigOption = (typeof CONFIG_OPTIONS)[number];

type AppState = {
  screen: ScreenId;
  selectedIndex: number;
  configIndex: number;
  genomes: Genome[];
  settings: Settings;
  toast: string | null;
};

type AppAction =
  | { type: "nav/list" }
  | { type: "nav/config" }
  | { type: "input/up" }
  | { type: "input/down" }
  | { type: "input/a" }
  | { type: "input/b" }
  | { type: "discover" }
  | { type: "import"; genome: Genome }
  | { type: "toast/show"; message: string }
  | { type: "toast/clear" };

export type UsePokesvgAppResult = AppState & {
  selected?: Genome;
  onDpadUp: () => void;
  onDpadDown: () => void;
  onA: () => void;
  onB: () => void;
  onConfig: () => void;
  onList: () => void;
  onDiscover: () => void;
  onExport: () => Promise<void>;
};

function initState(): AppState {
  return {
    screen: "dex_list",
    selectedIndex: 0,
    configIndex: 0,
    genomes: loadDex(),
    settings: loadSettings(),
    toast: null,
  };
}

function clampIndex(length: number, index: number) {
  if (length <= 0) return 0;
  return Math.min(Math.max(index, 0), length - 1);
}

function nextInCycle<T>(items: readonly T[], current: T): T {
  if (items.length === 0)
    throw new Error("nextInCycle requires items.length>0");
  const idx = items.indexOf(current);
  const next = items[(idx + 1) % items.length];
  return next ?? items[0];
}

function isEditableTarget(target: EventTarget | null) {
  if (!target) return false;
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select";
}

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "nav/list":
      return { ...state, screen: "dex_list" };
    case "nav/config":
      return { ...state, screen: "config" };

    case "input/up": {
      if (state.screen === "config") {
        return {
          ...state,
          configIndex:
            (state.configIndex + CONFIG_OPTIONS.length - 1) %
            CONFIG_OPTIONS.length,
        };
      }
      if (state.screen === "dex_list") {
        return {
          ...state,
          selectedIndex: clampIndex(
            state.genomes.length,
            state.selectedIndex - 1,
          ),
        };
      }
      return state;
    }

    case "input/down": {
      if (state.screen === "config") {
        return {
          ...state,
          configIndex: (state.configIndex + 1) % CONFIG_OPTIONS.length,
        };
      }
      if (state.screen === "dex_list") {
        return {
          ...state,
          selectedIndex: clampIndex(
            state.genomes.length,
            state.selectedIndex + 1,
          ),
        };
      }
      return state;
    }

    case "input/a": {
      if (state.screen === "dex_list") {
        if (state.genomes.length === 0) return { ...state, toast: "EMPTY" };
        return { ...state, screen: "dex_detail" };
      }

      if (state.screen === "config") {
        const opt: ConfigOption =
          CONFIG_OPTIONS[state.configIndex % CONFIG_OPTIONS.length] ??
          CONFIG_OPTIONS[0];

        if (opt === "preset") {
          const next = nextInCycle(
            ["classic", "cute", "weird"] as const,
            state.settings.generatorPreset,
          );
          return {
            ...state,
            settings: { ...state.settings, generatorPreset: next },
            toast: `PRESET:${next.toUpperCase()}`,
          };
        }

        if (opt === "background") {
          const next = nextInCycle(
            ["aurora", "grid", "mist"] as const,
            state.settings.backgroundVariant,
          );
          return {
            ...state,
            settings: { ...state.settings, backgroundVariant: next },
            toast: `BG:${next.toUpperCase()}`,
          };
        }

        const nextAnimations = !state.settings.animations;
        return {
          ...state,
          settings: { ...state.settings, animations: nextAnimations },
          toast: nextAnimations ? "ANIM:ON" : "ANIM:OFF",
        };
      }

      return { ...state, toast: "A" };
    }

    case "input/b":
      if (state.screen === "dex_detail" || state.screen === "config") {
        return { ...state, screen: "dex_list" };
      }
      return { ...state, toast: "B" };

    case "discover": {
      const usedSeeds = new Set(state.genomes.map((g) => g.seed >>> 0));
      const seed = generateUniqueSeed(usedSeeds);
      const genome = generateGenome(seed, {
        preset: state.settings.generatorPreset,
      });
      const newIndex = state.genomes.length;

      return {
        ...state,
        genomes: [...state.genomes, genome],
        selectedIndex: newIndex,
        screen: "dex_detail",
        toast: "DISCOVERED",
      };
    }

    case "import": {
      const incoming = action.genome;
      const isDupe = state.genomes.some((g) => g.seed === incoming.seed);
      if (isDupe) return { ...state, toast: "ALREADY" };

      const newIndex = state.genomes.length;
      return {
        ...state,
        genomes: [...state.genomes, incoming],
        selectedIndex: newIndex,
        screen: "dex_detail",
        toast: "IMPORTED",
      };
    }

    case "toast/show":
      return { ...state, toast: action.message };
    case "toast/clear":
      return { ...state, toast: null };
  }
}

export function usePokesvgApp(): UsePokesvgAppResult {
  const [state, dispatch] = useReducer(reducer, undefined, initState);

  const selected = useMemo(() => {
    if (state.genomes.length === 0) return undefined;
    const idx = clampIndex(state.genomes.length, state.selectedIndex);
    return state.genomes[idx];
  }, [state.genomes, state.selectedIndex]);

  useEffect(() => {
    saveDex(state.genomes);
  }, [state.genomes]);

  useEffect(() => {
    saveSettings(state.settings);
  }, [state.settings]);

  useEffect(() => {
    if (state.toast === null) return;
    const timeoutId = window.setTimeout(() => {
      dispatch({ type: "toast/clear" });
    }, TOAST_DURATION_MS);
    return () => window.clearTimeout(timeoutId);
  }, [state.toast]);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (isEditableTarget(e.target)) return;
      const text = e.clipboardData?.getData("text") ?? "";
      if (!text) return;

      const parsed = parseGenomeJsonOrRegenerate(text);
      if (!parsed.ok) {
        dispatch({ type: "toast/show", message: "INVALID" });
        return;
      }

      dispatch({ type: "import", genome: parsed.genome });
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  const onDpadUp = useCallback(() => {
    dispatch({ type: "input/up" });
  }, []);

  const onDpadDown = useCallback(() => {
    dispatch({ type: "input/down" });
  }, []);

  const onA = useCallback(() => {
    dispatch({ type: "input/a" });
  }, []);

  const onB = useCallback(() => {
    dispatch({ type: "input/b" });
  }, []);

  const onConfig = useCallback(() => {
    dispatch({ type: "nav/config" });
  }, []);

  const onList = useCallback(() => {
    dispatch({ type: "nav/list" });
  }, []);

  const onDiscover = useCallback(() => {
    dispatch({ type: "discover" });
  }, []);

  const onExport = useCallback(async () => {
    if (!selected) {
      dispatch({ type: "toast/show", message: "NO MON" });
      return;
    }

    try {
      await navigator.clipboard.writeText(JSON.stringify(selected));
      dispatch({ type: "toast/show", message: "COPIED" });
    } catch {
      dispatch({ type: "toast/show", message: "COPY FAIL" });
    }
  }, [selected]);

  return {
    ...state,
    selected,
    onDpadUp,
    onDpadDown,
    onA,
    onB,
    onConfig,
    onList,
    onDiscover,
    onExport,
  };
}
