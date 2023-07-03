export const useSidebarStore = defineStore('sidebar', () => {
  const isCollapse = ref(false)
  const isDisplay = ref(true)

  const changeSidebarCollapse = (value: boolean) => {
    isCollapse.value = value
  }

  const toggleSidebarCollapse = () => {
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
    isDisplay,
    changeSidebarCollapse,
    toggleSidebarCollapse,
    changeSidebarDisplay,
    toggleSidebarDisplay
  }
})
