import ChartIcon from '~icons/ic/baseline-bar-chart'
import CopyIcon from '~icons/ic/baseline-content-copy'
import DigitalAnimationIcon from '~icons/ic/baseline-hourglass-empty'
import QRCodeIcon from '~icons/ic/baseline-qrcode'
import PrintIcon from '~icons/ic/outline-local-printshop'
import UnauthorizedIcon from '~icons/ic/outline-looks-3'
import NotFoundIcon from '~icons/ic/outline-looks-4'
import InternalServerErrorIcon from '~icons/ic/outline-looks-5'
import HomeIcon from '~icons/ic/sharp-house'
import UserInfoIcon from '~icons/mdi/account-circle'
import UserManagementIcon from '~icons/mdi/account-cog-outline'
import RoleManagementIcon from '~icons/mdi/account-group'
import IconManagementIcon from '~icons/mdi/emoticon-wink'
import ChangePasswordIcon from '~icons/mdi/key'
import PermissionManagementIcon from '~icons/mdi/key-chain'
import ExcelIcon from '~icons/mdi/microsoft-excel'
import WebSocketIcon from '~icons/tabler/brand-socket-io'

import {
  BUILTIN_COMPONENTS_PREFIX,
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
          title: () => t('Menu.Navigation'),
          dismissTab: true
        }
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home'),
        meta: {
          title: () => t('Menu.Home'),
          icon: HomeIcon
        }
      },
      {
        path: '/user-info',
        name: 'user-info',
        component: () => import('@/views/UserInfo'),
        meta: {
          title: () => t('Menu.UserInfo'),
          icon: UserInfoIcon
        }
      },
      {
        path: '/change-password',
        name: 'change-password',
        component: () => import('@/views/ChangePassword'),
        meta: {
          title: () => t('Menu.ChangePassword'),
          icon: ChangePasswordIcon
        }
      },
      {
        path: `${SYSTEM_FUNCTIONS_PREFIX}/user-management`,
        name: 'user-management',
        component: () => import('@/views/SystemFunctions/UserManagement'),
        meta: {
          title: () => t('Menu.UserManagement'),
          icon: UserManagementIcon
        }
      },
      {
        path: `${SYSTEM_FUNCTIONS_PREFIX}/role-management`,
        name: 'role-management',
        component: () => import('@/views/SystemFunctions/RoleManagement'),
        meta: {
          title: () => t('Menu.RoleManagement'),
          icon: RoleManagementIcon
        }
      },
      {
        path: `${SYSTEM_FUNCTIONS_PREFIX}/permission-management`,
        name: 'permission-management',
        component: () => import('@/views/SystemFunctions/PermissionManagement'),
        meta: {
          title: () => t('Menu.PermissionManagement'),
          icon: PermissionManagementIcon
        }
      },
      {
        path: `${SYSTEM_TOOLS_PREFIX}/icon`,
        name: 'icon',
        component: () => import('@/views/SystemTools/Icon'),
        meta: {
          title: () => t('Menu.Icon'),
          icon: IconManagementIcon
        }
      },
      {
        path: `${SYSTEM_TOOLS_PREFIX}/qrcode`,
        name: 'qrcode',
        component: () => import('@/views/SystemTools/QRCode'),
        meta: {
          title: () => t('Menu.QRCode'),
          icon: QRCodeIcon
        }
      },
      {
        path: `${SYSTEM_TOOLS_PREFIX}/clipboard`,
        name: 'clipboard',
        component: () => import('@/views/SystemTools/Clipboard'),
        meta: {
          title: () => t('Menu.Clipboard'),
          icon: CopyIcon
        }
      },
      {
        path: `${SYSTEM_TOOLS_PREFIX}/print`,
        name: 'print',
        component: () => import('@/views/SystemTools/Print'),
        meta: {
          title: () => t('Menu.Print'),
          icon: PrintIcon
        }
      },
      {
        path: `${SYSTEM_TOOLS_PREFIX}/excel`,
        name: 'excel',
        component: () => import('@/views/SystemTools/Excel'),
        meta: {
          title: () => t('Menu.Excel'),
          icon: ExcelIcon
        }
      },
      {
        path: `${SYSTEM_TOOLS_PREFIX}/websocket`,
        name: 'websocket',
        component: () => import('@/views/SystemTools/WebSocket'),
        meta: {
          title: () => t('Menu.WebSocket'),
          icon: WebSocketIcon
        }
      },
      {
        path: `${UNIVERSAL_COMPONENTS_PREFIX}/charts`,
        name: 'charts',
        component: () => import('@/views/UniversalComponents/Charts'),
        meta: {
          title: () => t('Menu.Charts'),
          icon: ChartIcon
        }
      },
      {
        path: `${BUILTIN_COMPONENTS_PREFIX}/digital-animation`,
        name: 'digital-animation',
        component: () => import('@/views/BuiltinComponents/DigitalAnimation'),
        meta: {
          title: () => t('Menu.DigitalAnimation'),
          icon: DigitalAnimationIcon
        }
      },
      {
        path: `${ERROR_PAGES_PREFIX}/403`,
        name: '403',
        component: () => import('@/views/ErrorPages/403'),
        meta: {
          title: () => t('Menu.403'),
          icon: UnauthorizedIcon
        }
      },
      {
        path: `${ERROR_PAGES_PREFIX}/404`,
        name: '404',
        component: () => import('@/views/ErrorPages/404'),
        meta: {
          title: () => t('Menu.404'),
          icon: NotFoundIcon
        }
      },
      {
        path: `${ERROR_PAGES_PREFIX}/500`,
        name: '500',
        component: () => import('@/views/ErrorPages/500'),
        meta: {
          title: () => t('Menu.500'),
          icon: InternalServerErrorIcon
        }
      },
      {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('@/views/ErrorPages/404'),
        meta: {
          title: () => t('Menu.404'),
          icon: NotFoundIcon
        }
      }
    ]
  },
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
          title: () => t('Menu.Login'),
          disableAuth: true,
          dismissTab: true
        }
      },
      {
        path: '/signup',
        name: 'signup',
        component: () => import('@/views/Auth/Signup'),
        meta: {
          title: () => t('Menu.Signup'),
          disableAuth: true,
          dismissTab: true
        }
      }
    ]
  },
  {
    path: '/auth-redirect',
    name: 'auth-redirect',
    component: () => import('@/views/Auth/AuthRedirect'),
    meta: {
      title: () => t('AuthRedirect.Authorizing'),
      disableAuth: true,
      dismissTab: true
    }
  }
]
