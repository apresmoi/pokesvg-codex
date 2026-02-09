import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

function computeBase() {
  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
  const owner = process.env.GITHUB_REPOSITORY?.split("/")[0];

  // GitHub Pages project sites are served under /<repo>/, but user/org pages are rooted.
  if (!process.env.GITHUB_ACTIONS || !repo || !owner) return "/";
  if (repo === `${owner}.github.io`) return "/";
  return `/${repo}/`;
}

export default defineConfig({
  base: process.env.VITE_BASE ?? computeBase(),
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
