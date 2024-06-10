import { crx } from '@crxjs/vite-plugin'
import vue from '@vitejs/plugin-vue'
import { dirname, relative } from 'node:path'
import { URL, fileURLToPath } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import { defineViteConfig as define } from './define.config'
import manifest from './manifest.firefox.config'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./src', import.meta.url)),
      src: fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    // legacy({
    //   targets: ['defaults'],
    // }),

    crx({
      manifest,
      browser: 'firefox',
    }),

    vue(),

    Pages({
      dirs: [
        {
          dir: 'src/pages',
          baseRoute: '',
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
          dir: 'src/content-script/iframe/pages',
          baseRoute: 'iframe',
        },
      ],
    }),

    AutoImport({
      imports: ['vue', 'vue-router', 'vue/macros', '@vueuse/core'],
      dts: 'src/types/auto-imports.d.ts',
      dirs: ['src/composables/', 'src/stores/', 'src/utils/'],
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: ['src/components'],
      // generate `components.d.ts` for ts support with Volar
      dts: 'src/types/components.d.ts',
      resolvers: [
        // auto import icons
        IconsResolver({
          prefix: 'i',
          enabledCollections: ['mdi'],
        }),
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
        return html.replace(
          /"\/assets\//g,
          `"${relative(dirname(path), '/assets')}/`
        )
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        iframe: 'src/content-script/iframe/index.html',
        popup: 'src/popup/index.html',
      },
    },
    minify: 'terser',
    terserOptions: {},
    outDir: 'dist/firefox',
  },
  server: {
    port: 8888,
    strictPort: true,
    hmr: {
      port: 8889,
      overlay: false,
    },
  },
  optimizeDeps: {
    include: ['vue', '@vueuse/core'],
    exclude: ['vue-demi'],
  },
  assetsInclude: ['src/assets/*/**'],
  define,
})
