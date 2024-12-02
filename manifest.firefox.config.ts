import { defineManifest } from '@crxjs/vite-plugin'
import ManifestConfig from './manifest.config'

// remove unsupported fields
// @ts-expect-error ManifestConfig provides all required fields
delete ManifestConfig.offline_enabled;
// @ts-expect-error ManifestConfig provides all required fields
delete ManifestConfig.version_name;

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
  // @ts-expect-error ManifestConfig provides all required fields
  permissions: ManifestConfig.permissions.filter(
    (permission) => permission !== 'background'
  ),
}))
