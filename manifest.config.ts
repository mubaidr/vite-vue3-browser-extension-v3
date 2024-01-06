import { defineManifest } from '@crxjs/vite-plugin'
// @ts-ignore
import packageJson from './package.json'

const { version, name, description, displayName } = packageJson
// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = '0'] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, '')
  // split into version parts
  .split(/[.-]/)

export default defineManifest(async (env) => ({
  name: env.mode === 'staging' ? `[INTERNAL] ${name}` : displayName || name,
  description,
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  manifest_version: 3,
  // key: 'ekgmcbpgglflmgcfajnglpbcbdccnnje',
  action: {
    default_popup: 'src/popup/index.html',
  },
  background: {
    service_worker: 'src/background/index.ts',
  },
  content_scripts: [
    {
      all_frames: false,
      js: ['src/content-script/index.ts'],
      matches: ['*://*/*'],
      run_at: 'document_end',
    },
  ],
  host_permissions: ['*://*/*'],
  options_page: 'src/options/index.html',
  permissions: ['storage'],
  web_accessible_resources: [],
}))
