import { useCallback, useMemo, useState } from "react";

import { SoothingBackground } from "@/components/SoothingBackground";
import {
  DexDetailScreen,
  DexListScreen,
  SystemConfigScreen,
  type ScreenId,
} from "@/components/screens";
import { PokedexDeviceSvg, POKEDEX_SCREEN } from "@/components/PokedexDeviceSvg";

type DexItem = {
  id: string;
  name: string;
};

const PLACEHOLDER_ITEMS: DexItem[] = [
  { id: "seed_0001", name: "Mon 0001" },
  { id: "seed_0002", name: "Mon 0002" },
  { id: "seed_0003", name: "Mon 0003" },
  { id: "seed_0004", name: "Mon 0004" },
  { id: "seed_0005", name: "Mon 0005" },
];

export function App() {
  const [screen, setScreen] = useState<ScreenId>("dex_list");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const items = PLACEHOLDER_ITEMS;
  const selected = items[Math.min(Math.max(selectedIndex, 0), items.length - 1)];

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 900);
  }, []);

  const handleUp = useCallback(() => {
    setSelectedIndex((idx) => Math.max(0, idx - 1));
  }, []);

  const handleDown = useCallback(() => {
    setSelectedIndex((idx) => Math.min(items.length - 1, idx + 1));
  }, [items.length]);

  const handleA = useCallback(() => {
    if (screen === "dex_list") {
      setScreen("dex_detail");
      return;
    }

    if (screen === "config") {
      showToast("TOGGLED");
      return;
    }

    showToast("A");
  }, [screen, showToast]);

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
    showToast("DISCOVER (stub)");
  }, [showToast]);

  const screenNode = useMemo(() => {
    const width = POKEDEX_SCREEN.width;
    const height = POKEDEX_SCREEN.height;

    if (screen === "dex_list") {
      return (
        <DexListScreen
          width={width}
          height={height}
          items={items}
          selectedIndex={selectedIndex}
        />
      );
    }

    if (screen === "dex_detail") {
      return <DexDetailScreen width={width} height={height} item={selected} />;
    }

    return (
      <SystemConfigScreen
        width={width}
        height={height}
        selectedIndex={selectedIndex}
      />
    );
  }, [items, screen, selected, selectedIndex]);

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
