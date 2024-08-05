module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/typedef': [
        'warn',
        {
          arrayDestructuring: true,
          objectDestructuring: true,
          variableDeclaration: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-var': 'error',
      'prefer-arrow-callback': 'warn',
      'prefer-destructuring': 'warn',
    },
  };
  