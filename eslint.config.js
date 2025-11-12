import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";
import boundaries from "eslint-plugin-boundaries";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  {
    ignores: ["dist", "node_modules"],
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
        { type: "process", pattern: "process/*" },
        { type: "pages", pattern: "pages/*" },
        { type: "widgets", pattern: "widgets/*" },
        { type: "features", pattern: "features/*" },
        { type: "entities", pattern: "entities/*" },
        { type: "shared", pattern: "shared/*" },
      ],
      "boundaries/include": ["src/**/*.*"],
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          message:
            "${dependency.type} нельзя импортировать в ${file.type}. Импорт слайсов вышележащих слоёв в слайсы нижележащих запрещён.",
          rules: [
            {
              from: "shared",
              allow: [],
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
              from: "process",
              allow: ["pages", "widgets", "features", "entities", "shared"],
            },
            {
              from: "app",
              allow: [
                "process",
                "pages",
                "widgets",
                "features",
                "entities",
                "shared",
              ],
            },
          ],
        },
      ],
    },
  },
]);
