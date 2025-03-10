import js from '@eslint/js';
import stylisticPlugin from '@stylistic/eslint-plugin';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  // Include recommended JS rules
  js.configs.recommended,
  
  // Setup typescript-eslint
  ...tseslint.configs.recommended,
  
  // Include stylistic rules
  {
    plugins: {
      stylistic: stylisticPlugin,
    },
    rules: {
      // General formatting
      'stylistic/semi': ['error', 'always'],
      'stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      'stylistic/comma-dangle': ['error', 'always-multiline'],
      'stylistic/indent': ['error', 2],
      'stylistic/brace-style': ['error', '1tbs'],
      'stylistic/max-len': ['error', { code: 100, ignoreStrings: true, ignoreTemplateLiterals: true }],
      'stylistic/max-statements-per-line': ['error', { max: 1 }],
      'stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
      'stylistic/eol-last': ['error', 'always'],

      // Spacing
      'stylistic/object-curly-spacing': ['error', 'always'],
      'stylistic/array-bracket-spacing': ['error', 'never'],
      'stylistic/comma-spacing': ['error', { before: false, after: true }],
      'stylistic/keyword-spacing': ['error', { before: true, after: true }],
      'stylistic/space-infix-ops': 'error',
      'stylistic/space-before-blocks': ['error', 'always'],
      'stylistic/space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      }],
    },
  },
  
  // Config for all TypeScript files
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true, // This auto-detects the tsconfig
        tsconfigRootDir: '.',
      },
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/ban-ts-comment': 'warn',
    },
  },
  
  // Specific config for test files
  {
    files: ['**/*.test.ts'],
    rules: {
      // Relax some rules for test files
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  
  // Ignore build outputs, node_modules and other files
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      '.nyc_output/**',
      '.github/**',
      '.vscode/**',
    ],
  },
]; 
