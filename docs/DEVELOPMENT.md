# Developer Guide

## Project Architecture

- **Multi-Context Extension**: Supports background, popup, options, content script, devtools, side panel, and offscreen pages.
- **File-Based Routing**: UI routes are auto-registered from `src/ui/*/pages`.
- **Composable & Modular**: Uses Vue 3 Composition API, Pinia for state, and composables for i18n, theme, storage, etc.
- **UI**: Nuxt/UI v3 and shadcn-vue for components, styled with Tailwind CSS 4.
- **WebExtension Utilities**: Uses `webext-bridge` and `webextension-polyfill` for browser API compatibility.

## Folder Structure

- `src/assets/`: Global assets (CSS, images)
- `src/background/`: Background scripts (lifecycle, install/update logic)
- `src/components/`: Shared Vue components
- `src/composables/`: Vue composables (hooks)
- `src/content-script/`: Content scripts (DOM injection, page interaction)
- `src/devtools/`, `src/offscreen/`, `src/side-panel/`: Specialized extension contexts
- `src/stores/`: Pinia stores (state management)
- `src/types/`: TypeScript definitions
- `src/ui/`: UI entrypoints (popup, options, setup, etc.)
- `src/utils/`: Shared utilities (router, i18n, pinia, etc.)

## Design Principles

- **Type Safety**: Strict TypeScript everywhere.
- **Composition API**: Use `<script setup>` and composables for logic reuse.
- **Auto-Imports**: Functions, stores, and components are auto-imported.
- **Single Responsibility**: Each file/folder has a clear, focused purpose.
- **Minimal Boilerplate**: Prefer concise, readable code.

## Coding Conventions

- Use TypeScript and Vue 3 Composition API.
- Enforce code style with ESLint and Prettier.
- Use Pinia for state, Vue Router for navigation.
- Place new UI pages in `src/ui/<context>/pages/`.
- Use composables for cross-cutting concerns (theme, i18n, storage).
- Handle errors gracefully; log with `console.info` in background/content scripts.

## Best Practices

- Keep components small and focused.
- Use file-based routing for UI.
- Prefer composables for shared logic.
- Test in both Chrome and Firefox.
- Use shadcn-vue for accessible, customizable UI components.
