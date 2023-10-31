type LoadingDispatcher = {
  loading: () => void
  loaded: () => void
}

/**
 * 加载状态 Hook
 * @param defaultStatus 默认的加载状态
 */
export const useLoading = (
  defaultStatus: boolean = false
): [Ref<boolean>, LoadingDispatcher] => {
  /**
   * 加载状态
   */
  const loading = ref(defaultStatus)

  /**
   * 加载状态调度器
   * @description
   * - `loading`: 开始加载
   * - `loaded`: 加载完成
   */
  const dispatcher: LoadingDispatcher = {
    loading: () => {
      loading.value = true
    },
    loaded: () => {
      loading.value = false
    }
  }

  return [loading, dispatcher]
}
