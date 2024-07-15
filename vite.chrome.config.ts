import { crx } from '@crxjs/vite-plugin'
import { defineConfig } from 'vite'
import manifest from './manifest.chrome.config'
import ViteConfig from './vite.config'

ViteConfig.plugins?.push(
  crx({
    manifest,
    browser: 'chrome',
  })
)

if (!ViteConfig.build) {
  ViteConfig.build={}
}

ViteConfig.build.outDir = 'dist/chrome'

// https://vitejs.dev/config/
export default defineConfig({
  ...ViteConfig,
})
