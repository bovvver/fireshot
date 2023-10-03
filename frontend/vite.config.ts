import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@api": "/src/api",
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@config": "/src/config",
      "@env": "/src/env",
      "@hooks": "/src/hooks",
      "@providers": "/src/providers",
      "@styles": "/src/styles",
      "@customTypes": "/src/customTypes",
      "@views": "/src/views",
    },
  },
});
