export const useSidebarStore = defineStore('sidebar', () => {
  const isCollapse = ref(false)

  const changeSidebarStatus = (value: boolean) => {
    isCollapse.value = value
  }

  const toggleSidebarStatus = () => {
    isCollapse.value = !isCollapse.value
  }

  return {
    isCollapse,
    changeSidebarStatus,
    toggleSidebarStatus
  }
})
