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
    encounter,
    settings,
    detailGenome,
    onDpadUp,
    onDpadDown,
    onDpadLeft,
    onDpadRight,
    onA,
    onB,
    onConfig,
    onDiscover,
    onExport,
  } = usePokesvgApp();

  const screenNode = useMemo(() => {
    const width = POKEDEX_SCREEN.width;
    const height = POKEDEX_SCREEN.height;

    if (screen === "dex_list")
      return (
        <g key={screen} className="pokesvg-screen">
          <DexListScreen
            width={width}
            height={height}
            genomes={genomes}
            selectedIndex={selectedIndex}
          />
        </g>
      );
    if (screen === "dex_detail")
      return (
        <g key={screen} className="pokesvg-screen">
          <DexDetailScreen
            width={width}
            height={height}
            genome={detailGenome}
            animate={settings.animations}
            isEncounter={encounter !== null}
          />
        </g>
      );
    return (
      <g key={screen} className="pokesvg-screen">
        <SystemConfigScreen
          width={width}
          height={height}
          settings={settings}
          selectedIndex={configIndex}
        />
      </g>
    );
  }, [
    configIndex,
    detailGenome,
    encounter,
    genomes,
    screen,
    selectedIndex,
    settings,
  ]);

  return (
    <div className="pokesvg-root">
      <SoothingBackground variant={settings.backgroundVariant} />

      <div className="pokesvg-deviceWrap">
        <PokedexDeviceSvg
          screen={screenNode}
          toast={toast}
          onDpadUp={onDpadUp}
          onDpadDown={onDpadDown}
          onDpadLeft={onDpadLeft}
          onDpadRight={onDpadRight}
          onA={onA}
          onB={onB}
          onConfig={onConfig}
          onDiscover={onDiscover}
          onExport={onExport}
        />
      </div>
    </div>
  );
}
