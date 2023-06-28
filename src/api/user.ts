import { BasePageModel, GlobalEnvConfig } from '@/constants'
import type { PageResponseData, User } from '@/types'

import Request from './axios'

const USER_API_PREFIX = `${GlobalEnvConfig.API_PREFIX}/users`

export const UserApi = {
  getUsers: () => <Promise<PageResponseData<User[]>>>Request.get<User[]>(USER_API_PREFIX, new BasePageModel()),
  getUser: (id: number) => Request.get<User>(`${USER_API_PREFIX}/${id}`),
  getUserInfo: () => Request.get<User>(`${USER_API_PREFIX}/info`),
  updateUser: (id: number, data: User) => Request.put<User>(`${USER_API_PREFIX}/${id}`, { ...data })
}
