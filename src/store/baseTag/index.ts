export const useBaseTagStore = defineStore('baseTag', () => {
  /**
   * 展示标签页的数据，默认空值
   */
  const baseTagData = ref([{ key: 'Home', path: '/' }])
  /**
   * 增加一个数组对象元素
   */
  const addBaseTagData = (value: any) => {
    const exists = baseTagData.value.some((item) => item.key === value.key)
    if (exists) return
    baseTagData.value.push(value)
  }

  /**
   * 减少一个数组对象元素
   */
  const reduceBaseTagData = (value: string) => {
    if (baseTagData.value.length === 1) return
    const index = baseTagData.value.findIndex((item) => item.key === value)
    if (index === baseTagData.value.length - 1) {
      baseTagData.value.pop()
    }
    baseTagData.value.splice(index, 1)
  }

  return {
    baseTagData,
    addBaseTagData,
    reduceBaseTagData
  }
})
