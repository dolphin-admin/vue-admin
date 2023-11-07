import { Lang } from '@dolphin-admin/utils'
import type { NDateLocale, NLocale } from 'naive-ui'
import { dateEnUS, dateZhCN, enUS, zhCN } from 'naive-ui'

export class NaiveUtils {
  /**
   * 获取 Naive UI 默认国际化语言
   */
  static getDefaultLocale(): [NLocale, NDateLocale] {
    const lang = LangUtils.getDefaultLang()
    switch (lang) {
      case Lang['zh-CN']:
        return [zhCN, dateZhCN]
      case Lang['en-US']:
        return [enUS, dateEnUS]
      default:
        return [zhCN, dateZhCN]
    }
  }
}
