import { crx } from '@crxjs/vite-plugin'
import { defineConfig } from 'vite'
import manifest from './manifest.firefox.config'
import ViteConfig from './vite.config'

ViteConfig.plugins?.push(
  crx({
    manifest,
    browser: 'firefox',
    contentScripts: {
      injectCss: true,
    },
  })
)

if (!ViteConfig.build) {
  ViteConfig.build = {}
}

ViteConfig.build.outDir = 'dist/firefox'

// https://vitejs.dev/config/
export default defineConfig({
  ...ViteConfig,
})
