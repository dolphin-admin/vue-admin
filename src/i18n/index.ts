import { Lang } from '@dolphin-admin/utils'
import { createI18n } from 'vue-i18n'

import en_US from '@/locales/en-US.json'
import zh_CN from '@/locales/zh-CN.json'
import type { MessageSchema } from '@/types'

const i18n = createI18n<[MessageSchema], Lang, false>({
  legacy: false, // 默认是 true，使用 composition API 时，需要设置为 false，同时上面的泛型也是必须的
  locale: Lang['zh-CN'],
  fallbackLocale: Lang['zh-CN'],
  messages: {
    [Lang['en-US']]: en_US,
    [Lang['zh-CN']]: zh_CN
  }
})

export default i18n
