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

/**
 * 处理添加标签页
 */
const processRouteTag = (to: RouteLocationNormalized) => {
  // 如果路由配置了 disableAuth，则不添加标签页
  if (to.meta?.disableAuth) {
    return
  }

  const tagStore = useTabStore()
  tagStore.addTabItem({
    href: to.path,
    labelKey: to.meta?.title as string,
    icon: shallowRef(to.meta?.icon as any) // shallowRef 包裹组件，避免深层响应
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
