import { dateEnUS, dateZhCN, enUS, zhCN } from 'naive-ui'

import type { Lang } from '@/types'

export class LangUtils {
  /**
   * 语言存储键名
   */
  private static LOCAL_STORAGE_LANG = 'lang'

  /**
   * 获取语言
   */
  static getLang() {
    return localStorage.getItem(this.LOCAL_STORAGE_LANG)
  }

  /**
   * 设置语言
   */
  static setLang(lang: Lang) {
    localStorage.setItem(this.LOCAL_STORAGE_LANG, lang)
  }

  /**
   * 清除语言
   */
  static clearLang() {
    localStorage.removeItem(this.LOCAL_STORAGE_LANG)
  }

  /**
   * 获取浏览器语言
   * @description
   * - 包含 `zh`，返回中文
   * - 包含 `en`，返回英文
   */
  static getBrowserLang() {
    const lang = window.navigator.language
    if (lang.includes('zh')) return 'zh_CN'
    if (lang.includes('en')) return 'en_US'
    return ''
  }

  /**
   * 获取默认语言
   * @description
   * 1. 优先使用 `localStorage` 中的 `lang`
   * 2. 其次使用浏览器语言
   * 3. 都没有就默认中文
   */
  static getDefaultLang() {
    const lang = this.getLang()
    const browserLang = this.getBrowserLang()

    return lang ?? browserLang ?? 'zh_CN'
  }

  /**
   * 获取 Naive UI 默认日期语言
   */
  static getDefaultLocale() {
    const lang = this.getDefaultLang()
    switch (lang) {
      case 'zh_CN':
        return zhCN
      case 'en_US':
        return enUS
      default:
        return zhCN
    }
  }

  /**
   * 获取 Naive UI 默认日期语言
   */
  static getDefaultDateLocale() {
    const lang = this.getDefaultLang()
    switch (lang) {
      case 'zh_CN':
        return dateZhCN
      case 'en_US':
        return dateEnUS
      default:
        return dateZhCN
    }
  }
}
