import type { MenuDividerOption, MenuGroupOption, MenuOption } from 'naive-ui'

export type MenuType = 'label' | 'routerLink'

export type CustomMenuOption = MenuOption & {
  menuType?: MenuType
  labelKey?: string
  path?: string
}

export type MenuMixedOption = MenuDividerOption | MenuOption | MenuGroupOption
