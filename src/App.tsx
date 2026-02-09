import { useMemo } from "react";

import {
  POKEDEX_SCREEN,
  PokedexDeviceSvg,
} from "@/components/PokedexDeviceSvg";
import { SoothingBackground } from "@/components/SoothingBackground";
import {
  DexDetailScreen,
  DexListScreen,
  SystemConfigScreen,
} from "@/components/screens";
import { usePokesvgApp } from "@/hooks";

export function App() {
  const {
    screen,
    toast,
    genomes,
    selectedIndex,
    configIndex,
    settings,
    selected,
    onDpadUp,
    onDpadDown,
    onA,
    onB,
    onConfig,
    onList,
    onDiscover,
    onExport,
  } = usePokesvgApp();

  const screenNode = useMemo(() => {
    const width = POKEDEX_SCREEN.width;
    const height = POKEDEX_SCREEN.height;

    if (screen === "dex_list")
      return (
        <DexListScreen
          width={width}
          height={height}
          genomes={genomes}
          selectedIndex={selectedIndex}
        />
      );
    if (screen === "dex_detail")
      return (
        <DexDetailScreen
          width={width}
          height={height}
          genome={selected}
          animate={settings.animations}
        />
      );
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
    <div className="pokesvg-root">
      <SoothingBackground variant={settings.backgroundVariant} />

      <div className="pokesvg-deviceWrap">
        <PokedexDeviceSvg
          screen={screenNode}
          toast={toast}
          onDpadUp={onDpadUp}
          onDpadDown={onDpadDown}
          onA={onA}
          onB={onB}
          onConfig={onConfig}
          onList={onList}
          onDiscover={onDiscover}
          onExport={onExport}
        />
      </div>
    </div>
  );
}
