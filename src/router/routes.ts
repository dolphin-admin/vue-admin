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
    path: '/store',
    name: 'store',
    component: () => import('@/views/Store'),
    meta: {
      title: 'Store'
    }
  },
  {
    path: '/api',
    name: 'api',
    component: () => import('@/views/API'),
    meta: {
      title: 'API'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound'),
    meta: {
      title: '404'
    }
  }
]
