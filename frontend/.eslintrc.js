module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/react',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    'indent': ['error', 2],
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'semi': ['error', 'always'],
    'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
    'camelcase': ['error', { properties: 'always' }],
    'max-len': ['error', { code: 80 }],
    'no-unused-vars': ['warn'],
    'no-console': 'warn',
    'eqeqeq': ['error', 'always'],
    'curly': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};