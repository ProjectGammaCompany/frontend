import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import boundaries from "eslint-plugin-boundaries";
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
    plugins: { boundaries },
    settings: {
      "boundaries/elements": [
        { type: "app", pattern: "src/app/*" },
        { type: "pages", pattern: "pages/*" },
        { type: "widgets", pattern: "widgets/*" },
        { type: "features", pattern: "features/*" },
        { type: "entities", pattern: "entities/*" },
        { type: "shared", pattern: "shared/*" },
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
      "boundaries/entry-point": [
        "error",
        {
          default: "disallow",
          message:
            "Разрешён импорт только из index.ts. Глубокие импорты между слайсами запрещены.",
          rules: [
            {
              target: ["app", "pages", "widgets", "features", "entities"],
              allow: ["index.ts", "index.tsx"],
              importKind: "value",
            },
            {
              target: ["shared"],
              allow: "*",
            },
          ],
        },
      ],
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          message:
            "${dependency.type} нельзя импортировать в ${file.type}. Импорт слайсов вышележащих слоёв в слайсы нижележащих запрещён.",
          rules: [
            {
              from: "shared",
              allow: ["shared"],
            },
            {
              from: "entities",
              allow: ["shared"],
            },
            {
              from: "features",
              allow: ["entities", "shared"],
            },
            {
              from: "widgets",
              allow: ["features", "entities", "shared"],
            },
            {
              from: "pages",
              allow: ["widgets", "features", "entities", "shared"],
            },
            {
              from: "app",
              allow: ["pages", "widgets", "features", "entities", "shared"],
            },
          ],
        },
      ],
    },
  },
]);
