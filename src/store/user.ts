import type { User } from '@/types'

export const useUserStore = defineStore('user', () => {
  /**
   * 当前登录系统的用户数据
   */
  const user = ref<User>({})

  /**
   * 判断当前用户是否存在
   */
  const hasData = () => user.value.id

  /**
   * 设置当前用户数据，更新方式为”非覆盖式更新“
   * @param data 用户数据
   */
  const setUser = (data: User) => {
    user.value = { ...user.value, ...data }
  }

  /**
   * 清空当前用户数据
   */
  const clearUser = () => {
    user.value = {}
  }

  return {
    user,
    hasData,
    setUser,
    clearUser
  }
})
