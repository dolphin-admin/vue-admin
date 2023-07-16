require('@rushstack/eslint-patch/modern-module-resolution')

const { defineConfig } = require('eslint-define-config')
const path = require('path')

module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    es2022: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: path.join(__dirname, 'tsconfig.json'),
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  extends: [
    'plugin:tailwindcss/recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    '@vue/eslint-config-prettier'
  ],
  plugins: ['import', 'simple-import-sort', 'unused-imports', 'tailwindcss'],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'import/prefer-default-export': 'off',
    'vue/multi-word-component-names': ['error', { ignores: ['index'] }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/extensions': 'off',
    'import/newline-after-import': 'off',
    'import/no-absolute-path': 'off', // For import ./public.
    'import/no-unresolved': 'off',
    'no-unused-vars': 'off', // Use @typescript-eslint/no-unused-vars to check.
    'no-shadow': 'off', // Use @typescript-eslint/no-shadow to check.
    'no-undef': 'off', // TypeScript already checked it.
    '@typescript-eslint/no-shadow': 'error',
    'tailwindcss/no-custom-classname': 'off'
  },
  overrides: [
    {
      files: ['**/*.vue'],
      rules: {
        '@typescript-eslint/no-use-before-define': 'off'
      }
    }
  ]
})
