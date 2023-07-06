import type { BaseResponse, PageModel, PageResponse, User } from '@/types'

import Request from '../axios'
import type { ChangePasswordModel, LoginModel, SignupModel, UserTokenResponse } from './type'

export class UserAPI {
  private static USER_API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/users`

  /**
   * 登录
   */
  static login(data: LoginModel) {
    return Request.post<BaseResponse<UserTokenResponse>>(`${GlobalEnvConfig.BASE_API_PREFIX}/login`, { ...data })
  }

  /**
   * 注册
   */
  static signup(data: SignupModel) {
    return Request.post<BaseResponse<UserTokenResponse>>(`${GlobalEnvConfig.BASE_API_PREFIX}/signup`, { ...data })
  }

  /**
   * 用户列表
   */
  static getUsers(params: PageModel) {
    return Request.get<PageResponse<User[]>>(this.USER_API_PREFIX, { ...params })
  }

  /**
   * 用户信息
   */
  static getUser(id: number) {
    return Request.get<BaseResponse<User>>(`${this.USER_API_PREFIX}/${id}`)
  }

  /**
   * 当前用户
   * @description 通过当前登录用户的 token 获取用户信息
   */
  static getUserInfo() {
    return Request.get<BaseResponse<User>>(`${this.USER_API_PREFIX}/info`)
  }

  /**
   * 创建用户
   */
  static createUser(data: LoginModel) {
    return Request.post<BaseResponse<User>>(this.USER_API_PREFIX, { ...data })
  }

  /**
   * 更新用户
   */
  static updateUser(id: number, data: User) {
    return Request.patch<BaseResponse<User>>(`${this.USER_API_PREFIX}/${id}`, { ...data })
  }

  /**
   * 启用用户
   */
  static enableUsers(id: number) {
    return Request.post<BaseResponse<User>>(`${this.USER_API_PREFIX}/${id}/activate`)
  }

  /**
   * 禁用用户
   */
  static disableUsers(id: number) {
    return Request.post<BaseResponse<User>>(`${this.USER_API_PREFIX}/${id}/deactivate`)
  }

  /**
   * 重置密码
   */
  static resetPassword(id: number, password: string) {
    return Request.post<BaseResponse<User>>(`${this.USER_API_PREFIX}/${id}/reset-password`, { password })
  }

  /**
   * 修改密码
   */
  static changePassword(id: number, data: ChangePasswordModel) {
    return Request.post<BaseResponse<User>>(`${this.USER_API_PREFIX}/${id}/change-password`, { ...data })
  }
}
