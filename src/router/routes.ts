import { siteMetaData } from '@/constants'

const { appName } = siteMetaData

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home'),
    meta: {
      title: appName
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: {
      title: '登录',
      disableAuth: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register'),
    meta: {
      title: '注册',
      disableAuth: true
    }
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
