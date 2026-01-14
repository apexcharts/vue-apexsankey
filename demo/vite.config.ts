import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/vue-apexsankey/" : "/",
  plugins: [vue()],
  resolve: {
    alias: {
      "vue-apexsankey": resolve(__dirname, "../src/index.ts"),
    },
  },
});
