import type { Tag } from '@/types'

export const useTagStore = defineStore('tag', () => {
  /**
   * 展示标签页的数据列表，默认空值
   */
  const tags = ref<Tag[]>([])
  /**
   * 添加标签页
   */
  const addTagItem = (tag: Tag) => tags.value.push(tag)

  /**
   * 移除标签页
   */
  const removeTagItem = (index: number) => {
    tags.value.splice(index, 1)
  }

  return {
    tags,
    addTagItem,
    removeTagItem
  }
})
