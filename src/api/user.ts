import type { BasePageModel } from '@/constants'
import type {
  BaseResponse,
  ChangePasswordModel,
  CreateUserModel,
  PageResponse,
  User
} from '@/types'

export class UserAPI {
  private static USER_API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/users`

  /**
   * 用户列表
   */
  static list(params: BasePageModel) {
    return httpRequest.get<PageResponse<User[]>>(this.USER_API_PREFIX, {
      ...params
    })
  }

  /**
   * 用户信息
   */
  static detail(id: number) {
    return httpRequest.get<BaseResponse<User>>(`${this.USER_API_PREFIX}/${id}`)
  }

  /**
   * 当前用户
   * @description 通过当前登录用户的 token 获取用户信息
   */
  static me() {
    return httpRequest.get<BaseResponse<User>>(`${this.USER_API_PREFIX}/me`)
  }

  /**
   * 创建用户
   */
  static create(data: CreateUserModel) {
    return httpRequest.post<BaseResponse<User>>(this.USER_API_PREFIX, {
      ...data
    })
  }

  /**
   * 更新用户
   */
  static update(id: number, data: User) {
    return httpRequest.patch<BaseResponse<User>>(`${this.USER_API_PREFIX}/${id}`, {
      ...data
    })
  }

  /**
   * 启用用户
   */
  static enable(id: number) {
    return httpRequest.post<BaseResponse<User>>(`${this.USER_API_PREFIX}/${id}/enable`)
  }

  /**
   * 禁用用户
   */
  static disable(id: number) {
    return httpRequest.post<BaseResponse<User>>(`${this.USER_API_PREFIX}/${id}/disable`)
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
