import fs from "node:fs"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"
import VueRouter from "unplugin-vue-router/vite"
import AutoImport from "unplugin-auto-import/vite"
import { VueRouterAutoImports } from "unplugin-vue-router"
import Components from "unplugin-vue-components/vite"
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"
import TurboConsole from "unplugin-turbo-console/vite"
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite"
import tailwindcss from "@tailwindcss/vite"
import "dotenv/config"

// @ts-expect-error commonjs module
import { defineViteConfig as define } from "./define.config.mjs"
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

  legacy: {
    // ⚠️ SECURITY RISK: Allows WebSockets to connect to the vite server without a token check ⚠️
    // See https://github.com/crxjs/chrome-extension-tools/issues/971 for more info
    // The linked issue gives a potential fix that @crxjs/vite-plugin could implement
    skipWebSocketTokenCheck: true,
  },

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
        // "vue-router",
        VueRouterAutoImports,
        "pinia",
        "@vueuse/core",
        // { "vue-router/auto": ["definePage"] },
        { "vue-i18n": ["useI18n", "t"] },
        {
          "webextension-polyfill": [["=", "browser"]],
        },
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
      globalNamespaces: ["auth", "state"],
    }),

    Icons({
      autoInstall: true,
      compiler: "vue3",
      scale: 1.5,
    }),

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
    },
    origin: `http://localhost:${PORT}`,
    cors: {
      origin: [
        // ⚠️ SECURITY RISK: Allows any chrome-extension to access the vite server ⚠️
        // See https://github.com/crxjs/chrome-extension-tools/issues/971 for more info
        // I don't believe that the linked issue mentions a potential solution
        /chrome-extension:\/\//,
      ],
    },
  },
})
