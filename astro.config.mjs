import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";

export default defineConfig({
	integrations: [mdx()],
	markdown: {
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
