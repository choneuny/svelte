import postcss from "./postcss.config.js";
import sveltePreprocess from "svelte-preprocess";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	base: "",
	build: {
		rollupOptions: {
			input: {
				main: "./index.html",
			},
		},
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess(),
		}),
	],
	css: {
		postcss,
	},
});
