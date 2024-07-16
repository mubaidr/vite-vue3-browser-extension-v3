import { defineManifest } from '@crxjs/vite-plugin'
import ManifestConfig from './manifest.config'

// @ts-expect-error ManifestConfig provides all required fields
export default defineManifest((_env) => ({
  ...ManifestConfig,
  browser_specific_settings: {
    gecko: {
      id: '{2e4f5834-d742-411d-bfe1-49fc4433aaa1}', // ID from manifest.config.ts
    },
  },
  background: {
    scripts: ['src/background/index.ts'],
    type: 'module',
    persistent: false,
  },
  // @ts-expect-error
  permissions: ManifestConfig.permissions.filter(
    (permission) => permission !== 'background'
  ),
}))
