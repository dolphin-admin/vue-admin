import { GlobalEnvConfig } from '@/constants'
import type { BaseResponse, PageModel, PageResponse, User } from '@/types'

import Request from './axios'

const USER_API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/users`

export const UserApi = {
  getUsers: (params: PageModel) => Request.get<PageResponse<User[]>>(USER_API_PREFIX, { ...params }),
  getUser: (id: number) => Request.get<BaseResponse<User>>(`${USER_API_PREFIX}/${id}`),
  getUserInfo: () => Request.get<BaseResponse<User>>(`${USER_API_PREFIX}/info`),
  updateUser: (id: number, data: User) => Request.put<BaseResponse<User>>(`${USER_API_PREFIX}/${id}`, { ...data }),
  createUser: () => Request.post<BaseResponse<User>>(`${USER_API_PREFIX}`)
}
