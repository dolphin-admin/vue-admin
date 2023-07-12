import type { MenuMixedOption } from '@/types'
import UniversalComponentsIcon from '~icons/ic/baseline-auto-awesome-mosaic'
import ChartIcon from '~icons/ic/baseline-bar-chart'
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
import WebSocketIcon from '~icons/tabler/brand-socket-io'

const { t } = i18n.global

export const menuOptions: MenuMixedOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/home'
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
    label: () => t('Menu.SystemFunction'),
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
        path: '/user-management',
        key: 'user-management',
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
        path: '/role-management',
        key: 'role-management',
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
        path: '/permission-management',
        key: 'permission-management',
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
    label: () => t('Menu.SystemTool'),
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
              to: '/icon'
            },
            {
              default: () => t('Menu.Icon')
            }
          ),
        labelKey: 'Menu.Icon',
        path: '/icon',
        key: 'icon',
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
        path: '/clipboard',
        key: 'clipboard',
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
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: '/websocket'
            },
            {
              default: () => t('Menu.WebSocket')
            }
          ),
        path: '/websocket',
        key: 'websocket',
        icon: () =>
          h(
            NIcon,
            {
              size: 16
            },
            {
              default: () => h(WebSocketIcon)
            }
          ),
        menuType: 'routerLink'
      }
    ]
  },
  {
    label: () => t('Menu.UniversalComponents'),
    key: 'universal-components',
    icon: () =>
      h(
        NIcon,
        {
          size: 16
        },
        {
          default: () => h(UniversalComponentsIcon)
        }
      ),
    menuType: 'label',
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: '/charts'
            },
            {
              default: () => t('Menu.Charts')
            }
          ),
        path: '/charts',
        key: 'charts',
        icon: () =>
          h(
            NIcon,
            {
              size: 16
            },
            {
              default: () => h(ChartIcon)
            }
          ),
        menuType: 'routerLink'
      }
    ]
  },
  {
    label: () => t('Menu.BuiltinComponent'),
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
