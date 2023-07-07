import NProgress from 'nprogress'
import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'

import { routes } from './routes'

NProgress.configure({ showSpinner: false })

const { t } = i18n.global

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

/**
 * 处理目标路由
 * @description
 * - 拼接站点标题
 */
const processTargetRoute = (to: RouteLocationNormalized) => {
  document.title = to.path === '/' ? t('App.Name') : `${t((to.meta?.title ?? '') as string)} | ${t('App.Name')}`
}

const processRouteTag = (to: RouteLocationNormalized) => {
  const tagStore = useTagStore()
  tagStore.tags.push({
    href: to.path,
    labelKey: to.meta?.title as string,
    icon: to.meta?.icon as any
  })
}

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }
  processTargetRoute(to)
  processRouteTag(to)
  next()
})

router.afterEach(() => NProgress.done())

export default router
