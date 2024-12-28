import fs from "node:fs"
import { URL, fileURLToPath } from "node:url"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import IconsResolver from "unplugin-icons/resolver"
import Icons from "unplugin-icons/vite"
import Components from "unplugin-vue-components/vite"
import { createHtmlPlugin } from "vite-plugin-html"
import VueRouter from "unplugin-vue-router/vite"
import { defineConfig } from "vite"
// @ts-expect-error commonjs module
import { defineViteConfig as define } from "./define.config.mjs"
import vueDevTools from "vite-plugin-vue-devtools"
import TurboConsole from "unplugin-turbo-console/vite"
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite"
import { dirname, relative, resolve } from "node:path"
import "dotenv/config"

const PORT = Number(process.env.PORT || "") || 3303

function getImmediateDirectories(dirPath: string): string[] {
  try {
    // Read the directory contents synchronously
    const items = fs.readdirSync(dirPath, { withFileTypes: true })

    // Filter and map to get only directory names
    return items
      .filter((item): item is fs.Dirent => item.isDirectory()) // Type guard
      .map((item) => item.name)
  } catch (err) {
    throw new Error(`Error reading directories: ${(err as Error).message}`)
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
      "~": fileURLToPath(new URL("src", import.meta.url)),
      src: fileURLToPath(new URL("src", import.meta.url)),
      "@assets": fileURLToPath(new URL("src/assets", import.meta.url)),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
        // additionalData: `@use "/src/assets/base.scss";`,
        additionalData: (content, filePath) => {
          // do not include base.scss (tailwind etc) in content-script iframe as it will be affect main page styles
          if (filePath.includes("content-script/index.scss")) {
            return content
          }

          return `@use "/src/assets/base.scss";\n${content}`
        },
      },
    },
  },

  plugins: [
    VueI18nPlugin({
      include: resolve(
        dirname(fileURLToPath(import.meta.url)),
        "./src/locales/**",
      ),
      globalSFCScope: true,
      compositionOnly: true,
    }),

    vueDevTools(),

    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      dts: "src/types/typed-router.d.ts",
      routesFolder: getImmediateDirectories("src/ui").map((dir) => {
        return {
          src: `src/ui/${dir}/pages`,
          path: `${dir}/`,
        }
      }),
    }),

    vue(),

    // imagemin({}),

    TurboConsole(),

    // https://github.com/unplugin/unplugin-auto-import
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "@vueuse/core",
        "pinia",
        {
          "vue-router/auto": ["definePage"],
        },
        {
          "vue-i18n": ["useI18n", "t"],
        },
        {
          "webextension-polyfill": [["*", "browser"]],
        },
        {
          notivue: ["Notivue", "Notification", ["push", "pushNotification"]],
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
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: ["src/components"],
      // generate `components.d.ts` for ts support with Volar
      dts: "src/types/components.d.ts",
      resolvers: [
        // auto import icons
        IconsResolver(),
      ],
      directoryAsNamespace: true,
      globalNamespaces: ["account", "state"],
    }),

    // https://github.com/antfu/unplugin-icons
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
        const assetsPath = relative(dirname(path), "/assets").replace(
          /\\/g,
          "/",
        )
        return html.replace(/"\/assets\//g, `"${assetsPath}/`)
      },
    },

    createHtmlPlugin({
      inject: {
        data: define, // Inject all key-value pairs from defineViteConfig
      },
    }),
  ],

  build: {
    manifest: false,
    outDir: "dist",
    sourcemap: false,
    write: true,
    rollupOptions: {
      // ui or pages that are not specified in manifest file need to be specified here
      input: {
        setup: "src/ui/setup/index.html",
        iframe: "src/ui/content-script-iframe/index.html",
        devtoolsPanel: "src/ui/devtools-panel/index.html",
      },
    },
  },

  server: {
    port: PORT,
    hmr: {
      host: "localhost",
      clientPort: PORT,
      overlay: true,
      protocol: "ws",
      port: PORT,
    },
    origin: `http://localhost:${PORT}`,
  },

  optimizeDeps: {
    include: ["vue", "@vueuse/core", "webextension-polyfill"],
    exclude: ["vue-demi"],
  },

  define,
})
