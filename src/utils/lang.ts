import { dateEnUS, dateZhCN, enUS, zhCN } from 'naive-ui'

import type { Lang } from '@/types'

export const LOCAL_STORAGE_LANG = 'lang'

export const getLang = () => localStorage.getItem(LOCAL_STORAGE_LANG)

export const setLang = (lang: Lang) => localStorage.setItem(LOCAL_STORAGE_LANG, lang)

export const clearLang = () => localStorage.removeItem(LOCAL_STORAGE_LANG)

export const getDefaultLocale = () => {
  const lang = getLang()
  switch (lang) {
    case 'zh-CN':
      return zhCN
    case 'en':
      return enUS
    default:
      return zhCN
  }
}

export const getDefaultDateLocale = () => {
  const lang = getLang()
  switch (lang) {
    case 'zh-CN':
      return dateZhCN
    case 'en':
      return dateEnUS
    default:
      return dateZhCN
  }
}
