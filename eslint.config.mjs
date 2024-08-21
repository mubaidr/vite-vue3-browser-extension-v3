import antfu from '@antfu/eslint-config'
import globals from 'globals'
import { globals as AutoImportGlobals } from './src/types/.eslintrc-auto-import.json' with { type: 'json' }

export default antfu(
  {
    stylistic: false,
    typescript: true,
    vue: true,
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.worker,
        ...globals.webextensions,
        ...AutoImportGlobals,
      },
    },
  },
  {
    ignores: [
      'node_modules',
      'dist',
      '**/*.js',
      '**/*.d.ts',
      'public',
      'build',
      'coverage',
      'tests',
      'cypress',
      'src/types/**/*',
    ],
  },
  {
    rules: {
      'no-alert': 'warn',
      'no-console': 'warn',
      'no-restricted-globals': 'warn',
      'import/order': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'vue/multi-word-component-names': 'warn',
      '@eslint-community/eslint-comments/no-unlimited-disable': 'off',
      'ts/explicit-function-return-type': 'off',
    },
  }
)
