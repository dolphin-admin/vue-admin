export const useSidebarStore = defineStore('sidebar', () => {
  /**
   * 是否折叠侧边栏，默认不折叠
   */
  const isCollapse = ref(false)

  /**
   * 是否显示侧边栏，默认显示
   */
  const isDisplay = ref(!BrowserUtils.isMobileDevice())

  /**
   * 修改折叠状态
   */
  const changeSidebarCollapse = (value: boolean) => {
    isCollapse.value = value
  }

  /**
   * 切换折叠状态
   */
  const toggleSidebarCollapse = () => {
    isCollapse.value = !isCollapse.value
  }

  /**
   * 修改显示状态
   */
  const changeSidebarDisplay = (value: boolean) => {
    isDisplay.value = value
  }

  /**
   * 切换显示状态
   */
  const toggleSidebarDisplay = () => {
    isDisplay.value = !isDisplay.value
  }

  return {
    isCollapse,
    isDisplay,
    changeSidebarCollapse,
    toggleSidebarCollapse,
    changeSidebarDisplay,
    toggleSidebarDisplay
  }
})
