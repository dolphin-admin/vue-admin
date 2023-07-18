import type { MenuOption } from 'naive-ui'

import UniversalComponentsIcon from '~icons/ic/baseline-auto-awesome-mosaic'
import ChartIcon from '~icons/ic/baseline-bar-chart'
import CopyIcon from '~icons/ic/baseline-content-copy'
import UnauthorizedIcon from '~icons/ic/baseline-do-not-disturb'
import ErrorPagesIcon from '~icons/ic/baseline-error-outline'
import DigitalAnimationIcon from '~icons/ic/baseline-hourglass-empty'
import QRCodeIcon from '~icons/ic/baseline-qrcode'
import TimelineIcon from '~icons/ic/baseline-timeline'
import ChatroomIcon from '~icons/ic/outline-chat-bubble-outline'
import PrintIcon from '~icons/ic/outline-local-printshop'
import HomeIcon from '~icons/ic/sharp-house'
import SystemApplicationIcon from '~icons/ic/sharp-polyline'
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

const { renderIcon: renderMenuIcon, renderMenuLabel, t } = RenderUtils

export const menuOptions: MenuOption[] = [
  {
    label: renderMenuLabel(t('Menu.Home')),
    key: 'home',
    icon: renderMenuIcon(HomeIcon)
  },
  {
    label: renderMenuLabel(t('Menu.SystemFunctions')),
    key: 'system-functions',
    icon: renderMenuIcon(SystemFunctionsIcon),
    children: [
      {
        label: renderMenuLabel(t('Menu.UserManagement')),
        key: 'user-management',
        icon: renderMenuIcon(UserManagementIcon)
      },
      {
        label: renderMenuLabel(t('Menu.RoleManagement')),
        key: 'role-management',
        icon: renderMenuIcon(RoleManagementIcon),
        show: false
      },
      {
        label: renderMenuLabel(t('Menu.PermissionManagement')),
        key: 'permission-management',
        icon: renderMenuIcon(PermissionManagementIcon),
        show: false
      }
    ]
  },
  {
    label: renderMenuLabel(t('Menu.SystemApplication')),
    key: 'system-application',
    icon: renderMenuIcon(SystemApplicationIcon),
    children: [
      {
        label: renderMenuLabel(t('Menu.Chatroom')),
        key: 'chatroom',
        icon: renderMenuIcon(ChatroomIcon)
      }
    ]
  },
  {
    label: renderMenuLabel(t('Menu.SystemTools')),
    key: 'system-tools',
    icon: renderMenuIcon(SystemToolsIcon),
    children: [
      {
        label: renderMenuLabel(t('Menu.Icon')),
        key: 'icon',
        icon: renderMenuIcon(IconManagementIcon),
        show: false
      },
      {
        label: renderMenuLabel(t('Menu.QRCode')),
        key: 'qrcode',
        icon: renderMenuIcon(QRCodeIcon)
      },
      {
        label: renderMenuLabel(t('Menu.Clipboard')),
        key: 'clipboard',
        icon: renderMenuIcon(CopyIcon)
      },
      {
        label: renderMenuLabel(t('Menu.Print')),
        key: 'print',
        icon: renderMenuIcon(PrintIcon)
      },
      {
        label: renderMenuLabel(t('Menu.Excel')),
        key: 'excel',
        icon: renderMenuIcon(ExcelIcon)
      },
      {
        label: renderMenuLabel(t('Menu.WebSocket')),
        key: 'websocket',
        icon: renderMenuIcon(WebSocketIcon)
      }
    ]
  },
  {
    label: renderMenuLabel(t('Menu.UniversalComponents')),
    key: 'universal-components',
    icon: renderMenuIcon(UniversalComponentsIcon),
    children: [
      {
        label: renderMenuLabel(t('Menu.Charts')),
        key: 'charts',
        icon: renderMenuIcon(ChartIcon)
      }
    ]
  },
  {
    label: renderMenuLabel(t('Menu.BuiltinComponents')),
    key: 'builtin-components',
    icon: renderMenuIcon(BuiltinComponentsIcon),
    children: [
      {
        label: renderMenuLabel(t('Menu.DigitalAnimation')),
        key: 'digital-animation',
        icon: renderMenuIcon(DigitalAnimationIcon)
      },
      {
        label: renderMenuLabel(t('Menu.Timeline')),
        key: 'timeline',
        icon: renderMenuIcon(TimelineIcon)
      }
    ]
  },
  {
    label: renderMenuLabel(t('Menu.ErrorPages')),
    key: 'error-pages',
    icon: renderMenuIcon(ErrorPagesIcon),
    children: [
      {
        label: renderMenuLabel(t('Menu.403')),
        key: '403',
        icon: renderMenuIcon(UnauthorizedIcon)
      },
      {
        label: renderMenuLabel(t('Menu.404')),
        key: '404',
        icon: renderMenuIcon(NotFoundIcon)
      },
      {
        label: renderMenuLabel(t('Menu.418')),
        key: '418',
        icon: renderMenuIcon(IAmATeapotIcon)
      },
      {
        label: renderMenuLabel(t('Menu.500')),
        key: '500',
        icon: renderMenuIcon(InternalServerErrorIcon)
      }
    ]
  }
]
