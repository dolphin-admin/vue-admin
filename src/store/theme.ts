import { darkTheme, dateEnUS, dateZhCN, enUS, lightTheme, zhCN } from 'naive-ui'

import { darkThemeOverrides, lightThemeOverrides } from '@/constants'
import type { Lang, Theme } from '@/types'

export const useThemeStore = defineStore('theme', () => {
  /**
   * 主题模式
   * @description
   * 可选值：`light` | `dark`
   */
  const themeMode = ref<Theme>(ThemeUtils.getDefaultThemeMode())

  /**
   * Naive UI 组件语言
   */
  const locale = ref(LangUtils.getDefaultLocale())

  /**
   * Naive UI 组件日期语言
   */
  const dateLocale = ref(LangUtils.getDefaultDateLocale())

  /**
   * Naive UI 组件主题
   */
  const theme = computed(() =>
    themeMode.value === 'light' ? lightTheme : darkTheme
  )

  /**
   * Naive UI 组件主题覆盖
   */
  const themeOverrides = computed(() =>
    themeMode.value === 'light' ? lightThemeOverrides : darkThemeOverrides
  )

  /**
   * 修改主题模式
   * @description
   * - 切换主题模式时，会自动添加或移除 document 上 `dark` 类名
   * - 将主题模式存储到 localStorage 中，以便下次打开页面时读取
   */
  const changeThemeMode = (selectedTheme: Theme) => {
    themeMode.value = selectedTheme
    if (selectedTheme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
      ThemeUtils.setTheme('dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.setAttribute('data-theme', 'light')
      ThemeUtils.setTheme('light')
    }
  }

  /**
   * 修改 Naive UI 组件语言
   * @param selectedLocale 选择的语言
   */
  const changeLocale = (selectedLocale: Lang) => {
    switch (selectedLocale) {
      case 'zh_CN':
        locale.value = zhCN
        dateLocale.value = dateZhCN
        break
      case 'en_US':
        locale.value = enUS
        dateLocale.value = dateEnUS
        break
      default:
        break
    }
  }

  // 初始化时，根据系统主题设置主题模式
  changeThemeMode(ThemeUtils.getDefaultThemeMode())

  return {
    themeMode,
    locale,
    dateLocale,
    theme,
    themeOverrides,
    changeThemeMode,
    changeLocale
  }
})
