import type { Prng } from "@/lib/prng";

const CONSONANTS = [
  "b",
  "c",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "n",
  "p",
  "r",
  "s",
  "t",
  "v",
  "w",
  "z",
  "ch",
  "sh",
  "th",
] as const;

const VOWELS = ["a", "e", "i", "o", "u", "ae", "io", "oa"] as const;

function capitalize(s: string) {
  return s.length === 0 ? s : s[0].toUpperCase() + s.slice(1);
}

export function generateName(prng: Prng) {
  const syllables = prng.nextInt(2, 4);
  let out = "";
  for (let i = 0; i < syllables; i++) {
    const c = prng.pick(CONSONANTS);
    const v = prng.pick(VOWELS);
    out += `${c}${v}`;
    if (prng.bool(0.12)) out += "r";
    if (prng.bool(0.08)) out += "n";
  }

  // Trim to something name-like.
  out = out.slice(0, prng.nextInt(4, 9));
  return capitalize(out);
}

