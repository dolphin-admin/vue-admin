import type { Tab } from '@/types'

export const useTabStore = defineStore('tab', () => {
  /**
   * 展示标签页的数据列表，默认空值
   */
  const tabs = ref<Tab[]>([])

  /**
   * 添加标签页
   */
  const addTabItem = (tab: Tab) => {
    const exist = tabs.value.some((tabItem) => tabItem.labelKey === tab.labelKey)
    if (exist) return
    tabs.value.push(tab)
  }

  /**
   * 移除标签页
   */
  const removeTabItem = (index: number) => tabs.value.splice(index, 1)

  /**
   * 清空标签页
   */
  const clearAllTabs = (currentPath: string) => {
    tabs.value = tabs.value.filter((item) => item.href === currentPath)
  }

  return {
    tabs,
    addTabItem,
    removeTabItem,
    clearAllTabs
  }
})
