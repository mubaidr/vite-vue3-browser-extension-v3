import fs from "node:fs"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"
import VueRouter from "unplugin-vue-router/vite"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"
import { createHtmlPlugin } from "vite-plugin-html"
import TurboConsole from "unplugin-turbo-console/vite"
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite"
import tailwindcss from "@tailwindcss/vite"
import "dotenv/config"

// @ts-expect-error commonjs module
import { defineViteConfig as define } from "./define.config.mjs"
import { resolve } from "node:path"

const IS_DEV = process.env.NODE_ENV === "development"
const PORT = Number(process.env.PORT) || 3303

const getImmediateDirectories = (path: string) =>
  fs
    .readdirSync(path, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)

export default defineConfig({
  base: IS_DEV ? "/" : "",

  build: {
    rollupOptions: {
      input: {
        setup: resolve(__dirname, "src/ui/setup/index.html"),
        iframe: resolve(__dirname, "src/ui/content-script-iframe/index.html"),
        devtoolsPanel: resolve(__dirname, "src/ui/devtools-panel/index.html"),
      },
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: (content, filePath) =>
          filePath.includes("content-script/index.scss")
            ? content
            : `@use "/src/assets/base.scss";\n${content}`,
      },
    },
  },

  define,

  legacy: { skipWebSocketTokenCheck: true },

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

    tailwindcss(),

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

    TurboConsole(),

    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "pinia",
        "@vueuse/core",
        { "vue-router/auto": ["definePage"] },
        { "vue-i18n": ["useI18n", "t"] },
        { "webextension-polyfill": [["*", "browser"]] },
        { notivue: ["Notivue", "Notification", ["push", "pushNotification"]] },
      ],
      dts: "src/types/auto-imports.d.ts",
      dirs: ["src/composables/**", "src/stores/**", "src/utils/**"],
      vueTemplate: true,
      viteOptimizeDeps: true,
      eslintrc: {
        enabled: true,
        filepath: "src/types/.eslintrc-auto-import.json",
      },
    }),

    Components({
      dirs: ["src/components"],
      dts: "src/types/components.d.ts",
      resolvers: [IconsResolver()],
      directoryAsNamespace: true,
      globalNamespaces: ["account", "state"],
    }),

    Icons({
      autoInstall: true,
      compiler: "vue3",
      scale: 1.5,
    }),

    {
      name: "assets-rewrite",
      enforce: "post",
      apply: "build",
      transformIndexHtml(html, { path }) {
        const assetsPath = path
          .replace(/\/[^/]+$/, "/assets")
          .replace(/\\/g, "/")
        return html.replace(/"\/assets\//g, `"${assetsPath}/`)
      },
    },

    createHtmlPlugin({ inject: { data: define } }),
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
      "~": fileURLToPath(new URL("src", import.meta.url)),
      src: fileURLToPath(new URL("src", import.meta.url)),
      "@assets": fileURLToPath(new URL("src/assets", import.meta.url)),
    },
  },

  server: {
    port: PORT,
    hmr: {
      host: "localhost",
      clientPort: PORT,
      overlay: true,
      protocol: "ws",
    },
    origin: `http://localhost:${PORT}`,
    cors: { origin: "*" },
  },
})
