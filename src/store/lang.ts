import { Lang } from '@dolphin-admin/utils'
import { dateEnUS, dateZhCN, enUS, zhCN } from 'naive-ui'
import { acceptHMRUpdate } from 'pinia'

export const useLangStore = defineStore('lang', () => {
  const [naiveLocale, naiveDateLocale] = NaiveUtils.getDefaultLocale()

  const lang = ref<string>(LangUtils.getDefaultLang())

  /**
   * Naive UI 组件语言
   */
  const locale = ref(naiveLocale)

  /**
   * Naive UI 组件日期语言
   */
  const dateLocale = ref(naiveDateLocale)

  /**
   * 设置语言
   * @param selectedLang 选择的语言
   */
  const setLang = (selectedLang: string) => {
    lang.value = selectedLang
  }

  /**
   * 修改 Naive UI 组件语言
   * @description 改变全局状态时，自动更新 i18n 实例 和 Naive UI 组件语言
   * @param selectedLang 选择的语言
   */
  const onLangChange = (selectedLang: string) => {
    LangUtils.setLang(selectedLang as Lang)
    LangUtils.setHtmlLang(selectedLang)
    switch (selectedLang) {
      case Lang['zh-CN']:
        locale.value = zhCN
        dateLocale.value = dateZhCN
        break
      case Lang['en-US']:
        locale.value = enUS
        dateLocale.value = dateEnUS
        break
      default:
        break
    }
  }

  watch(
    () => lang.value,
    () => onLangChange(lang.value),
    // NOTE: 初始化时，根据系统语言设置语言
    { immediate: true }
  )

  return {
    lang,
    locale,
    dateLocale,
    setLang
  }
})

/**
 * HMR
 * @see https://pinia.vuejs.org/zh/cookbook/hot-module-replacement.html
 */
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLangStore, import.meta.hot))
}
