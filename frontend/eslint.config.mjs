import { defineConfig } from 'eslint-define-config';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';

export default defineConfig([
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react: reactPlugin,
      'jsx-a11y': jsxA11yPlugin,
      import: importPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      indent: ['error', 2],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      camelcase: ['error', { properties: 'always' }],
      'max-len': ['error', { code: 80 }],
      'no-unused-vars': ['warn'],
      'no-console': 'warn',
      eqeqeq: ['error', 'always'],
      curly: 'error',
    },
  },
]);
