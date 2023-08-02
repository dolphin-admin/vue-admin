const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  env: {
    es2023: true,
    browser: true,
    commonjs: true,
    node: true,
    jest: true
  },
  extends: [
    'plugin:tailwindcss/recommended', // TailwindCSS 类名排序、简写合并
    'eslint:recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:vue/vue3-recommended',
    'prettier'
  ],
  plugins: [
    'unused-imports',
    '@typescript-eslint',
    'simple-import-sort',
    'import'
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.mjs', '.ts', '.d.ts', '.tsx', 'vue']
      }
    }
  },
  reportUnusedDisableDirectives: true, // 报告未使用的 eslint-disable 指令
  parser: 'vue-eslint-parser', // 使用自定义 vue 解析器
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: [
      'tsconfig.eslint.json',
      'server/tsconfig.json',
      'web/tsconfig.json',
      'docs/tsconfig.json',
      'packages/*/tsconfig.json'
    ],
    tsconfigRootDir: process.cwd(),
    sourceType: 'module',
    ecmaVersion: 'latest',
    extraFileExtensions: ['.vue'], // 支持 .vue 文件
    allowAutomaticSingleRunInference: true,
    EXPERIMENTAL_useSourceOfProjectReferenceRedirect: false
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
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    },
    {
      files: ['*.{ts,tsx,vue}'],
      rules: {
        'no-unused-vars': 'off',
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
      files: ['*.vue'],
      rules: {
        'vue/no-v-html': 'off', // 允许使用 v-html
        'vue/multi-word-component-names': 'off', // 允许单个单词的组件名，例如 index.vue
        'vue/component-tags-order': [
          'error',
          {
            order: ['script', 'template', 'style']
          }
        ], // 优先 script，其次 template，最后 style
        'tailwindcss/classnames-order': 'error', // TailwindCSS 类名排序
        'tailwindcss/enforces-shorthand': 'error', // TailwindCSS 简写合并
        'tailwindcss/no-custom-classname': 'off' // TailwindCSS 中允许自定义类名
      }
    }
    // TODO: 暂未处理测试文件 🚀
    // {
    //   files: [
    //     './server/**/*spec.ts',
    //     './server/**/*test.ts',
    //     './packages/*/tests/**/*spec.ts',
    //     './packages/*/tests/**/*test.ts'
    //   ]
    // }
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
        ignorePropertyModificationsFor: [
          'target',
          'descriptor',
          'req',
          'request',
          'args'
        ]
      }
    ],

    // eslint-plugin-import
    'import/first': 'error', // import 必须放在文件顶部
    'import/newline-after-import': 'error', // import 之后必须空一行
    'import/no-unresolved': 'off', // 允许导入未解析的模块
    'import/no-absolute-path': 'off', // 允许导入绝对路径
    'import/no-duplicates': 'error', // 禁止重复导入
    'import/extensions': 'off', // 允许导入时带文件扩展名
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        peerDependencies: true,
        optionalDependencies: false
      }
    ], // 允许 devDependencies，peerDependencies，不允许 optionalDependencies
    'import/no-mutable-exports': 'error', // 禁止导出 let, var 声明的变量
    'import/no-self-import': 'error', // 禁止自导入
    'import/prefer-default-export': 'off', // 仅导出一个变量时，不要求默认导出

    // eslint-plugin-simple-import-sort
    'simple-import-sort/imports': 'error', // import 排序
    'simple-import-sort/exports': 'error' // export 排序
  }
})
