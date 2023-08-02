const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true
  },
  extends: [
    'plugin:tailwindcss/recommended', // TailwindCSS 类名排序、简写合并
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  plugins: ['simple-import-sort', 'import', 'unused-imports'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.mjs', '.ts', '.d.ts', '.tsx']
      }
    }
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.eslint.json',
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true
    }
  },
  overrides: [
    {
      files: ['*.d.ts'],
      rules: {
        'import/no-duplicates': 'off'
      }
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-require-imports': 'off'
      }
    },
    {
      files: ['scripts/**/*'],
      rules: {
        'no-console': 'off'
      }
    },
    {
      files: ['*.ts', '*.tsx', '*.mts', '*.cts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        'no-undef': 'off',
        '@typescript-eslint/no-explicit-any': 'off', // 由 TS 静态检查
        '@typescript-eslint/comma-dangle': 'off', // 由 Prettier 处理
        '@typescript-eslint/consistent-type-imports': 'error' // 强制使用 import type
      }
    },
    {
      files: ['web/**/*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        'no-undef': 'off',
        'vue/no-v-html': 'off', // 允许使用 v-html
        'vue/multi-word-component-names': 'off', // 允许单个单词的组件名，例如 index.vue
        'import/no-absolute-path': 'off', // 允许绝对路径
        'tailwindcss/no-custom-classname': 'off' // TailwindCSS 中允许自定义类名
      }
    }
  ],
  rules: {
    quotes: ['error', 'single'], // 强制使用单引号
    semi: ['error', 'never'], // 禁止使用分号
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    'class-methods-use-this': 'off', // 允许类方法不使用 this
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['target', 'descriptor', 'req', 'request', 'args']
      }
    ],
    'simple-import-sort/imports': 'error', // import 排序
    'simple-import-sort/exports': 'error', // export 排序
    'import/first': 'error', // import 必须放在文件顶部
    'import/newline-after-import': 'error', // import 之后必须空一行
    'import/no-duplicates': 'error', // 禁止重复导入
    'import/prefer-default-export': 'off', // 默认导出不是强制的
    'import/extensions': 'off', // 允许导入时带文件扩展名
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true
      }
    ] // 允许开发依赖
  },
  reportUnusedDisableDirectives: true // 报告未使用的 eslint-disable 指令
})
