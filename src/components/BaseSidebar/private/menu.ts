import type { MenuOption } from 'naive-ui'

import { ERROR_PAGES_PREFIX } from '@/router'
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

import { renderIcon, renderLabel, renderLink, renderT as t } from './render'

export const menuOptions: MenuOption[] = [
  {
    label: renderLink(t('Menu.Home'), '/home'),
    key: 'home',
    icon: renderIcon(HomeIcon)
  },
  {
    label: renderLabel(t('Menu.SystemFunctions')),
    key: 'system-functions',
    icon: renderIcon(SystemFunctionsIcon),
    children: [
      {
        label: renderLink(t('Menu.UserManagement'), '/user-management'),
        key: 'user-management',
        icon: renderIcon(UserManagementIcon)
      },
      {
        label: renderLink(t('Menu.RoleManagement'), '/role-management'),
        key: 'role-management',
        icon: renderIcon(RoleManagementIcon),
        show: false
      },
      {
        label: renderLink(t('Menu.PermissionManagement'), '/permission-management'),
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
        label: renderLink(t('Menu.Icon'), '/icon'),
        key: 'icon',
        icon: renderIcon(IconManagementIcon),
        show: false
      },
      {
        label: renderLink(t('Menu.QRCode'), '/qrcode'),
        key: 'qrcode',
        icon: renderIcon(QRCodeIcon)
      },
      {
        label: renderLink(t('Menu.Clipboard'), '/clipboard'),
        key: 'clipboard',
        icon: renderIcon(CopyIcon)
      },
      {
        label: renderLink(t('Menu.Print'), '/print'),
        key: 'print',
        icon: renderIcon(PrintIcon)
      },
      {
        label: renderLink(t('Menu.Excel'), '/excel'),
        key: 'excel',
        icon: renderIcon(ExcelIcon)
      },
      {
        label: renderLink(t('Menu.WebSocket'), '/websocket'),
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
        label: renderLink(t('Menu.Charts'), '/charts'),
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
        label: renderLink(t('Menu.DigitalAnimation'), '/digital-animation'),
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
        label: renderLink(t('Menu.403'), `${ERROR_PAGES_PREFIX}/403`),
        key: '403',
        icon: renderIcon(UnauthorizedIcon)
      },
      {
        label: renderLink(t('Menu.404'), `${ERROR_PAGES_PREFIX}/404`),
        key: '404',
        icon: renderIcon(NotFoundIcon)
      },
      {
        label: renderLink(t('Menu.418'), `${ERROR_PAGES_PREFIX}/418`),
        key: '418',
        icon: renderIcon(IAmATeapotIcon)
      },
      {
        label: renderLink(t('Menu.500'), `${ERROR_PAGES_PREFIX}/500`),
        key: '500',
        icon: renderIcon(InternalServerErrorIcon)
      }
    ]
  }
]
