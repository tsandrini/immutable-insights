import { fileURLToPath } from "node:url";
import mdx from "@astrojs/mdx";
import postcssGlobalData from "@csstools/postcss-global-data";
import { defineConfig } from "astro/config";
import postcssCustomMedia from "postcss-custom-media";
import rehypeKatex from "rehype-katex";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { rehypeEmojiMutant } from "./src/plugins/rehype-emoji-mutant.mjs";
import { remarkAdmonitions } from "./src/plugins/remark-admonitions.mjs";
import { remarkAside } from "./src/plugins/remark-aside.mjs";
import { remarkForgeCards } from "./src/plugins/remark-forge-cards.mjs";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";
import { remarkUnwrapDirectives } from "./src/plugins/remark-unwrap-directives.mjs";

export default defineConfig({
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [
      remarkGfm,
      remarkReadingTime,
      remarkDirective,
      remarkAdmonitions,
      remarkForgeCards,
      remarkAside,
      remarkUnwrapDirectives,
      remarkMath,
    ],
    rehypePlugins: [rehypeKatex, rehypeEmojiMutant],
    shikiConfig: {
      themes: {
        light: "vitesse-light",
        dark: "vitesse-dark",
      },
      defaultColor: false,
    },
  },
  vite: {
    css: {
      postcss: {
        plugins: [
          postcssGlobalData({
            files: [
              fileURLToPath(
                new URL("./src/styles/custom-media.css", import.meta.url),
              ),
            ],
          }),
          postcssCustomMedia(),
        ],
      },
    },
    server: {
      watch: {
        ignored: ["**/.direnv/**", "**/_old/**", "**/node_modules/**"],
      },
    },
  },
});
