import NProgress from 'nprogress'
import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'

import { i18n } from '@/i18n'

import { routes } from './routes'

const { t } = i18n.global
NProgress.configure({ showSpinner: false })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

const processTargetRoute = (to: RouteLocationNormalized) => {
  document.title = to.path === '/' ? t('App.Name') : `${t((to.meta?.title ?? '') as string)} | ${t('App.Name')}` // Change the title of the document
}

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }
  processTargetRoute(to)
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
