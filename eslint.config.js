import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import boundaries from "eslint-plugin-boundaries";
import importPlugin from "eslint-plugin-import";
import reactDom from "eslint-plugin-react-dom";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactX from "eslint-plugin-react-x";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: ["dist", "node_modules", "coverage"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      reactX.configs["recommended-typescript"],
      reactDom.configs.recommended,
      boundaries.configs["recommended"],
      eslintConfigPrettier,
    ],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
      },
    },
    plugins: { boundaries, import: importPlugin },
    settings: {
      "boundaries/elements": [
        { type: "app", pattern: "src/app/*" },
        { type: "pages", pattern: "src/pages/*" },
        { type: "widgets", pattern: "src/widgets/*" },
        { type: "features", pattern: "src/features/*" },
        { type: "entities", pattern: "src/entities/*" },
        { type: "shared", pattern: "src/shared/*" },
      ],
      "boundaries/include": ["src/**/*.*"],
      "boundaries/entry": ["index.ts", "index.tsx"],
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      ...boundaries.configs.recommended.rules,
      "import/no-unresolved": ["error", { caseSensitive: true }],
      "boundaries/dependencies": [
        2,
        {
          default: "disallow",
          message:
            "${dependency.type} нельзя импортировать в ${file.type}. Импорт слайсов вышележащих слоёв в слайсы нижележащих запрещён.",
          rules: [
            {
              from: { type: "shared" },
              allow: { to: { type: "shared" } },
            },
            {
              from: { type: "entities" },
              allow: { to: { type: "shared" } },
            },
            {
              from: { type: "features" },
              allow: { to: { type: ["entities", "shared"] } },
            },
            {
              from: { type: "widgets" },
              allow: { to: { type: ["features", "entities", "shared"] } },
            },
            {
              from: { type: "pages" },
              allow: {
                to: { type: ["widgets", "features", "entities", "shared"] },
              },
            },
            {
              from: { type: "app" },
              allow: {
                to: {
                  type: ["pages", "widgets", "features", "entities", "shared"],
                },
              },
            },
            {
              message:
                "Разрешён импорт только из public API слайса (index.ts / index.tsx).",
              to: {
                type: ["app", "pages", "widgets", "features", "entities"],
                internalPath: "!index.ts",
              },
              disallow: {
                from: {
                  type: "*",
                },
              },
            },
          ],
        },
      ],
    },
  },
]);
