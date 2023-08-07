import type { MenuOption } from 'naive-ui'

import CountDownIcon from '~icons/ic/baseline-alarm'
import UniversalComponentsIcon from '~icons/ic/baseline-auto-awesome-mosaic'
import ChartIcon from '~icons/ic/baseline-bar-chart'
import CopyIcon from '~icons/ic/baseline-content-copy'
import UnauthorizedIcon from '~icons/ic/baseline-do-not-disturb'
import ErrorPagesIcon from '~icons/ic/baseline-error-outline'
import DigitalAnimationIcon from '~icons/ic/baseline-hourglass-empty'
import QRCodeIcon from '~icons/ic/baseline-qrcode'
import TimelineIcon from '~icons/ic/baseline-timeline'
import ListTemplatesIcon from '~icons/ic/outline-list-alt'
import PrintIcon from '~icons/ic/outline-local-printshop'
import SystemApplicationsIcon from '~icons/ic/sharp-apps'
import IAmATeapotIcon from '~icons/icon-park-outline/tea-drink'
import InternalServerErrorIcon from '~icons/lucide/server-off'
import UserManagementIcon from '~icons/mdi/account-cog-outline'
import RoleManagementIcon from '~icons/mdi/account-group'
import TrafficStatisticsIcon from '~icons/mdi/chart-box-outline'
import NavigationIcon from '~icons/mdi/compass-outline'
import IconManagementIcon from '~icons/mdi/emoticon-wink'
import SystemFunctionsIcon from '~icons/mdi/function-variant'
import PermissionManagementIcon from '~icons/mdi/key-chain'
import ExcelIcon from '~icons/mdi/microsoft-excel'
import BuiltinComponentsIcon from '~icons/mdi/puzzle'
import SystemToolsIcon from '~icons/mdi/tools'
import WebsiteAnalyticsIcon from '~icons/mdi/web'
import DictionaryManagementIcon from '~icons/ri/booklet-line'
import CodeTemplatesIcon from '~icons/solar/code-bold'
import WebSocketIcon from '~icons/tabler/brand-socket-io'
import NotFoundIcon from '~icons/tabler/error-404'
import ChatChannelsIcon from '~icons/tabler/message-2'

const { renderIcon: renderMenuIcon, renderMenuLabel, t } = RenderUtils

export const menuOptions: MenuOption[] = [
  {
    label: renderMenuLabel(t('Menu.Navigation')),
    key: 'navigation',
    icon: renderMenuIcon(NavigationIcon)
  },
  {
    label: renderMenuLabel(t('Menu.WebsiteAnalytics')),
    key: 'website-analytics',
    icon: renderMenuIcon(WebsiteAnalyticsIcon),
    children: [
      {
        label: renderMenuLabel(t('Menu.TrafficStatistics')),
        key: 'traffic-statistics',
        icon: renderMenuIcon(TrafficStatisticsIcon)
      }
    ]
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
      },
      {
        label: renderMenuLabel(t('Menu.DictionaryManagement')),
        key: 'dictionary-management',
        icon: renderMenuIcon(DictionaryManagementIcon)
      }
    ]
  },
  {
    label: renderMenuLabel(t('Menu.SystemApplications')),
    key: 'system-applications',
    icon: renderMenuIcon(SystemApplicationsIcon),
    show: GlobalEnvConfig.IS_DEV,
    children: [
      {
        label: renderMenuLabel(t('Menu.ChatChannels')),
        key: 'chat-channels',
        icon: renderMenuIcon(ChatChannelsIcon)
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
    label: renderMenuLabel(t('Menu.CodeTemplates')),
    key: 'code-templates',
    icon: renderMenuIcon(CodeTemplatesIcon),
    children: [
      {
        label: renderMenuLabel(t('Menu.ListTemplates')),
        key: 'list-templates',
        icon: renderMenuIcon(ListTemplatesIcon)
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
        label: renderMenuLabel(t('Menu.Countdown')),
        key: 'countdown',
        icon: renderMenuIcon(CountDownIcon)
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

const flattenMenuOptions = (options: MenuOption[]): MenuOption[] =>
  options.flatMap((option) => {
    const newPath = [
      {
        label: option.label,
        key: option.key,
        icon: option.icon,
        show: option.show !== false
      }
    ]

    if (option.children) {
      return flattenMenuOptions(option.children)
    }
    return newPath
  })

export const menuOptionsFlat: MenuOption[] = flattenMenuOptions(menuOptions)
