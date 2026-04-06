import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";
import remarkDirective from "remark-directive";
import { remarkAdmonitions } from "./src/plugins/remark-admonitions.mjs";
import { remarkForgeCards } from "./src/plugins/remark-forge-cards.mjs";

export default defineConfig({
	integrations: [mdx()],
	markdown: {
		remarkPlugins: [remarkDirective, remarkAdmonitions, remarkForgeCards],
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
