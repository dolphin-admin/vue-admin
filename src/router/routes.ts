import QRCodeIcon from '~icons/ic/baseline-qrcode'
import HomeIcon from '~icons/ic/sharp-house'
import UserManagementIcon from '~icons/mdi/account-cog-outline'
import RoleManagementIcon from '~icons/mdi/account-group'
import IconManagementIcon from '~icons/mdi/emoticon-wink'
import PermissionManagementIcon from '~icons/mdi/key-chain'

const { appName } = siteMetaData

export const routes = [
  {
    path: '/',
    name: 'base-layout',
    component: () => import('@/layouts/BaseLayout'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home'),
        meta: {
          title: appName,
          icon: HomeIcon
        }
      },
      {
        path: '/user-info',
        name: 'user-info',
        component: () => import('@/views/UserInfo'),
        meta: {
          title: 'Menu.UserInfo'
        }
      },
      {
        path: '/change-password',
        name: 'change-password',
        component: () => import('@/views/ChangePassword'),
        meta: {
          title: 'Menu.ChangePassword'
        }
      },
      {
        path: '/user-management',
        name: 'user-management',
        component: () => import('@/views/UserManagement'),
        meta: {
          title: 'Menu.UserManagement',
          icon: UserManagementIcon
        }
      },
      {
        path: '/role-management',
        name: 'role-management',
        component: () => import('@/views/RoleManagement'),
        meta: {
          title: 'Menu.RoleManagement',
          icon: RoleManagementIcon
        }
      },
      {
        path: '/permission-management',
        name: 'permission-management',
        component: () => import('@/views/PermissionManagement'),
        meta: {
          title: 'Menu.PermissionManagement',
          icon: PermissionManagementIcon
        }
      },
      {
        path: '/icon-management',
        name: 'icon-management',
        component: () => import('@/views/IconManagement'),
        meta: {
          title: 'Menu.IconManagement',
          icon: IconManagementIcon
        }
      },
      {
        path: '/qrcode',
        name: 'qrcode',
        component: () => import('@/views/QRCode'),
        meta: {
          title: 'Menu.QRCode',
          icon: QRCodeIcon
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
        component: () => import('@/views/Login'),
        meta: {
          title: 'Menu.Login',
          disableAuth: true
        }
      },
      {
        path: '/signup',
        name: 'signup',
        component: () => import('@/views/Signup'),
        meta: {
          title: 'Menu.Signup',
          disableAuth: true
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound'),
    meta: {
      title: '404',
      disableAuth: true
    }
  }
]
