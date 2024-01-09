import packageJson from './package.json'

const jsn = (value: string) => JSON.stringify(value)

// Don't forget to add your added variables to vite-env.d.ts also!

export const defineViteConfig = {
  __VERSION__: jsn(packageJson.version),
  __DISPLAY_NAME__: jsn(packageJson.displayName),
}
