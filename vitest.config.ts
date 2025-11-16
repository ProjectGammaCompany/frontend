import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // браузерная среда
    globals: true, // позволяет использовать глобальные функции типа `describe`, `it`
    setupFiles: "./src/jest.setup.ts", // можно оставить setup файл, например для RTL

    coverage: {
      provider: "v8",
    },
  },
});
