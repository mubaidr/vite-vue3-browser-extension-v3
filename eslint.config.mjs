import antfu from '@antfu/eslint-config'
import globals from 'globals'

export default antfu({
  stylistic: false,
  ignores: ['node_modules', 'public', 'dist', 'types', '**/*.js', '**/*.d.ts'],
  rules: {
    'no-console': 'warn',
    'no-restricted-globals': 'warn',
    'import/order': 'warn',
    'ts/explicit-function-return-type': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    'vue/multi-word-component-names': 'warn',
    'eslint-comments/no-unlimited-disable': 'off',
  },
  globals: {
    ...globals.browser,
    ...globals.worker,
    ...globals.webextensions,
  },
})
