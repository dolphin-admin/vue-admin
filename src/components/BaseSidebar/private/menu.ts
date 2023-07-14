import type { MenuOption } from 'naive-ui'

import UniversalComponentsIcon from '~icons/ic/baseline-auto-awesome-mosaic'
import ChartIcon from '~icons/ic/baseline-bar-chart'
import CopyIcon from '~icons/ic/baseline-content-copy'
import ErrorPageIcon from '~icons/ic/baseline-error-outline'
import DigitalAnimationIcon from '~icons/ic/baseline-hourglass-empty'
import QRCodeIcon from '~icons/ic/baseline-qrcode'
import PrintIcon from '~icons/ic/outline-local-printshop'
import UnauthorizedIcon from '~icons/ic/outline-looks-3'
import NotFoundIcon from '~icons/ic/outline-looks-4'
import InternalServerErrorIcon from '~icons/ic/outline-looks-5'
import HomeIcon from '~icons/ic/sharp-house'
import UserManagementIcon from '~icons/mdi/account-cog-outline'
import RoleManagementIcon from '~icons/mdi/account-group'
import IconManagementIcon from '~icons/mdi/emoticon-wink'
import SystemFunctionIcon from '~icons/mdi/function-variant'
import PermissionManagementIcon from '~icons/mdi/key-chain'
import ExcelIcon from '~icons/mdi/microsoft-excel'
import ComponentsPreviewIcon from '~icons/mdi/puzzle'
import SystemToolIcon from '~icons/mdi/tools'
import WebSocketIcon from '~icons/tabler/brand-socket-io'

import { renderIcon, renderLabel, renderLinkLabel, renderT as t } from './render'

export const menuOptions: MenuOption[] = [
  {
    label: renderLinkLabel(t('Menu.Home'), '/home'),
    key: 'home',
    icon: renderIcon(HomeIcon)
  },
  {
    label: renderLabel(t('Menu.SystemFunction')),
    key: 'system-function',
    icon: renderIcon(SystemFunctionIcon),
    children: [
      {
        label: renderLinkLabel(t('Menu.UserManagement'), '/user-management'),
        key: 'user-management',
        icon: renderIcon(UserManagementIcon)
      },
      {
        label: renderLinkLabel(t('Menu.RoleManagement'), '/role-management'),
        key: 'role-management',
        icon: renderIcon(RoleManagementIcon),
        show: false
      },
      {
        label: renderLinkLabel(t('Menu.PermissionManagement'), '/permission-management'),
        key: 'permission-management',
        icon: renderIcon(PermissionManagementIcon),
        show: false
      }
    ]
  },
  {
    label: renderLabel(t('Menu.SystemTool')),
    key: 'system-tool',
    icon: renderIcon(SystemToolIcon),
    children: [
      {
        label: renderLinkLabel(t('Menu.Icon'), '/icon'),
        key: 'icon',
        icon: renderIcon(IconManagementIcon),
        show: false
      },
      {
        label: renderLinkLabel(t('Menu.QRCode'), '/qrcode'),
        key: 'QRCode',
        icon: renderIcon(QRCodeIcon)
      },
      {
        label: renderLinkLabel(t('Menu.Clipboard'), '/clipboard'),
        key: 'clipboard',
        icon: renderIcon(CopyIcon)
      },
      {
        label: renderLinkLabel(t('Menu.Print'), '/print'),
        key: 'print',
        icon: renderIcon(PrintIcon)
      },
      {
        label: renderLinkLabel(t('Menu.Excel'), '/excel'),
        key: 'excel',
        icon: renderIcon(ExcelIcon)
      },
      {
        label: renderLinkLabel(t('Menu.WebSocket'), '/websocket'),
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
        label: renderLinkLabel(t('Menu.Charts'), '/charts'),
        key: 'charts',
        icon: renderIcon(ChartIcon)
      }
    ]
  },
  {
    label: renderLabel(t('Menu.BuiltinComponent')),
    key: 'builtin-component',
    icon: renderIcon(ComponentsPreviewIcon),
    children: [
      {
        label: renderLinkLabel(t('Menu.DigitalAnimation'), '/digital-animation'),
        key: 'digital-animation',
        icon: renderIcon(DigitalAnimationIcon)
      }
    ]
  },
  {
    label: renderLabel(t('Menu.ErrorPage')),
    key: 'error-page',
    icon: renderIcon(ErrorPageIcon),
    children: [
      {
        label: renderLinkLabel(t('Menu.403'), '/403'),
        key: '403',
        icon: renderIcon(UnauthorizedIcon)
      },
      {
        label: renderLinkLabel(t('Menu.404'), '/404'),
        key: '404',
        icon: renderIcon(NotFoundIcon)
      },
      {
        label: renderLinkLabel(t('Menu.500'), '/500'),
        key: '500',
        icon: renderIcon(InternalServerErrorIcon)
      }
    ]
  }
]
