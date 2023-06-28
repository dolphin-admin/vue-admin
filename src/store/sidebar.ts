export const useSidebarStore = defineStore('sidebar', () => {
  const isCollapse = ref(false)
  const isDisplay = ref(false) // Only use in mobile mode

  const changeSidebarStatus = (value: boolean) => {
    isCollapse.value = value
  }

  const toggleSidebarStatus = () => {
    isCollapse.value = !isCollapse.value
  }

  const changeSidebarDisplay = (value: boolean) => {
    isDisplay.value = value
  }

  const toggleSidebarDisplay = () => {
    isDisplay.value = !isDisplay.value
  }

  return {
    isCollapse,
    changeSidebarStatus,
    toggleSidebarStatus,
    changeSidebarDisplay,
    toggleSidebarDisplay
  }
})
