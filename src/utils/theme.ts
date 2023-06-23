import type { Theme } from '@/types'

export const LOCAL_STORAGE_THEME = 'theme'

export const getTheme = () => localStorage.getItem(LOCAL_STORAGE_THEME)

export const setTheme = (theme: Theme) => localStorage.setItem(LOCAL_STORAGE_THEME, theme)

export const clearTheme = () => localStorage.removeItem(LOCAL_STORAGE_THEME)

export const getDefaultThemeMode = (): Theme => {
  if (getTheme() === 'dark' || (!getTheme() && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    return 'dark'
  }
  return 'light'
}
