import { NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'

import { i18n } from '@/i18n'
import type { MenuMixedOption } from '@/types'
import QRCodeIcon from '~icons/ic/baseline-qrcode'
import HomeIcon from '~icons/ic/sharp-house'
import UserManagementIcon from '~icons/mdi/account-cog-outline'
import IconManagementIcon from '~icons/mdi/creative-commons'
import SystemFunctionIcon from '~icons/mdi/function-variant'
import SystemToolIcon from '~icons/mdi/tools'

const { t } = i18n.global

export const menuOptions: MenuMixedOption[] = [
  {
    label: () => h(RouterLink, { to: '/' }, { default: () => t('Menu.Home') }),
    key: 'home',
    icon: () => h(NIcon, {}, { default: () => h(HomeIcon) }),
    isRouterLink: true
  },
  {
    label: t('Menu.SystemFunction'),
    labelKey: 'Menu.SystemFunction',
    key: 'system-function',
    icon: () => h(NIcon, {}, { default: () => h(SystemFunctionIcon) }),
    menuType: 'label',
    children: [
      {
        label: () => h(RouterLink, { to: '/user-management' }, { default: () => t('Menu.UserManagement') }),
        labelKey: 'Menu.UserManagement',
        path: '/user-management',
        key: 'user-management',
        icon: () => h(NIcon, {}, { default: () => h(UserManagementIcon) }),
        menuType: 'routerLink'
      }
    ]
  },
  {
    label: t('Menu.SystemTool'),
    labelKey: 'Menu.SystemTool',
    key: 'system-tool',
    icon: () => h(NIcon, {}, { default: () => h(SystemToolIcon) }),
    menuType: 'label',
    children: [
      {
        label: () => h(RouterLink, { to: '/icon-management' }, { default: () => t('Menu.IconManagement') }),
        labelKey: 'Menu.IconManagement',
        path: '/icon-management',
        key: 'icon-management',
        icon: () => h(NIcon, {}, { default: () => h(IconManagementIcon) }),
        menuType: 'routerLink'
      },
      {
        label: () => h(RouterLink, { to: '/qrcode' }, { default: () => t('Menu.QRCode') }),
        labelKey: 'Menu.QRCode',
        path: '/qrcode',
        key: 'qrcode',
        icon: () => h(NIcon, {}, { default: () => h(QRCodeIcon) }),
        menuType: 'routerLink'
      }
    ]
  }
]
