import { darkTheme, dateZhCN, lightTheme, zhCN } from 'naive-ui'

import type { Theme } from '@/types'

export const useThemeStore = defineStore('theme', () => {
  const themeMode = ref<Theme>('light')

  const locale = ref(zhCN)
  const dateLocale = ref(dateZhCN)

  const theme = computed(() => (themeMode.value === 'light' ? lightTheme : darkTheme))

  const changeThemeMode = (selectedTheme: Theme) => {
    themeMode.value = selectedTheme
  }

  return {
    themeMode,
    locale,
    dateLocale,
    theme,
    changeThemeMode
  }
})
