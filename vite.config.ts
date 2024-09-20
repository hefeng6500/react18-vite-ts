import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

const resolve = (value: string) => path.resolve(__dirname, value);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": resolve("src/components"),
      "@utils": resolve("src/utils"),
      "@enums": resolve("src/enums"),
      "@store": resolve("src/store"),
      "@api": resolve("src/api"),
    },
  },
});
