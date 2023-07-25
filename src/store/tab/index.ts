import type { Tab } from '@/types'

export const useTabStore = defineStore('tab', () => {
  /**
   * 展示标签页的数据列表，默认空值
   */
  const tabs = ref<Tab[]>([])

  /**
   * 当前拖拽的元素位置和拖拽到的位置
   */
  const record = reactive({
    current: -1,
    replace: -1
  })

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

  /**
   * 拖拽修改标签页
   */
  const dragTabs = () => {
    if (record.current === -1 || record.replace === -1) {
      return
    }
    const [removedValue] = tabs.value.splice(record.current, 1)
    tabs.value.splice(record.replace, 0, removedValue)
  }

  /**
   * 修改记录值current
   */
  const setCurrent = (index: number) => {
    record.current = index
  }

  /**
   * 修改记录值Replace
   */
  const setReplace = (index: number) => {
    record.replace = index
  }

  return {
    tabs,
    record,
    addTab,
    removeTab,
    removeTabByHref,
    clearAll,
    dragTabs,
    setCurrent,
    setReplace
  }
})
