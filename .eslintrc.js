require('@rushstack/eslint-patch/modern-module-resolution')

const OFF = 0
const WARN = 1
const ERROR = 2

const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true
  },
  reportUnusedDisableDirectives: true, // 报告未使用的 eslint-disable 指令
  extends: [
    'plugin:tailwindcss/recommended', // TailwindCSS 类名排序、简写合并
    'plugin:vue/vue3-recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier'
  ],
  plugins: ['simple-import-sort', 'import', 'unused-imports'],
  settings: {
    'import/resolver': {
      node: {
        tryExtensions: ['.json', '.js', '.mjs', '.ts', '.d.ts']
      },
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  rules: {
    quotes: [ERROR, 'single'], // 强制使用单引号
    semi: [ERROR, 'never'], // 禁止使用分号
    'no-unused-vars': OFF,
    'unused-imports/no-unused-imports': ERROR,
    'unused-imports/no-unused-vars': [
      WARN,
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }
    ],
    'class-methods-use-this': OFF, // 允许类方法不使用 this
    'no-param-reassign': [
      ERROR,
      {
        props: true,
        ignorePropertyModificationsFor: ['target', 'descriptor', 'req', 'request', 'args']
      }
    ],
    'simple-import-sort/imports': ERROR, // import 排序
    'simple-import-sort/exports': ERROR, // export 排序
    'import/first': ERROR, // import 必须放在文件顶部
    'import/newline-after-import': ERROR, // import 之后必须空一行
    'import/no-duplicates': ERROR, // 禁止重复导入
    'import/prefer-default-export': OFF, // 默认导出不是强制的
    'import/extensions': OFF, // 允许导入时带文件扩展名
    'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }], // 允许开发依赖
    '@typescript-eslint/no-unused-vars': OFF,
    'no-shadow': OFF,
    '@typescript-eslint/no-shadow': ERROR,
    'no-undef': OFF,
    '@typescript-eslint/no-explicit-any': OFF, // 由 TS 静态检查
    '@typescript-eslint/comma-dangle': OFF, // 由 Prettier 处理
    '@typescript-eslint/consistent-type-imports': ERROR, // 强制使用 import type
    'vue/no-v-html': OFF, // 允许使用 v-html
    'vue/multi-word-component-names': OFF, // 允许单个单词的组件名，例如 index.vue
    'import/no-absolute-path': OFF // 允许绝对路径
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.cjs', '**/*.jsx'],
      rules: {
        '@typescript-eslint/no-var-requires': OFF,
        '@typescript-eslint/no-require-imports': OFF
      }
    },
    {
      files: ['**/*.d.ts'],
      rules: {
        'import/no-duplicates': OFF
      }
    },
    {
      files: ['scripts/**/*.*'],
      rules: {
        'no-console': OFF
      }
    },
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: './',
        project: 'tsconfig.json'
      }
    },
    {
      files: ['web/**/*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        project: 'tsconfig.web.json'
      },
      rules: {
        'tailwindcss/no-custom-classname': OFF // TailwindCSS 中允许自定义类名
      }
    }
  ]
})
