import type { Tag } from '@/types'

export const useTagStore = defineStore('tag', () => {
  /**
   * 展示标签页的数据列表，默认空值
   */
  const tags = ref<Tag[]>([])

  /**
   * 添加标签页
   */
  const addTagItem = (tag: Tag) => {
    const exist = tags.value.some((item) => {
      return item.labelKey === tag.labelKey
    })
    if (exist) return
    tags.value.push(tag)
  }

  /**
   * 移除标签页
   */
  const removeTagItem = (index: number) => {
    if (tags.value.length === 1) return
    tags.value.splice(index, 1)
  }

  /**
   * 清空标签页
   */
  const clearAllTags = (currentPath: string) => {
    tags.value = tags.value.filter((item) => item.href === currentPath)
  }

  return {
    tags,
    addTagItem,
    removeTagItem,
    clearAllTags
  }
})
