require('@rushstack/eslint-patch/modern-module-resolution')

const { defineConfig } = require('eslint-define-config')
const path = require('path')

module.exports = defineConfig({
  root: true,
  ignorePatterns: ['.eslintrc.js'],
  overrides: [
    // Vue 文件配置
    {
      files: ['web/**/*.vue'],
      env: {
        es2023: true,
        browser: true
      },
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        project: path.join(__dirname, 'tsconfig.web.json'),
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
        'tailwindcss/no-custom-classname': 'off',
        'vue/no-v-html': 'off'
      }
    },
    // 服务端配置
    {
      files: ['server/**/*.ts'],
      env: {
        es2023: true,
        node: true,
        jest: true
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: path.join(__dirname, 'tsconfig.node.json'),
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      plugins: ['@typescript-eslint', 'node', 'import', 'prettier', 'simple-import-sort', 'unused-imports'],
      extends: [
        'eslint:recommended',
        'airbnb-base',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:node/recommended',
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:prettier/recommended'
      ],
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true
          }
        },
        node: {
          tryExtensions: ['.json', '.node', '.js', '.ts', '.d.ts']
        }
      },
      rules: {
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            endOfLine: 'auto'
          }
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/consistent-type-imports': 'error',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
        'node/no-missing-import': 'off',
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off', // 通常 Controller Class 内部不会使用 this
        'no-param-reassign': [
          'error',
          {
            props: true,
            ignorePropertyModificationsFor: ['target', 'descriptor', 'req', 'request', 'args'] // 装饰器中会修改 target, descriptor, 中间件会修改 req, prisma Extensions 会修改 args
          }
        ],
        '@typescript-eslint/no-useless-constructor': 'off'
      }
    }
  ]
})
