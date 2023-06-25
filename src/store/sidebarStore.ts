export const useSidebarStore = defineStore('sidebar', () => {
  const isCollapse = ref(false)
  const changeSidebarStatus = (value: boolean) => {
    isCollapse.value = value
  }
  return {
    isCollapse,
    changeSidebarStatus
  }
})
