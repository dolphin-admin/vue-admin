import type { MenuMixedOption } from '@/types'
import CopyIcon from '~icons/ic/baseline-content-copy'
import DigitalAnimationIcon from '~icons/ic/baseline-hourglass-empty'
import QRCodeIcon from '~icons/ic/baseline-qrcode'
import HomeIcon from '~icons/ic/sharp-house'
import UserManagementIcon from '~icons/mdi/account-cog-outline'
import RoleManagementIcon from '~icons/mdi/account-group'
import IconManagementIcon from '~icons/mdi/emoticon-wink'
import SystemFunctionIcon from '~icons/mdi/function-variant'
import PermissionManagementIcon from '~icons/mdi/key-chain'
import ComponentsPreviewIcon from '~icons/mdi/puzzle'
import SystemToolIcon from '~icons/mdi/tools'

const { t } = i18n.global

export const menuOptions: MenuMixedOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/'
        },
        {
          default: () => t('Menu.Home')
        }
      ),
    key: 'home',
    icon: () =>
      h(
        NIcon,
        {
          size: 16
        },
        {
          default: () => h(HomeIcon)
        }
      ),
    isRouterLink: true
  },
  {
    label: t('Menu.SystemFunction'),
    labelKey: 'Menu.SystemFunction',
    key: 'system-function',
    icon: () =>
      h(
        NIcon,
        {
          size: 16
        },
        {
          default: () => h(SystemFunctionIcon)
        }
      ),
    menuType: 'label',
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: '/user-management'
            },
            {
              default: () => t('Menu.UserManagement')
            }
          ),
        labelKey: 'Menu.UserManagement',
        path: '/user-management',
        key: 'UserManagement',
        icon: () =>
          h(
            NIcon,
            {
              size: 16
            },
            {
              default: () => h(UserManagementIcon)
            }
          ),
        menuType: 'routerLink'
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: '/role-management'
            },
            {
              default: () => t('Menu.RoleManagement')
            }
          ),
        labelKey: 'Menu.RoleManagement',
        path: '/role-management',
        key: 'RoleManagement',
        icon: () =>
          h(
            NIcon,
            {
              size: 16
            },
            {
              default: () => h(RoleManagementIcon)
            }
          ),
        menuType: 'routerLink'
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: '/permission-management'
            },
            {
              default: () => t('Menu.PermissionManagement')
            }
          ),
        labelKey: 'Menu.PermissionManagement',
        path: '/permission-management',
        key: 'PermissionManagement',
        icon: () =>
          h(
            NIcon,
            {
              size: 16
            },
            {
              default: () => h(PermissionManagementIcon)
            }
          ),
        menuType: 'routerLink'
      }
    ]
  },
  {
    label: t('Menu.SystemTool'),
    labelKey: 'Menu.SystemTool',
    key: 'system-tool',
    icon: () =>
      h(
        NIcon,
        {
          size: 16
        },
        {
          default: () => h(SystemToolIcon)
        }
      ),
    menuType: 'label',
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: '/components-preview'
            },
            {
              default: () => t('Menu.ComponentsPreview')
            }
          ),
        labelKey: 'Menu.ComponentsPreview',
        path: '/components-preview',
        key: 'ComponentsPreview',
        icon: () =>
          h(
            NIcon,
            {
              size: 16
            },
            {
              default: () => h(ComponentsPreviewIcon)
            }
          ),
        menuType: 'routerLink'
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: '/icon-management'
            },
            {
              default: () => t('Menu.IconManagement')
            }
          ),
        labelKey: 'Menu.IconManagement',
        path: '/icon-management',
        key: 'IconManagement',
        icon: () =>
          h(
            NIcon,
            {
              size: 16
            },
            {
              default: () => h(IconManagementIcon)
            }
          ),
        menuType: 'routerLink'
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: '/qrcode'
            },
            {
              default: () => t('Menu.QRCode')
            }
          ),
        labelKey: 'Menu.QRCode',
        path: '/qrcode',
        key: 'QRCode',
        icon: () =>
          h(
            NIcon,
            {
              size: 16
            },
            {
              default: () => h(QRCodeIcon)
            }
          ),
        menuType: 'routerLink'
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: '/clipboard'
            },
            {
              default: () => t('Menu.Clipboard')
            }
          ),
        labelKey: 'Menu.Clipboard',
        path: '/clipboard',
        key: 'Clipboard',
        icon: () =>
          h(
            NIcon,
            {
              size: 16
            },
            {
              default: () => h(CopyIcon)
            }
          ),
        menuType: 'routerLink'
      }
    ]
  },
  {
    label: t('Menu.BuiltinComponent'),
    labelKey: 'Menu.BuiltinComponent',
    key: 'builtin-component',
    icon: () =>
      h(
        NIcon,
        {
          size: 16
        },
        {
          default: () => h(ComponentsPreviewIcon)
        }
      ),
    menuType: 'label',
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: '/digital-animation'
            },
            {
              default: () => t('Menu.DigitalAnimation')
            }
          ),
        labelKey: 'Menu.DigitalAnimation',
        path: '/digital-animation',
        key: 'digital-animation',
        icon: () =>
          h(
            NIcon,
            {
              size: 16
            },
            {
              default: () => h(DigitalAnimationIcon)
            }
          ),
        menuType: 'routerLink'
      }
    ]
  }
]
