import { acceptHMRUpdate } from 'pinia'

export const useSidebarStore = defineStore('sidebar', () => {
  /**
   * 是否折叠侧边栏，默认不折叠
   */
  const isCollapse = ref(false)

  /**
   * 是否显示侧边栏，默认显示
   */
  const isDisplay = ref(!BrowserUtils.isMobile())

  /**
   * 修改折叠状态
   */
  const setIsCollapse = (value: boolean) => {
    isCollapse.value = value
  }

  /**
   * 切换折叠状态
   */
  const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value
  }

  /**
   * 修改显示状态
   */
  const setIsDisplay = (value: boolean) => {
    isDisplay.value = value
  }

  /**
   * 切换显示状态
   */
  const toggleDisplay = () => {
    isDisplay.value = !isDisplay.value
  }

  return {
    isCollapse,
    isDisplay,
    setIsCollapse,
    toggleCollapse,
    setIsDisplay,
    toggleDisplay
  }
})

/**
 * HMR
 * @see https://pinia.vuejs.org/zh/cookbook/hot-module-replacement.html
 */
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSidebarStore, import.meta.hot))
}
