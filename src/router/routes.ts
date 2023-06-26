import { siteMetaData } from '@/constants'

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
          title: appName
        }
      },
      {
        path: '/qrcode',
        name: 'qrcode',
        component: () => import('@/views/QRCode'),
        meta: {
          title: 'Menu.QRCode'
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
