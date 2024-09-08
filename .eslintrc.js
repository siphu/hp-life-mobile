module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react-hooks', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error', // Enforce Hooks rules
    'react-hooks/exhaustive-deps': 'warn', // Check dependencies for useEffect
    '@typescript-eslint/no-explicit-any': 'warn', // Change `no-explicit-any` to a warning
    '@typescript-eslint/ban-ts-comment': 'off', // Disable the `ban-ts-comment` rule
    'no-case-declarations': 'off',
  },
  ignorePatterns: [
    'node_modules/',
    'build/',
    'dist/',
    '.vscode/',
    '.yarn/',
    '__mocks__/',
    '__tests__/',
    'vendor/',
    'typings/',
  ],
};
