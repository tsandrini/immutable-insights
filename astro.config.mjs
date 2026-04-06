import { defineConfig } from "astro/config";

export default defineConfig({
	vite: {
		server: {
			watch: {
				ignored: ["**/.direnv/**", "**/_old/**", "**/node_modules/**"],
			},
		},
	},
});
