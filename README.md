## Please take a moment to fill out our 3 question [Feedback Form](https://forms.gle/2nzS2AQkVGmqHTLV6) and let us know if you would be interested in purchasing template, along with any features you would like to see.

We're developing a new and improved browser extension template with exciting features like authentication, payment processing, and more. Your feedback is crucial to us!
Thank you for your time and support!

**Note:** Your responses will help shape the future of this project and ensure we meet your needs better.

---

# vite-vue3-browser-extension-v3

[![build](https://github.com/mubaidr/vite-vue3-browser-extension-v3/actions/workflows/build.yml/badge.svg)](https://github.com/mubaidr/vite-vue3-browser-extension-v3/actions/workflows/build.yml) [![release](https://github.com/mubaidr/vite-vue3-browser-extension-v3/actions/workflows/release.yml/badge.svg)](https://github.com/mubaidr/vite-vue3-browser-extension-v3/actions/workflows/release.yml)

A [Vite](https://vitejs.dev/) powered WebExtension ([Chrome](https://developer.chrome.com/docs/extensions/reference/), [FireFox](https://addons.mozilla.org/en-US/developers/), etc.) starter template based on `manifest 3`, `vue3` and `vite`.


## Features

- Vue 3 - Composition API, `Script setup` and more!
- Vue 3 app in Content Script too (template added)
- Vue devtools support
- HMR for extension pages and content scripts, with Firefox support
- Sample `onInstall` & `onUpdate` pages
- [`Tailwind`](https://tailwindcss.com/) css And [`daisyUI`](https://daisyui.com/)
- Tailwindcss plugins for Typography, forms, prettier and daisy ui
- Vue Router setup incuding `unplugin-vue-router` for automatic route registration
- vscode recommended settings and extensions for extension/ plugin development
- Effortless communications - powered by [`webext-bridge`](https://github.com/zikaari/webext-bridge)
- [Components auto importing](./src/components)
- [Icons](./src/components) - Access to icons from any iconset directly
  - By default [Material Design Icons](https://materialdesignicons.com/cdn/1.6.50-dev/) set is enabled
- [TypeScript](https://www.typescriptlang.org/) - type safe
- `Eslint` & `Prettier` configured for `vue`, `javascript`, `TypeScript`
- [CRXJS Vite Plugin](https://crxjs.dev/vite-plugin) Build Chrome, Firefox and Other Extensions with Vite
- Github build and release actions

_Please create an issue if you feel some feature is missing or could be improved._

## Pre-packed

### Vite Plugins

- [`unplugin-vue-router`](https://github.com/posva/unplugin-vue-router) - File system based route generator for Vite
- [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) - Directly use `browser` and Vue Composition API without importing
- [`unplugin-vue-components`](https://github.com/antfu/vite-plugin-components) - components auto import
- [`unplugin-icons`](https://github.com/antfu/unplugin-icons) - icons as components

### Vue Plugins

- [Pinia](https://pinia.vuejs.org/) - Intuitive, type safe, light and flexible Store for Vue
- [VueUse](https://github.com/antfu/vueuse) - collection of useful composition APIs

### Plugins

- [Marked](https://github.com/markedjs/marked) - A markdown parser and compiler. Used for CHANGELOG.md to show in Update page

### UI Frameworks

- [tailwindcss](https://tailwindcss.com) - A utility-first CSS framework
- [daisyUI](https://daisyui.com/) - The most popular component library for Tailwind CSS

Tailwind css `forms` and `typography` plugins are enabled for default styling of form controls.

### WebExtension Libraries

- [`webext-bridge`](https://github.com/zikaari/webext-bridge) - effortlessly communication between contexts

### Coding Style

- Use Composition API with [`<script setup>` SFC syntax](https://github.com/vuejs/rfcs/pull/227)
- Use Composition API with [`setup` SFC syntax](https://pinia.vuejs.org/cookbook/composables.html#Setup-Stores) in Pinia stores

## Use the Template

### GitHub Template

[Create a repo from this template on GitHub](https://github.com/mubaidr/vite-vue3-browser-extension-v3/generate).

### Clone to local

If you prefer to do it manually with the cleaner git history

> If you don't have pnpm installed, run: npm install -g pnpm

```bash
pnpx degit mubaidr/vite-vue3-browser-extension-v3 my-webext
cd my-webext
pnpm i
```

## Usage

### Project Structure

- `src` - main source.
  - `content-script` - scripts and components to be injected as `content_script`
    - `iframe` content script iframe vue3 app which will be injected into page
  - `background` - scripts for background.
  - `popup` - popup vuejs application root
    - `pages` - popup pages
  - `options` - options vuejs application root
    - `pages` - options pages
  - `setup` - Page for Install and Update extension events
    - `pages` - pages for install and update events
  - `offscreen` - extension offscreen pages, can be used for audio, screen recording etc
  - `pages` - application pages, common to all views (About, Contact, Authentication etc)
  - `components` - auto-imported Vue components that are shared in popup and options page.
  - `assets` - assets used in Vue components
- `dist` - built files
  - `chrome` - Chrome extension, can be publishd to Opera, Edge and toher chromium based browsers store etc
  - `firefox` - Firefox extension

### Browser Related Configurations

- `manifest.config.ts` - Base extension manifest with common configuration
- `manifest.chrome.config.ts` - Chrome/ chromium based browsers specific manifest
- `manifest.firefox.config.ts` - Firefox spefic manifest
- `vite.config.ts` - Base vite configuration
- `vite.chrome.config.ts` - Chrome/ chromium based browsers specific vite configuration
- `vite.firefox.config.ts` - Firefox specific vite configuration

### Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build extension
- `pnpm lint` - Lint files

_You can also use pnpm dev:chrome, pnpm dev:firefox, pnpm build:chrome, pnpm build:firefox, pnpm lint:fix_

### Extra info

In [src/background/index.ts](./src/background/index.ts) you can find an example of chrome.runtime.onInstalled.addListener.

We add `?type` to the url to tell if it's update or install event. Then in [src/setup/pages/index.ts](./src/setup/pages/index.ts) we check for the `type` and show the appropriate page.

### Development

```bash
pnpm dev
```

Then **load extension in browser with the `dist/` folder**.

### Build

To build the extension, run

```bash
pnpm build
```

And then pack files under `dist/chrome` or `dist/firefox`, you can upload to appropriate extension store.

## Contributors

<!-- readme: collaborators,contributors -start -->
<table>
	<tbody>
		<tr>
            <td align="center">
                <a href="https://github.com/mubaidr">
                    <img src="https://avatars.githubusercontent.com/u/2222702?v=4" width="100;" alt="mubaidr"/>
                    <br />
                    <sub><b>Muhammad Ubaid Raza</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/ultimateshadsform">
                    <img src="https://avatars.githubusercontent.com/u/151234273?v=4" width="100;" alt="ultimateshadsform"/>
                    <br />
                    <sub><b>Alexander</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/baramofme">
                    <img src="https://avatars.githubusercontent.com/u/44565599?v=4" width="100;" alt="baramofme"/>
                    <br />
                    <sub><b>Jihoon Yi</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/poncianodiego">
                    <img src="https://avatars.githubusercontent.com/u/20716004?v=4" width="100;" alt="poncianodiego"/>
                    <br />
                    <sub><b>Diego Ponciano</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/IgorFZ">
                    <img src="https://avatars.githubusercontent.com/u/85708187?v=4" width="100;" alt="IgorFZ"/>
                    <br />
                    <sub><b>igorfz</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/justorez">
                    <img src="https://avatars.githubusercontent.com/u/17308328?v=4" width="100;" alt="justorez"/>
                    <br />
                    <sub><b>Null</b></sub>
                </a>
            </td>
		</tr>
	<tbody>
</table>
<!-- readme: collaborators,contributors -end -->
