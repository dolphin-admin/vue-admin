import type { User } from '@/types'

export const useUserStore = defineStore('user', () => {
  const user = ref<User>({})

  const hasData = () => user.value.id

  const setUser = (data: User) => {
    user.value = { ...user.value, ...data }
  }

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
