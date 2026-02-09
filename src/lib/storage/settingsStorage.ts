import {
  DEFAULT_SETTINGS,
  type Settings,
  type SettingsV1,
} from "@/lib/settings";

export const SETTINGS_STORAGE_KEY = "pokesvg.settings.v1";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isSettingsV1(value: unknown): value is SettingsV1 {
  if (!isRecord(value)) return false;
  if (value.schemaVersion !== 1) return false;
  if (
    value.generatorPreset !== "classic" &&
    value.generatorPreset !== "cute" &&
    value.generatorPreset !== "weird"
  ) {
    return false;
  }
  if (
    value.backgroundVariant !== "aurora" &&
    value.backgroundVariant !== "grid" &&
    value.backgroundVariant !== "mist"
  ) {
    return false;
  }
  if (typeof value.animations !== "boolean") return false;
  return true;
}

export function loadSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed: unknown = JSON.parse(raw);
    if (!isSettingsV1(parsed)) return DEFAULT_SETTINGS;
    return parsed;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: Settings) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}
