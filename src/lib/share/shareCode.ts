import type { Genome } from "@/lib/genome";

const SHARE_CODE_PREFIX = "pokesvg:";

function toBase64(bytes: Uint8Array): string {
  // Browser path
  if (typeof btoa === "function") {
    let binary = "";
    for (let i = 0; i < bytes.length; i++)
      binary += String.fromCharCode(bytes[i] ?? 0);
    return btoa(binary);
  }

  // Node/test path
  const NodeBuffer = (globalThis as { Buffer?: typeof Uint8Array }).Buffer as
    | undefined
    | { from: (bytes: Uint8Array) => { toString: (enc: "base64") => string } };
  if (NodeBuffer) return NodeBuffer.from(bytes).toString("base64");

  throw new Error("No base64 encoder available");
}

function fromBase64(b64: string): Uint8Array {
  if (typeof atob === "function") {
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }

  const NodeBuffer = (globalThis as { Buffer?: typeof Uint8Array }).Buffer as
    | undefined
    | { from: (b64: string, enc: "base64") => Uint8Array };
  if (NodeBuffer) return new Uint8Array(NodeBuffer.from(b64, "base64"));

  throw new Error("No base64 decoder available");
}

function toBase64Url(b64: string): string {
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(b64url: string): string {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = (4 - (b64.length % 4)) % 4;
  return b64 + "=".repeat(pad);
}

export function encodeShareCode(genome: Genome): string {
  const json = JSON.stringify(genome);
  const bytes = new TextEncoder().encode(json);
  const b64url = toBase64Url(toBase64(bytes));
  return `${SHARE_CODE_PREFIX}${b64url}`;
}

export function decodeShareCodeToJson(
  text: string,
): { ok: true; json: string } | { ok: false; error: string } {
  const trimmed = text.trim();
  if (!trimmed.startsWith(SHARE_CODE_PREFIX))
    return { ok: false, error: "Missing prefix" };

  const payload = trimmed.slice(SHARE_CODE_PREFIX.length).trim();
  if (!payload) return { ok: false, error: "Missing payload" };

  try {
    const bytes = fromBase64(fromBase64Url(payload));
    const json = new TextDecoder().decode(bytes);
    return { ok: true, json };
  } catch {
    return { ok: false, error: "Invalid share code" };
  }
}

export function looksLikeShareCode(text: string): boolean {
  return text.trim().startsWith(SHARE_CODE_PREFIX);
}
