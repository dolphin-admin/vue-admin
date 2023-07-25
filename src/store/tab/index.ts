import type { Tab } from '@/types'

export const useTabStore = defineStore('tab', () => {
  /**
   * 展示标签页的数据列表，默认空值
   */
  const tabs = ref<Tab[]>([])

  /**
   * 添加标签页
   */
  const addTab = (tab: Tab) => {
    const exist = tabs.value.some((tabItem) => tabItem.href === tab.href)
    if (exist) {
      return
    }
    tabs.value.push(tab)
  }

  /**
   * 移除标签页
   */
  const removeTab = (index: number) => tabs.value.splice(index, 1)

  /**
   * 根据路由移除标签页
   */
  const removeTabByHref = (href: string) => {
    const index = tabs.value.findIndex((tab) => tab.href === href)
    if (index !== -1) {
      removeTab(index)
    }
  }

  /**
   * 清空标签页
   */
  const clearAll = () => {
    tabs.value = []
  }

  return {
    tabs,
    addTab,
    removeTab,
    removeTabByHref,
    clearAll
  }
})
