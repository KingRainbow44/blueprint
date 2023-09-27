import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import { crx } from "@crxjs/vite-plugin";
import preact from "@preact/preset-vite";
import tsconfigPaths from "vite-tsconfig-paths";

import manifest from "./src/manifest.json";
import postcss from "./cfg/postcss.config.js";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [ preact(), tsconfigPaths(), crx({ manifest }), svgr() ],
    css: { postcss }
});
