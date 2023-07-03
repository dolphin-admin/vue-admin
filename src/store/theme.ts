import { darkTheme, dateEnUS, dateZhCN, enUS, lightTheme, zhCN } from 'naive-ui'

import { darkThemeOverrides, lightThemeOverrides } from '@/constants'
import type { Lang, Theme } from '@/types'

export const useThemeStore = defineStore('theme', () => {
  const themeMode = ref<Theme>(ThemeUtils.getDefaultThemeMode())

  const locale = ref(LangUtils.getDefaultLocale())
  const dateLocale = ref(LangUtils.getDefaultDateLocale())

  const theme = computed(() => (themeMode.value === 'light' ? lightTheme : darkTheme))

  const themeOverrides = computed(() => (themeMode.value === 'light' ? lightThemeOverrides : darkThemeOverrides))

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
