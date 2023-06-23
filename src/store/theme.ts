import { darkTheme, dateEnUS, dateZhCN, enUS, lightTheme, zhCN } from 'naive-ui'

import type { Lang, Theme } from '@/types'
import { getDefaultDateLocale, getDefaultLocale } from '@/utils'

export const useThemeStore = defineStore('theme', () => {
  const themeMode = ref<Theme>('light')

  const locale = ref(getDefaultLocale())
  const dateLocale = ref(getDefaultDateLocale())

  const theme = computed(() => (themeMode.value === 'light' ? lightTheme : darkTheme))

  const changeThemeMode = (selectedTheme: Theme) => {
    themeMode.value = selectedTheme
  }

  const changeLocale = (selectedLocale: Lang) => {
    switch (selectedLocale) {
      case 'zh-CN':
        locale.value = zhCN
        dateLocale.value = dateZhCN
        break
      case 'en':
        locale.value = enUS
        dateLocale.value = dateEnUS
        break
      default:
        break
    }
  }

  return {
    themeMode,
    locale,
    dateLocale,
    theme,
    changeThemeMode,
    changeLocale
  }
})
