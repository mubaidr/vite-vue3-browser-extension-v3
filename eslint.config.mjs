import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"
import { includeIgnoreFile } from "@eslint/compat"
import path from "node:path"
import { fileURLToPath } from "node:url"
import AutoImportGlobals from "./src/types/.eslintrc-auto-import.json" with { type: "json" }
import { defineViteConfig as viteDefineVariable } from "./define.config.mjs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, ".gitignore")
const viteDefineGlobals = Object.keys(viteDefineVariable).reduce((acc, key) => {
  acc[key] = "readonly"
  return acc
}, {})

export default [
  includeIgnoreFile(gitignorePath),
  {
    ignores: [
      "node_modules",
      "dist",
      "**/*.js",
      "**/*.d.ts",
      "public",
      "build",
      "coverage",
      "tests",
      "cypress",
      "src/types/**/*",
      "eslint.config.mjs",
    ],
  },
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.worker,
        ...globals.webextensions,
        ...AutoImportGlobals.globals,
        ...viteDefineGlobals,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  {
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "off",
      "no-console": ["warn", { allow: ["info", "warn", "error"] }],
      "no-restricted-globals": "warn",
      "vue/multi-word-component-names": "warn",
      "vue/singleline-html-element-content-newline": "off",
      "vue/html-self-closing": "off",
    },
  },
  {
    files: ["**/*.cjs", "scripts/**/*.{js,mjs,cjs,ts,vue}"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["**/pages/**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
]
