export const useTagStore = defineStore('tag', () => {
  /**
   * 展示标签页的数据列表，默认空值
   */
  const tags = ref([{ key: 'Home', path: '/' }])
  /**
   * 添加标签页
   */
  const addTagItem = (value: any) => {
    const exists = tags.value.some((item) => item.key === value.key)
    if (exists) return
    tags.value.push(value)
  }

  /**
   * 减少标签页
   */
  const removeTagItem = (value: string) => {
    if (tags.value.length === 1) return
    const index = tags.value.findIndex((item) => item.key === value)
    if (index === tags.value.length - 1) {
      tags.value.pop()
    }
    tags.value.splice(index, 1)
  }

  return {
    tags,
    addTagItem,
    removeTagItem
  }
})
