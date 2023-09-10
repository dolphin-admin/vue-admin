import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // 标题
    title?: string | (() => string)
    // 图标
    icon?: any
    // 是否忽略权限
    disableAuth?: boolean
    // 是否忽略标签页
    dismissTab?: boolean
  }
}
