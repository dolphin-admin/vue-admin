import type { VNodeChild } from 'vue'
import { type RouteLocationNormalized } from 'vue-router'

/**
 * 处理添加标签页
 */
export const processRouteTag = (to: RouteLocationNormalized) => {
  // 如果路由配置了 dismissTab，则不添加标签页
  if (to.meta?.dismissTab) {
    return
  }

  const tagStore = useTabStore()
  tagStore.addTab({
    href: to.path,
    label: to.meta?.title as string | (() => VNodeChild),
    icon: shallowRef(to.meta?.icon as any) // shallowRef 包裹组件，避免深层响应
  })
}
