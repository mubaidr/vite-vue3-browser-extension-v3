import { defineManifest } from '@crxjs/vite-plugin'
import ManifestConfig from './manifest.config'

// @ts-expect-error ManifestConfig provides all required fields
export default defineManifest((_env) => ({
  ...ManifestConfig,
}))
