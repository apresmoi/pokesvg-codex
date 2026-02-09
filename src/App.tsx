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
import { loadDex, saveDex } from "@/lib/storage/dexStorage";

export function App() {
  const [screen, setScreen] = useState<ScreenId>("dex_list");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [configIndex, setConfigIndex] = useState<number>(0);
  const [toast, setToast] = useState<string | null>(null);

  const [genomes, setGenomes] = useState<Genome[]>(() => loadDex());

  useEffect(() => {
    saveDex(genomes);
  }, [genomes]);

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

  const handleUp = useCallback(() => {
    if (screen === "config") {
      setConfigIndex((idx) => Math.max(0, idx - 1));
      return;
    }
    if (screen === "dex_list") setSelectedIndex((idx) => Math.max(0, idx - 1));
  }, [screen]);

  const handleDown = useCallback(() => {
    if (screen === "config") {
      setConfigIndex((idx) => idx + 1);
      return;
    }
    if (screen === "dex_list") {
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
      showToast("TOGGLED");
      return;
    }

    showToast("A");
  }, [genomes.length, screen, showToast]);

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
    const genome = generateGenome(seed);
    const newIndex = genomes.length;

    setGenomes([...genomes, genome]);
    setSelectedIndex(newIndex);
    setScreen("dex_detail");
    showToast("DISCOVERED");
  }, [genomes, showToast]);

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
      return <DexDetailScreen width={width} height={height} genome={selected} />;
    }

    return (
      <SystemConfigScreen
        width={width}
        height={height}
        selectedIndex={configIndex}
      />
    );
  }, [configIndex, genomes, screen, selected, selectedIndex]);

  return (
    <div
      style={{
        height: "100%",
        position: "relative",
        display: "grid",
        placeItems: "center",
      }}
    >
      <SoothingBackground />

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
        />
      </div>
    </div>
  );
}
