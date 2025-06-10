import fs from "node:fs"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"
import VueRouter from "unplugin-vue-router/vite"
import TurboConsole from "unplugin-turbo-console/vite"
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite"
import ui from "@nuxt/ui/vite"
import "dotenv/config"

// @ts-expect-error commonjs module
import { define, raw } from "./define.config.mjs"
import { dirname, relative, resolve } from "node:path"

const IS_DEV = process.env.NODE_ENV === "development"
const PORT = Number(process.env.PORT) || 3303

const getImmediateDirectories = (path: string) =>
  fs
    .readdirSync(path, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)

export default defineConfig({
  base: IS_DEV ? `/` : "",

  build: {
    watch: IS_DEV ? {} : undefined,
    sourcemap: IS_DEV ? "inline" : false,
    rollupOptions: {
      input: {
        setup: resolve(__dirname, "src/ui/setup/index.html"),
        iframe: resolve(__dirname, "src/ui/content-script-iframe/index.html"),
        devtoolsPanel: resolve(__dirname, "src/ui/devtools-panel/index.html"),
      },
    },
    terserOptions: {
      mangle: false,
    },
  },

  define,

  // legacy: {
  //   // ⚠️ SECURITY RISK: Allows WebSockets to connect to the vite server without a token check ⚠️
  //   // See https://github.com/crxjs/chrome-extension-tools/issues/971 for more info
  //   // The linked issue gives a potential fix that @crxjs/vite-plugin could implement
  //   skipWebSocketTokenCheck: true,
  // },

  optimizeDeps: {
    include: ["vue", "@vueuse/core", "webextension-polyfill"],
    exclude: ["vue-demi"],
  },

  plugins: [
    {
      name: "ensure-output-dir",
      buildStart() {
        ;["dist/chrome", "dist/firefox"].forEach((dir) => {
          if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
        })
      },
    },

    vueDevTools(),

    VueI18nPlugin({
      include: "src/locales/**",
      globalSFCScope: true,
      compositionOnly: true,
    }),

    VueRouter({
      dts: "src/types/typed-router.d.ts",
      routesFolder: getImmediateDirectories("src/ui").map((dir) => ({
        src: `src/ui/${dir}/pages`,
        path: `${dir}/`,
      })),
    }),

    vue(),

    ui({
      autoImport: {
        imports: [
          "vue",
          "vue-router",
          "pinia",
          "@vueuse/core",
          { "vue-router/auto": ["definePage"] },
          { "vue-i18n": ["useI18n", "t"] },
          {
            "webextension-polyfill": [["=", "browser"]],
          },
        ],
        dts: "src/types/auto-imports.d.ts",
        dirs: ["src/composables/**", "src/stores/**", "src/utils/**"],
        vueTemplate: true,
        viteOptimizeDeps: true,
        eslintrc: {
          enabled: true,
          filepath: "src/types/.eslintrc-auto-import.json",
        },
      },
      components: {
        dirs: ["src/components"],
        dts: "src/types/components.d.ts",
        directoryAsNamespace: true,
        globalNamespaces: ["account", "state"],
      },
    }),

    TurboConsole(),

    {
      name: "html-define-plugin",
      enforce: "post",
      transformIndexHtml(html) {
        return html.replace(
          /%+\s*(\w+)\s*%+/g,
          (_, key) => raw[key] ?? `%${key}%`,
        )
      },
    },

    // rewrite assets to use relative path
    {
      name: "assets-rewrite",
      enforce: "post",
      apply: "build",
      transformIndexHtml(html, { path }) {
        return html.replace(
          /"\/assets\//g,
          `"${relative(dirname(path), "/assets")}/`,
        )
      },
    },
  ],

  resolve: {
    alias: {
      "~": fileURLToPath(new URL(".", import.meta.url)),
      "@": fileURLToPath(new URL("src", import.meta.url)),
      src: fileURLToPath(new URL("src", import.meta.url)),
      "@assets": fileURLToPath(new URL("src/assets", import.meta.url)),
    },
  },

  // server: {
  //   port: PORT,
  //   hmr: {
  //     host: "localhost",
  //     overlay: false,
  //   },
  //   origin: `http://localhost:${PORT}`,
  //   cors: {
  //     origin: [
  //       // ⚠️ SECURITY RISK: Allows any chrome-extension to access the vite server ⚠️
  //       // See https://github.com/crxjs/chrome-extension-tools/issues/971 for more info
  //       // I don't believe that the linked issue mentions a potential solution
  //       "chrome-extension://",
  //     ],
  //   },
  // },
})
