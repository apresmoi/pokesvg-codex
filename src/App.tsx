import { useCallback, useEffect, useMemo, useState } from "react";

import { SoothingBackground } from "@/components/SoothingBackground";
import {
  DexDetailScreen,
  DexListScreen,
  SystemConfigScreen,
  type ScreenId,
} from "@/components/screens";
import { PokedexDeviceSvg, POKEDEX_SCREEN } from "@/components/PokedexDeviceSvg";
import type { Genome } from "@/lib/genome";
import { generateGenome, generateUniqueSeed } from "@/lib/genome";
import type { Settings } from "@/lib/settings";
import { loadDex, saveDex } from "@/lib/storage/dexStorage";
import { loadSettings, saveSettings } from "@/lib/storage/settingsStorage";
import { parseGenomeJsonOrRegenerate } from "@/lib/genome/parseGenome";

const CONFIG_OPTIONS = ["preset", "background", "animations"] as const;
type ConfigOption = (typeof CONFIG_OPTIONS)[number];

function nextInCycle<T>(items: readonly T[], current: T): T {
  const idx = items.indexOf(current);
  return items[(idx + 1) % items.length]!;
}

function isEditableTarget(target: EventTarget | null) {
  if (!target) return false;
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select";
}

export function App() {
  const [screen, setScreen] = useState<ScreenId>("dex_list");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [configIndex, setConfigIndex] = useState<number>(0);
  const [toast, setToast] = useState<string | null>(null);

  const [genomes, setGenomes] = useState<Genome[]>(() => loadDex());
  const [settings, setSettings] = useState<Settings>(() => loadSettings());

  useEffect(() => {
    saveDex(genomes);
  }, [genomes]);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  useEffect(() => {
    setSelectedIndex((idx) => {
      if (genomes.length === 0) return 0;
      return Math.min(Math.max(idx, 0), genomes.length - 1);
    });
  }, [genomes.length]);

  const selected =
    genomes.length === 0
      ? undefined
      : genomes[Math.min(Math.max(selectedIndex, 0), genomes.length - 1)];

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 900);
  }, []);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (isEditableTarget(e.target)) return;
      const text = e.clipboardData?.getData("text") ?? "";
      if (!text) return;

      const parsed = parseGenomeJsonOrRegenerate(text);
      if (!parsed.ok) {
        showToast("INVALID");
        return;
      }

      const incoming = parsed.genome;
      const isDupe = genomes.some((g) => g.seed === incoming.seed);
      if (isDupe) {
        showToast("ALREADY");
        return;
      }

      setGenomes([...genomes, incoming]);
      setSelectedIndex(genomes.length);
      setScreen("dex_detail");
      showToast("IMPORTED");
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [genomes, showToast]);

  const handleUp = useCallback(() => {
    if (screen === "config") {
      setConfigIndex((idx) => (idx + CONFIG_OPTIONS.length - 1) % CONFIG_OPTIONS.length);
      return;
    }
    if (screen === "dex_list") setSelectedIndex((idx) => Math.max(0, idx - 1));
  }, [screen]);

  const handleDown = useCallback(() => {
    if (screen === "config") {
      setConfigIndex((idx) => (idx + 1) % CONFIG_OPTIONS.length);
      return;
    }
    if (screen === "dex_list") {
      if (genomes.length === 0) return;
      setSelectedIndex((idx) => Math.min(genomes.length - 1, idx + 1));
    }
  }, [genomes.length, screen]);

  const handleA = useCallback(() => {
    if (screen === "dex_list") {
      if (genomes.length === 0) {
        showToast("EMPTY");
        return;
      }
      setScreen("dex_detail");
      return;
    }

    if (screen === "config") {
      const opt: ConfigOption = CONFIG_OPTIONS[configIndex % CONFIG_OPTIONS.length]!;

      if (opt === "preset") {
        const next = nextInCycle(["classic", "cute", "weird"] as const, settings.generatorPreset);
        setSettings({ ...settings, generatorPreset: next });
        showToast(`PRESET:${next.toUpperCase()}`);
        return;
      }

      if (opt === "background") {
        const next = nextInCycle(["aurora", "grid"] as const, settings.backgroundVariant);
        setSettings({ ...settings, backgroundVariant: next });
        showToast(`BG:${next.toUpperCase()}`);
        return;
      }

      // animations
      setSettings({ ...settings, animations: !settings.animations });
      showToast(settings.animations ? "ANIM:OFF" : "ANIM:ON");
      return;
    }

    showToast("A");
  }, [configIndex, genomes.length, screen, settings, showToast]);

  const handleB = useCallback(() => {
    if (screen === "dex_detail" || screen === "config") {
      setScreen("dex_list");
      return;
    }

    showToast("B");
  }, [screen, showToast]);

  const handleConfig = useCallback(() => {
    setScreen("config");
  }, []);

  const handleList = useCallback(() => {
    setScreen("dex_list");
  }, []);

  const handleDiscover = useCallback(() => {
    const seed = generateUniqueSeed(new Set(genomes.map((g) => g.seed >>> 0)));
    const genome = generateGenome(seed, { preset: settings.generatorPreset });
    const newIndex = genomes.length;

    setGenomes([...genomes, genome]);
    setSelectedIndex(newIndex);
    setScreen("dex_detail");
    showToast("DISCOVERED");
  }, [genomes, settings.generatorPreset, showToast]);

  const handleExport = useCallback(async () => {
    if (!selected) {
      showToast("NO MON");
      return;
    }
    try {
      await navigator.clipboard.writeText(JSON.stringify(selected));
      showToast("COPIED");
    } catch {
      showToast("COPY FAIL");
    }
  }, [selected, showToast]);

  const screenNode = useMemo(() => {
    const width = POKEDEX_SCREEN.width;
    const height = POKEDEX_SCREEN.height;

    if (screen === "dex_list") {
      return (
        <DexListScreen
          width={width}
          height={height}
          genomes={genomes}
          selectedIndex={selectedIndex}
        />
      );
    }

    if (screen === "dex_detail") {
      return (
        <DexDetailScreen
          width={width}
          height={height}
          genome={selected}
          animate={settings.animations}
        />
      );
    }

    return (
      <SystemConfigScreen
        width={width}
        height={height}
        settings={settings}
        selectedIndex={configIndex}
      />
    );
  }, [configIndex, genomes, screen, selected, selectedIndex, settings]);

  return (
    <div
      style={{
        height: "100%",
        position: "relative",
        display: "grid",
        placeItems: "center",
      }}
    >
      <SoothingBackground variant={settings.backgroundVariant} />

      <div style={{ position: "relative" }}>
        <PokedexDeviceSvg
          screen={screenNode}
          toast={toast}
          onDpadUp={handleUp}
          onDpadDown={handleDown}
          onA={handleA}
          onB={handleB}
          onConfig={handleConfig}
          onList={handleList}
          onDiscover={handleDiscover}
          onExport={handleExport}
        />
      </div>
    </div>
  );
}
