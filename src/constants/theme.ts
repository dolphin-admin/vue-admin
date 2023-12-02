import type { GlobalThemeOverrides } from 'naive-ui'

import { BuiltInFont } from './fonts'

const baseThemeOverridesPresets: GlobalThemeOverrides = {
  common: {
    fontFamily: BuiltInFont.NUNITO,
    primaryColor: '#0078d7',
    primaryColorHover: '#0078d7',
    primaryColorPressed: '#0078d7',
    primaryColorSuppl: '#0078d7'
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
 * 全局亮色主题配置项
 */
export const lightThemeOverridesPresets: GlobalThemeOverrides = {
  ...baseThemeOverridesPresets
}

/**
 * 全局暗色主题配置项
 */
export const darkThemeOverridesPresets: GlobalThemeOverrides = {
  ...baseThemeOverridesPresets
}
