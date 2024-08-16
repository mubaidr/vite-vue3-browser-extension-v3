import antfu from '@antfu/eslint-config'
import globals from 'globals'

export default antfu(
  {
    stylistic: false,
    typescript: true,
    vue: true,
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.worker,
        ...globals.webextensions,
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
