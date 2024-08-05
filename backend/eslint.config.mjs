import { defineConfig } from 'eslint-define-config';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default defineConfig([
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.node,
      },
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/explicit-module-boundary-types": "warn",
      "@typescript-eslint/typedef": [
        "warn",
        {
          arrayDestructuring: true,
          objectDestructuring: true,
          variableDeclaration: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-var": "error",
      "prefer-arrow-callback": "warn",
      "prefer-destructuring": "warn",
    },
  },
]);
