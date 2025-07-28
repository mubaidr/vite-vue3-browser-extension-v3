# Vite Vue 3 Browser Extension (Manifest V3)

[![Build Status](https://github.com/mubaidr/vite-vue3-browser-extension-v3/actions/workflows/build.yml/badge.svg)](https://github.com/mubaidr/vite-vue3-browser-extension-v3/actions/workflows/build.yml)


Modern, opinionated starter template for browser extensions using [Vite](https://vitejs.dev/), [Vue 3](https://vuejs.org/), and Manifest V3. Supports Chrome, Firefox, and more. Includes file-based routing, state management, composables, and rich UI components.



## Features

- Multi-context: background, popup, options, content script, devtools, side panel, offscreen
- File-based routing (auto-register UI pages)
- Vue 3 Composition API, Pinia, composables
- Nuxt/UI v3, shadcn-vue, Tailwind CSS 4
- WebExtension utilities: `webext-bridge`, `webextension-polyfill`



## Quick Start

```bash
npx degit mubaidr/vite-vue3-browser-extension-v3 my-webext
cd my-webext
npm install
npm run dev
```

- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Dev (Chrome/Firefox)**: `npm run dev:chrome` / `npm run dev:firefox`

Load the extension from the `dist/chrome` or `dist/firefox` folder in your browser.



---

## Developer Documentation

See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for architecture, design principles, folder structure, and best practices.

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or new features.

---

## Support

If you find this project useful, please consider [supporting the author](https://www.patreon.com/c/mubaidr) and starring ⭐ the repository.
