import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  test: {
    environment: "jsdom", // браузерная среда
    globals: true, // позволяет использовать глобальные функции типа `describe`, `it`
    setupFiles: "./src/jest.setup.ts", // можно оставить setup файл, например для RTL
    env: loadEnv(mode, process.cwd(), ""),
    coverage: {
      provider: "v8",
    },
  },
}));
