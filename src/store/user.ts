import type { NullableObj, User } from '@/types'

export const useUserStore = defineStore('user', () => {
  const userInfo = reactive<NullableObj<User>>({
    id: null,
    uuid: null,
    username: null,
    email: null,
    phoneNumber: null,
    address: null,
    avatarUrl: null,
    biography: null
  })

  const setUserInfo = (user: User) => {
    const userKeys = Object.keys(user) as (keyof User)[]
    userKeys.forEach((key) => {
      userInfo[key] = user[key] as any
    })
  }

  const haveUserInfo = () => userInfo.id

  return {
    userInfo,
    setUserInfo,
    haveUserInfo
  }
})
