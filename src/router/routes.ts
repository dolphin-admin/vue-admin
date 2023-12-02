import ChartIcon from '~icons/ic/baseline-bar-chart'
import CopyIcon from '~icons/ic/baseline-content-copy'
import UnauthorizedIcon from '~icons/ic/baseline-do-not-disturb'
import DigitalAnimationIcon from '~icons/ic/baseline-hourglass-empty'
import QRCodeIcon from '~icons/ic/baseline-qrcode'
import TimelineIcon from '~icons/ic/baseline-timeline'
import ListTemplatesIcon from '~icons/ic/outline-list-alt'
import PrintIcon from '~icons/ic/outline-local-printshop'
import IAmATeapotIcon from '~icons/icon-park-outline/tea-drink'
import InternalServerErrorIcon from '~icons/lucide/server-off'
import UserInfoIcon from '~icons/mdi/account-circle'
import UserManagementIcon from '~icons/mdi/account-cog-outline'
import NavigationIcon from '~icons/mdi/compass-outline'
import ChangePasswordIcon from '~icons/mdi/key'
import WebSocketIcon from '~icons/tabler/brand-socket-io'
import NotFoundIcon from '~icons/tabler/error-404'

import {
  BUILTIN_COMPONENTS_PREFIX,
  CODE_TEMPLATES_PREFIX,
  ERROR_PAGES_PREFIX,
  SYSTEM_FUNCTIONS_PREFIX,
  SYSTEM_TOOLS_PREFIX,
  UNIVERSAL_COMPONENTS_PREFIX
} from './prefix'

const { t } = i18n.global

export const routes = [
  {
    path: '/',
    name: 'base-layout',
    component: () => import('@/layouts/BaseLayout'),
    children: [
      {
        path: '/',
        name: 'navigation',
        component: () => import('@/views/Navigation'),
        meta: {
          title: () => t('TEMP.Menu.Navigation'),
          icon: NavigationIcon
          // dismissTab: true
        }
      },
      // 系统功能
      {
        path: `${SYSTEM_FUNCTIONS_PREFIX}/user-management`,
        name: 'user-management',
        component: () => import('@/views/SystemFunctions/UserManagement'),
        meta: {
          title: () => t('TEMP.Menu.UserManagement'),
          icon: UserManagementIcon
        }
      },
      // 系统工具
      {
        path: `${SYSTEM_TOOLS_PREFIX}/qrcode`,
        name: 'qrcode',
        component: () => import('@/views/SystemTools/QRCode'),
        meta: {
          title: () => t('TEMP.Menu.QRCode'),
          icon: QRCodeIcon
        }
      },
      {
        path: `${SYSTEM_TOOLS_PREFIX}/clipboard`,
        name: 'clipboard',
        component: () => import('@/views/SystemTools/Clipboard'),
        meta: {
          title: () => t('TEMP.Menu.Clipboard'),
          icon: CopyIcon
        }
      },
      {
        path: `${SYSTEM_TOOLS_PREFIX}/print`,
        name: 'print',
        component: () => import('@/views/SystemTools/Print'),
        meta: {
          title: () => t('TEMP.Menu.Print'),
          icon: PrintIcon
        }
      },
      {
        path: `${SYSTEM_TOOLS_PREFIX}/websocket`,
        name: 'websocket',
        component: () => import('@/views/SystemTools/WebSocket'),
        meta: {
          title: () => t('TEMP.Menu.WebSocket'),
          icon: WebSocketIcon
        }
      },
      // 代码模板
      {
        path: `${CODE_TEMPLATES_PREFIX}/list-templates`,
        name: 'list-templates',
        component: () => import('@/views/CodeTemplates/ListTemplates'),
        meta: {
          title: () => t('TEMP.Menu.ListTemplates'),
          icon: ListTemplatesIcon
        }
      },
      // 通用组件
      {
        path: `${UNIVERSAL_COMPONENTS_PREFIX}/charts`,
        name: 'charts',
        component: () => import('@/views/UniversalComponents/Charts'),
        meta: {
          title: () => t('TEMP.Menu.Charts'),
          icon: ChartIcon
        }
      },
      // 内置组件
      {
        path: `${BUILTIN_COMPONENTS_PREFIX}/digital-animation`,
        name: 'digital-animation',
        component: () => import('@/views/BuiltinComponents/DigitalAnimation'),
        meta: {
          title: () => t('TEMP.Menu.DigitalAnimation'),
          icon: DigitalAnimationIcon
        }
      },
      {
        path: `${BUILTIN_COMPONENTS_PREFIX}/timeline`,
        name: 'timeline',
        component: () => import('@/views/BuiltinComponents/Timeline'),
        meta: {
          title: () => t('TEMP.Menu.Timeline'),
          icon: TimelineIcon
        }
      },
      // 错误页面
      {
        path: `${ERROR_PAGES_PREFIX}/403`,
        name: '403',
        component: () => import('@/pages/error-pages/403'),
        meta: {
          title: '403',
          icon: UnauthorizedIcon
        }
      },
      {
        path: `${ERROR_PAGES_PREFIX}/404`,
        name: '404',
        component: () => import('@/pages/error-pages/404'),
        meta: {
          title: '404',
          icon: NotFoundIcon
        }
      },
      {
        path: `${ERROR_PAGES_PREFIX}/418`,
        name: '418',
        component: () => import('@/pages/error-pages/418'),
        meta: {
          title: '418',
          icon: IAmATeapotIcon
        }
      },
      {
        path: `${ERROR_PAGES_PREFIX}/500`,
        name: '500',
        component: () => import('@/pages/error-pages/500'),
        meta: {
          title: '500',
          icon: InternalServerErrorIcon
        }
      },
      {
        path: '/user-info',
        name: 'user-info',
        component: () => import('@/views/User/UserInfo'),
        meta: {
          title: () => t('TEMP.Menu.UserInfo'),
          icon: UserInfoIcon
        }
      },
      {
        path: '/change-password',
        name: 'change-password',
        component: () => import('@/views/User/ChangePassword'),
        meta: {
          title: () => t('TEMP.Menu.ChangePassword'),
          icon: ChangePasswordIcon
        }
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/error-pages/404'),
        meta: {
          title: '404',
          icon: NotFoundIcon
        }
      }
    ]
  },
  // 认证页面：不需要登录即可访问
  {
    path: '/',
    name: 'auth-layout',
    component: () => import('@/layouts/AuthLayout'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Auth/Login'),
        meta: {
          title: () => t('TEMP.Menu.Login'),
          disableAuth: true,
          dismissTab: true
        }
      },
      {
        path: '/signup',
        name: 'signup',
        component: () => import('@/views/Auth/Signup'),
        meta: {
          title: () => t('TEMP.Menu.Signup'),
          disableAuth: true,
          dismissTab: true
        }
      }
    ]
  },
  // 授权重定向页面
  {
    path: '/auth-redirect',
    name: 'auth-redirect',
    component: () => import('@/views/Auth/AuthRedirect'),
    meta: {
      title: () => t('TEMP.AuthRedirect.Authorizing'),
      disableAuth: true,
      dismissTab: true
    }
  }
]
