# 开发规范

## 多语言

使用 `vue-i18n` 提供的 `t()` 函数，多语言翻译文件位于 `/src/i18n/locales/*`，目前支持 `en_US` 和 `zh_CN` 两种语言。

### Vue Setup 内引入

```typescript
import type { MessageSchema } from '@/types'

// @ts-ignore
const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

t('App.Name')
```

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
