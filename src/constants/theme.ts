import type { GlobalThemeOverrides } from 'naive-ui'

/**
 * 全局亮色主题配置项
 */
export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily:
      'Nunito, Noto Sans SC, Noto Color Emoji, system-ui, -apple-system, Roboto, Helvetica Neue, Arial, sans-serif',
    primaryColor: '#0078D7',
    primaryColorHover: '#0078D7',
    primaryColorPressed: '#0078D7',
    primaryColorSuppl: '#0078D7'
  },
  Layout: {
    color: 'red'
  },
  Dialog: {
    contentMargin: '20px 0 0 0',
    padding: '20px'
  },
  Card: {
    borderRadius: '8px'
  }
}

/**
 * 全局暗色主题配置项
 */
export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily:
      'Nunito, Noto Sans SC, Noto Color Emoji, system-ui, -apple-system, Roboto, Helvetica Neue, Arial, sans-serif',
    primaryColor: '#0078D7',
    primaryColorHover: '#0078D7',
    primaryColorPressed: '#0078D7',
    primaryColorSuppl: '#0078D7'
  },
  Layout: {
    color: '#000000'
  },
  Dialog: {
    contentMargin: '20px 0 0 0',
    padding: '20px'
  },
  Card: {
    borderRadius: '8px'
  }
}
