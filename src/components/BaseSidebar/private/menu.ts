import type { MenuOption } from 'naive-ui'

import UniversalComponentsIcon from '~icons/ic/baseline-auto-awesome-mosaic'
import ChartIcon from '~icons/ic/baseline-bar-chart'
import CopyIcon from '~icons/ic/baseline-content-copy'
import UnauthorizedIcon from '~icons/ic/baseline-do-not-disturb'
import ErrorPagesIcon from '~icons/ic/baseline-error-outline'
import DigitalAnimationIcon from '~icons/ic/baseline-hourglass-empty'
import QRCodeIcon from '~icons/ic/baseline-qrcode'
import PrintIcon from '~icons/ic/outline-local-printshop'
import HomeIcon from '~icons/ic/sharp-house'
import IAmATeapotIcon from '~icons/icon-park-outline/tea-drink'
import InternalServerErrorIcon from '~icons/lucide/server-off'
import UserManagementIcon from '~icons/mdi/account-cog-outline'
import RoleManagementIcon from '~icons/mdi/account-group'
import IconManagementIcon from '~icons/mdi/emoticon-wink'
import SystemFunctionsIcon from '~icons/mdi/function-variant'
import PermissionManagementIcon from '~icons/mdi/key-chain'
import ExcelIcon from '~icons/mdi/microsoft-excel'
import BuiltinComponentsIcon from '~icons/mdi/puzzle'
import SystemToolsIcon from '~icons/mdi/tools'
import WebSocketIcon from '~icons/tabler/brand-socket-io'
import NotFoundIcon from '~icons/tabler/error-404'

import { renderIcon, renderLabel, renderT as t } from './render'

export const menuOptions: MenuOption[] = [
  {
    label: renderLabel(t('Menu.Home')),
    key: 'home',
    icon: renderIcon(HomeIcon)
  },
  {
    label: renderLabel(t('Menu.SystemFunctions')),
    key: 'system-functions',
    icon: renderIcon(SystemFunctionsIcon),
    children: [
      {
        label: renderLabel(t('Menu.UserManagement')),
        key: 'user-management',
        icon: renderIcon(UserManagementIcon)
      },
      {
        label: renderLabel(t('Menu.RoleManagement')),
        key: 'role-management',
        icon: renderIcon(RoleManagementIcon),
        show: false
      },
      {
        label: renderLabel(t('Menu.PermissionManagement')),
        key: 'permission-management',
        icon: renderIcon(PermissionManagementIcon),
        show: false
      }
    ]
  },
  {
    label: renderLabel(t('Menu.SystemTools')),
    key: 'system-tools',
    icon: renderIcon(SystemToolsIcon),
    children: [
      {
        label: renderLabel(t('Menu.Icon')),
        key: 'icon',
        icon: renderIcon(IconManagementIcon),
        show: false
      },
      {
        label: renderLabel(t('Menu.QRCode')),
        key: 'qrcode',
        icon: renderIcon(QRCodeIcon)
      },
      {
        label: renderLabel(t('Menu.Clipboard')),
        key: 'clipboard',
        icon: renderIcon(CopyIcon)
      },
      {
        label: renderLabel(t('Menu.Print')),
        key: 'print',
        icon: renderIcon(PrintIcon)
      },
      {
        label: renderLabel(t('Menu.Excel')),
        key: 'excel',
        icon: renderIcon(ExcelIcon)
      },
      {
        label: renderLabel(t('Menu.WebSocket')),
        key: 'websocket',
        icon: renderIcon(WebSocketIcon)
      }
    ]
  },
  {
    label: renderLabel(t('Menu.UniversalComponents')),
    key: 'universal-components',
    icon: renderIcon(UniversalComponentsIcon),
    children: [
      {
        label: renderLabel(t('Menu.Charts')),
        key: 'charts',
        icon: renderIcon(ChartIcon)
      }
    ]
  },
  {
    label: renderLabel(t('Menu.BuiltinComponents')),
    key: 'builtin-components',
    icon: renderIcon(BuiltinComponentsIcon),
    children: [
      {
        label: renderLabel(t('Menu.DigitalAnimation')),
        key: 'digital-animation',
        icon: renderIcon(DigitalAnimationIcon)
      }
    ]
  },
  {
    label: renderLabel(t('Menu.ErrorPages')),
    key: 'error-pages',
    icon: renderIcon(ErrorPagesIcon),
    children: [
      {
        label: renderLabel(t('Menu.403')),
        key: '403',
        icon: renderIcon(UnauthorizedIcon)
      },
      {
        label: renderLabel(t('Menu.404')),
        key: '404',
        icon: renderIcon(NotFoundIcon)
      },
      {
        label: renderLabel(t('Menu.418')),
        key: '418',
        icon: renderIcon(IAmATeapotIcon)
      },
      {
        label: renderLabel(t('Menu.500')),
        key: '500',
        icon: renderIcon(InternalServerErrorIcon)
      }
    ]
  }
]
