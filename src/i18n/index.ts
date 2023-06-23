import { createI18n } from 'vue-i18n'

import en from '@/i18n/locales/en.json'
import zhCN from '@/i18n/locales/zh-CN.json'
import type { Lang, MessageSchema } from '@/types'
import { getLang } from '@/utils'

export const i18n = createI18n<[MessageSchema], Lang>({
  legacy: false,
  locale: getLang() ?? 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {
    en,
    'zh-CN': zhCN
  }
})
