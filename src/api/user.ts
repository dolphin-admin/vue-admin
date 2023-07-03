import type { BaseResponse, PageModel, PageResponse, User } from '@/types'

import Request from './axios'
export class UserAPI {
  private static USER_API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/users`

  static getUsers(params: PageModel) {
    return Request.get<PageResponse<User[]>>(this.USER_API_PREFIX, { ...params })
  }

  static getUser(id: number) {
    return Request.get<BaseResponse<User>>(`${this.USER_API_PREFIX}/${id}`)
  }

  static getUserInfo() {
    return Request.get<BaseResponse<User>>(`${this.USER_API_PREFIX}/info`)
  }

  static createUser() {
    return Request.post<BaseResponse<User>>(this.USER_API_PREFIX)
  }

  static updateUser(id: number, data: User) {
    return Request.put<BaseResponse<User>>(`${this.USER_API_PREFIX}/${id}`, { ...data })
  }
}
