import { createI18n } from 'vue-i18n'

import en from '@/i18n/locales/en.json'
import zhCN from '@/i18n/locales/zh-CN.json'

export type MessageSchema = typeof zhCN

export const i18n = createI18n<[MessageSchema], 'en' | 'zh-CN'>({
  legacy: false,
  locale: localStorage.getItem('lang') || 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {
    en,
    'zh-CN': zhCN
  }
})
