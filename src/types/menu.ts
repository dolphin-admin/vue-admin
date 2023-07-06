import type { MenuDividerOption, MenuGroupOption, MenuOption } from 'naive-ui'

/**
 * 菜单类型
 * @description 用于区分菜单项的类型
 * - `label`: 纯文本菜单项
 * - `routerLink`: 路由菜单项
 */
export type MenuType = 'label' | 'routerLink'

export type CustomMenuOption = MenuOption & {
  menuType?: MenuType
  labelKey?: string
  path?: string
}

export type MenuMixedOption = MenuDividerOption | MenuOption | MenuGroupOption
