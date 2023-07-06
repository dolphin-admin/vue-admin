# 开发规范

## 文件命名风格

| 文件类型  | 命名风格                       | 示例                |
| --------- | ------------------------------ | ------------------- |
| `.vue`    | 大驼峰文件名下包含 `index.vue` | `Layout/index.vue`  |
| `.ts`     | 小驼峰                         | `index.ts`,`env.ts` |
| Vue Store | 小驼峰                         | `userStore.ts`      |
| Vue Hook  | 小驼峰                         | `useLoading.ts`     |
| 文档      | 使用小写字母，下划线拼接       | `custom_doc.md`     |
| 图片      | 使用小写字母，下划线拼接       | `custom_img.png`    |

## 模块化

例如 `/src/utils` 模块目录下的文件，使用 `index.ts` 重导出，通过 `unplugin-auto-import` 插件自动引入。
`/src/utils` 和 `/src/api` 下的文件，都是用 `class` 的方式导出，所有的方法都是静态方法，不需要实例化。

## 书写注释

通用模块方法，需要使用 `JSDoc` 书写注释，例如：

```typescript
/**
 * @description 两数相加
 */
function add(a: number, b: number): number {
  return a + b
}
```

## 图标

使用 `NIcon` 组合 `unplugin-icons` 的图标组件。

优先使用 [Google Material Icons](https://icones.js.org/collection/ic/) 图标。

```vue
<template>
  <NIcon>
    <GitHubIcon />
  </NIcon>
</template>
```

## 多语言

使用 `vue-i18n` 提供的 `t()` 函数，多语言翻译文件位于 `/src/i18n/locales/*`，目前支持 `en_US` 和 `zh_CN` 两种语言。

### Vue Setup 内引入

```typescript
// @ts-ignore
const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

t('App.Name')
```

> 为什么 `@ts-ignore`?
>
> 目前, `vue-i18n` 存在 `TypeScript` 错误，暂时需要忽略，否则无法通过 `vue-tsc` 类型检查。

### Vue Setup 外引入

```typescript
import { i18n } from '@/i18n'

const { t } = i18n.global

t('App.Name')
```

## 响应式设计 RWD

基于 `Tailwind CSS` 的断点，移动优先原则，使用大断点覆盖小段点。

例如：

```vue
<template>
  <div class="w-0 sm:w-4"></div>
</template>
```

上述代码，在小于 `sm` 断点情况下宽度是 0，`sm` 断点之后宽度是 `16px`。

## 数据表格

- 固定表头
- 批量删除
- 无数据提示
- 加载数据提示
- 长字段省略
