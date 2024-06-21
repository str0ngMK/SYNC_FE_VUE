import { defineConfig } from "vite";
import { createProxyMiddleware } from "http-proxy-middleware";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import path from "path";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
  ],
  define: { "process.env": {}, __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true },
  server: {
    proxy: {
      "/api": {
        target: "https://localhost:9090",
        changeOrigin: true,
        secure: false,
        rejectUnauthorized: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "server.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "server.crt")),
    },
    port: 443,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // axios: require.resolve("axios"),
    },
  },
  /* remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ]
  },
  */
});
