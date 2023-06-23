import { dateEnUS, dateZhCN, enUS, zhCN } from 'naive-ui'

import type { Lang } from '@/types'

export const LOCAL_STORAGE_LANG = 'lang'

export const getLang = () => localStorage.getItem(LOCAL_STORAGE_LANG)

export const setLang = (lang: Lang) => localStorage.setItem(LOCAL_STORAGE_LANG, lang)

export const clearLang = () => localStorage.removeItem(LOCAL_STORAGE_LANG)

const getBrowserLang = () => {
  const lang = window.navigator.language
  if (lang.includes('zh')) return 'zh_CN'
  if (lang.includes('en')) return 'en_US'
  return ''
}

export const getDefaultLang = () => {
  const lang = getLang()
  const browserLang = getBrowserLang()

  return lang ?? browserLang ?? 'zh_CN'
}

export const getDefaultLocale = () => {
  const lang = getDefaultLang()
  switch (lang) {
    case 'zh_CN':
      return zhCN
    case 'en_US':
      return enUS
    default:
      return zhCN
  }
}

export const getDefaultDateLocale = () => {
  const lang = getDefaultLang()
  switch (lang) {
    case 'zh_CN':
      return dateZhCN
    case 'en_US':
      return dateEnUS
    default:
      return dateZhCN
  }
}
