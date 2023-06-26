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
