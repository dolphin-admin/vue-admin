import type { MenuOption } from 'naive-ui'

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
import IAmATeapotIcon from '~icons/icon-park-outline/tea-drink'
import InternalServerErrorIcon from '~icons/lucide/server-off'
import UserManagementIcon from '~icons/mdi/account-cog-outline'
import NavigationIcon from '~icons/mdi/compass-outline'
import SystemFunctionsIcon from '~icons/mdi/function-variant'
import BuiltinComponentsIcon from '~icons/mdi/puzzle'
import SystemToolsIcon from '~icons/mdi/tools'
import CodeTemplatesIcon from '~icons/solar/code-bold'
import WebSocketIcon from '~icons/tabler/brand-socket-io'
import NotFoundIcon from '~icons/tabler/error-404'

const { t } = i18n.global
const { renderIcon: renderMenuIcon, renderMenuLabel } = RenderUtils

export const menuOptions: MenuOption[] = [
  {
    label: renderMenuLabel(() => t('TEMP.Menu.Navigation')),
    key: 'navigation',
    icon: renderMenuIcon(NavigationIcon)
  },
  {
    label: renderMenuLabel(() => t('TEMP.Menu.SystemFunctions')),
    key: 'system-functions',
    icon: renderMenuIcon(SystemFunctionsIcon),
    children: [
      {
        label: renderMenuLabel(() => t('TEMP.Menu.UserManagement')),
        key: 'user-management',
        icon: renderMenuIcon(UserManagementIcon)
      }
    ]
  },
  {
    label: renderMenuLabel(() => t('TEMP.Menu.SystemTools')),
    key: 'system-tools',
    icon: renderMenuIcon(SystemToolsIcon),
    children: [
      {
        label: renderMenuLabel(() => t('TEMP.Menu.QRCode')),
        key: 'qrcode',
        icon: renderMenuIcon(QRCodeIcon)
      },
      {
        label: renderMenuLabel(() => t('TEMP.Menu.Clipboard')),
        key: 'clipboard',
        icon: renderMenuIcon(CopyIcon)
      },
      {
        label: renderMenuLabel(() => t('TEMP.Menu.Print')),
        key: 'print',
        icon: renderMenuIcon(PrintIcon)
      },
      {
        label: renderMenuLabel(() => t('TEMP.Menu.WebSocket')),
        key: 'websocket',
        icon: renderMenuIcon(WebSocketIcon)
      }
    ]
  },
  {
    label: renderMenuLabel(() => t('TEMP.Menu.CodeTemplates')),
    key: 'code-templates',
    icon: renderMenuIcon(CodeTemplatesIcon),
    children: [
      {
        label: renderMenuLabel(() => t('TEMP.Menu.ListTemplates')),
        key: 'list-templates',
        icon: renderMenuIcon(ListTemplatesIcon)
      }
    ]
  },
  {
    label: renderMenuLabel(() => t('TEMP.Menu.UniversalComponents')),
    key: 'universal-components',
    icon: renderMenuIcon(UniversalComponentsIcon),
    children: [
      {
        label: renderMenuLabel(() => t('TEMP.Menu.Charts')),
        key: 'charts',
        icon: renderMenuIcon(ChartIcon)
      }
    ]
  },
  {
    label: renderMenuLabel(() => t('TEMP.Menu.BuiltinComponents')),
    key: 'builtin-components',
    icon: renderMenuIcon(BuiltinComponentsIcon),
    children: [
      {
        label: renderMenuLabel(() => t('TEMP.Menu.DigitalAnimation')),
        key: 'digital-animation',
        icon: renderMenuIcon(DigitalAnimationIcon)
      },
      {
        label: renderMenuLabel(() => t('TEMP.Menu.Timeline')),
        key: 'timeline',
        icon: renderMenuIcon(TimelineIcon)
      }
    ]
  },
  {
    label: renderMenuLabel(() => t('MENU.ERROR.PAGES')),
    key: 'error-pages',
    icon: renderMenuIcon(ErrorPagesIcon),
    children: [
      {
        label: renderMenuLabel(() => '403'),
        key: '403',
        icon: renderMenuIcon(UnauthorizedIcon)
      },
      {
        label: renderMenuLabel(() => '404'),
        key: '404',
        icon: renderMenuIcon(NotFoundIcon)
      },
      {
        label: renderMenuLabel(() => '418'),
        key: '418',
        icon: renderMenuIcon(IAmATeapotIcon)
      },
      {
        label: renderMenuLabel(() => '500'),
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
