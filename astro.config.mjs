import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import { remarkAdmonitions } from "./src/plugins/remark-admonitions.mjs";
import { remarkAside } from "./src/plugins/remark-aside.mjs";
import { remarkForgeCards } from "./src/plugins/remark-forge-cards.mjs";

export default defineConfig({
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [
      remarkGfm,
      remarkDirective,
      remarkAdmonitions,
      remarkForgeCards,
      remarkAside,
    ],
    shikiConfig: {
      themes: {
        light: "vitesse-light",
        dark: "vitesse-dark",
      },
      defaultColor: false,
    },
  },
  vite: {
    server: {
      watch: {
        ignored: ["**/.direnv/**", "**/_old/**", "**/node_modules/**"],
      },
    },
  },
});
