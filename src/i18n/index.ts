import { createI18n } from 'vue-i18n'

import enUS from '@/i18n/locales/en_US.json'
import zhCN from '@/i18n/locales/zh_CN.json'
import type { Lang, MessageSchema } from '@/types'
import { getDefaultLang } from '@/utils'

export const i18n = createI18n<[MessageSchema], Lang>({
  legacy: false,
  locale: getDefaultLang() ?? 'zh_CN',
  fallbackLocale: 'zh_CN',
  messages: {
    en_US: enUS,
    zh_CN: zhCN
  }
})
