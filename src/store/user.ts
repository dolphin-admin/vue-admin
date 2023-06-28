import type { User } from '@/types'

export const useUserStore = defineStore('user', () => {
  const user = ref<User>({})

  const setUser = (data: User) => {
    user.value = { ...user.value, ...data }
  }

  const clearUser = () => {
    user.value = {}
  }

  return {
    user,
    setUser,
    clearUser
  }
})
