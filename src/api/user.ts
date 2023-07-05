import type { BaseResponse, ChangePasswordInputModel, LoginInputModel, PageModel, PageResponse, User } from '@/types'

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

  static createUser(data: LoginInputModel) {
    return Request.post<BaseResponse<User>>(this.USER_API_PREFIX, { ...data })
  }

  static updateUser(id: number, data: User) {
    return Request.patch<BaseResponse<User>>(`${this.USER_API_PREFIX}/${id}`, { ...data })
  }

  static enableUsers(id: number) {
    return Request.post<BaseResponse<User>>(`${this.USER_API_PREFIX}/${id}/activate`)
  }

  static disableUsers(id: number) {
    return Request.post<BaseResponse<User>>(`${this.USER_API_PREFIX}/${id}/deactivate`)
  }

  static resetPassword(id: number, password: String) {
    return Request.post<BaseResponse<User>>(`${this.USER_API_PREFIX}/${id}/reset-password`, { password })
  }

  static changePassword(id: number, data: ChangePasswordInputModel) {
    return Request.post<BaseResponse<User>>(`${this.USER_API_PREFIX}/${id}/change-password`, { ...data })
  }
}
