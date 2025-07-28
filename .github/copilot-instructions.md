# Copilot AI Agent Instructions

## Project Overview

- This is a modern, multi-context browser extension template using Vite, Vue 3, and Manifest V3.
- Major contexts: background, popup, options, content script, devtools, side panel, offscreen (see `src/` subfolders).
- UI is modular, file-based, and auto-routed from `src/ui/*/pages`.
- State is managed with Pinia; cross-context communication uses `webext-bridge` and `webextension-polyfill`.
- UI components: Nuxt/UI v3, shadcn-vue, styled with Tailwind CSS 4.

## Key Workflows

- **Development**: `npm run dev` (runs Chrome and Firefox dev builds concurrently)
- **Build**: `npm run build` (builds for both Chrome and Firefox)
- **Lint**: `npm run lint` (ESLint + Prettier)
- **Typecheck**: `npm run typecheck` (Vue TSC)
- **Load extension**: Use `dist/chrome` or `dist/firefox` in browser

## Architecture & Patterns

- **File-based Routing**: Add Vue files to `src/ui/<context>/pages/` for auto-registration as routes.
- **Composables**: Shared logic in `src/composables/` (e.g., theme, i18n, browser storage)
- **Pinia Stores**: State in `src/stores/`, auto-imported where needed
- **TypeScript**: Strict, enforced everywhere
- **Auto-imports**: Functions, stores, and components are auto-imported (see Vite config)
- **Error Handling**: Use `console.info` for logging in background/content scripts
- **Cross-context Communication**: Use `webext-bridge` for messaging between extension contexts

## Integration Points

- **Browser APIs**: Use `webextension-polyfill` for compatibility
- **UI Components**: Use Nuxt/UI and shadcn-vue; add new shadcn-vue components via CLI
- **i18n**: Locales in `src/locales/`, managed via Vue I18n

## Project-specific Conventions

- Place new UI pages in `src/ui/<context>/pages/`
- Use composables for shared logic, not mixins
- Keep components small and focused
- Use strict TypeScript and auto-imports
- Prefer file-based routing and modular structure

## Examples

- See `src/background/index.ts` for install/update logic
- See `src/content-script/index.ts` for DOM injection
- See `src/ui/action-popup/app.vue` for UI entrypoint pattern
- See `src/utils/router/index.ts` for router setup

## References

- For detailed architecture and design principles, see [docs/DEVELOPMENT.md](../docs/DEVELOPMENT.md)
- For usage and contribution, see [README.md](../README.md)
