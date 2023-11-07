import type {
  BaseResponse,
  ChangePasswordModel,
  CreateUserModel,
  PageRequestModel,
  PageResponse,
  User
} from '@/types'

export class UserAPI {
  private static USER_API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/users`

  /**
   * 用户列表
   */
  static getUsers(params: PageRequestModel) {
    return httpRequest.get<PageResponse<User[]>>(this.USER_API_PREFIX, {
      ...params
    })
  }

  /**
   * 用户信息
   */
  static getUser(id: number) {
    return httpRequest.get<BaseResponse<User>>(`${this.USER_API_PREFIX}/${id}`)
  }

  /**
   * 当前用户
   * @description 通过当前登录用户的 token 获取用户信息
   */
  static getUserInfo() {
    return httpRequest.get<BaseResponse<User>>(`${this.USER_API_PREFIX}/info`)
  }

  /**
   * 创建用户
   */
  static createUser(data: CreateUserModel) {
    return httpRequest.post<BaseResponse<User>>(this.USER_API_PREFIX, {
      ...data
    })
  }

  /**
   * 更新用户
   */
  static updateUser(id: number, data: User) {
    return httpRequest.patch<BaseResponse<User>>(`${this.USER_API_PREFIX}/${id}`, {
      ...data
    })
  }

  /**
   * 启用用户
   */
  static enableUser(id: number) {
    return httpRequest.post<BaseResponse<User>>(`${this.USER_API_PREFIX}/${id}/activate`)
  }

  /**
   * 禁用用户
   */
  static disableUser(id: number) {
    return httpRequest.post<BaseResponse<User>>(`${this.USER_API_PREFIX}/${id}/deactivate`)
  }

  /**
   * 重置密码
   */
  static resetPassword(id: number, password: string) {
    return httpRequest.post<BaseResponse<User>>(`${this.USER_API_PREFIX}/${id}/reset-password`, {
      password
    })
  }

  /**
   * 修改密码
   */
  static changePassword(id: number, data: ChangePasswordModel) {
    return httpRequest.post<BaseResponse<User>>(`${this.USER_API_PREFIX}/${id}/change-password`, {
      ...data
    })
  }
}
