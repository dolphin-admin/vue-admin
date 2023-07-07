import { createI18n } from 'vue-i18n'

import en_US from '@/locales/en_US.json'
import zh_CN from '@/locales/zh_CN.json'
import type { Lang, MessageSchema } from '@/types'

const i18n = createI18n<[MessageSchema], Lang>({
  legacy: false,
  locale: LangUtils.getDefaultLang() ?? 'zh_CN',
  fallbackLocale: 'zh_CN',
  messages: {
    en_US,
    zh_CN
  }
})

export default i18n
