export type SettingsSchemaVersion = 1;

export type GeneratorPreset = "classic" | "cute" | "weird";
export type BackgroundVariant = "aurora" | "grid" | "mist";

export type SettingsV1 = {
  schemaVersion: SettingsSchemaVersion;
  generatorPreset: GeneratorPreset;
  backgroundVariant: BackgroundVariant;
  animations: boolean;
};

export type Settings = SettingsV1;

export const DEFAULT_SETTINGS: Settings = {
  schemaVersion: 1,
  generatorPreset: "classic",
  backgroundVariant: "aurora",
  animations: true,
};
