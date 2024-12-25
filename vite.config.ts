import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import vueDevTools from 'vite-plugin-vue-devtools'
import TurboConsole from 'unplugin-turbo-console/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { defineViteConfig as define } from './define.config'

// eslint-disable-next-line node/prefer-global/process
const PORT = Number(process.env.PORT || '') || 3303

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: PORT,
    hmr: {
      host: 'localhost',
      clientPort: PORT,
      overlay: true,
      protocol: 'ws',
      port: PORT,
    },
    origin: `http://localhost:${PORT}`,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./src', import.meta.url)),
      src: fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('src/assets', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
        additionalData: `@use "/src/assets/base.scss";`,
      },
    },
  },
  plugins: [
    VueI18nPlugin({
      include: resolve(
        dirname(fileURLToPath(import.meta.url)),
        './src/locales/**'
      ),
      globalSFCScope: true,
      compositionOnly: true,
    }),
    vue(),
    vueDevTools(),
    Pages({
      dirs: [
        {
          dir: 'src/pages',
          baseRoute: 'common',
        },
        {
          dir: 'src/setup/pages',
          baseRoute: 'setup',
        },
        {
          dir: 'src/popup/pages',
          baseRoute: 'popup',
        },
        {
          dir: 'src/options/pages',
          baseRoute: 'options',
        },
        {
          dir: 'src/content-script/iframe/pages',
          baseRoute: 'iframe',
        },
      ],
    }),

    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        {
          'vue-router/auto': ['definePage'],
        },
        {
          'vue-i18n': ['useI18n', 't'],
        },
        {
          'webextension-polyfill': [['*', 'browser']],
        },
      ],
      dts: 'src/types/auto-imports.d.ts',
      dirs: ['src/composables/', 'src/stores/', 'src/utils/'],
      eslintrc: {
        enabled: true,
        filepath: 'src/types/.eslintrc-auto-import.json',
      },
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: ['src/components'],
      // generate `components.d.ts` for ts support with Volar
      dts: 'src/types/components.d.ts',
      resolvers: [
        // auto import icons
        IconsResolver(),
      ],
    }),

    // https://github.com/antfu/unplugin-icons
    Icons({
      autoInstall: true,
      compiler: 'vue3',
      scale: 1.5,
    }),
    // rewrite assets to use relative path
    {
      name: 'assets-rewrite',
      enforce: 'post',
      apply: 'build',
      transformIndexHtml(html, { path }) {
        const assetsPath = relative(dirname(path), '/assets').replace(
          /\\/g,
          '/'
        )
        return html.replace(/"\/assets\//g, `"${assetsPath}/`)
      },
    },
    TurboConsole(),
  ],
  build: {
    rollupOptions: {
      input: {
        setup: 'src/setup/index.html',
        iframe: 'src/content-script/iframe/index.html',
        devtoolsPanel: 'src/devtools-panel/index.html',
      },
    },
  },
  optimizeDeps: {
    include: ['vue', '@vueuse/core', 'webextension-polyfill'],
    exclude: ['vue-demi'],
  },
  assetsInclude: ['src/assets/*/**'],
  define,
})
