import type { BaseResponse } from '@/types'

import Request from '../axios'
import type { LoginModel, SignupModel, UserTokenResponse } from './types'

export class AuthAPI {
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
   * 图标集列表
   */
  static loginWithGitHub(code: string) {
    return Request.post<BaseResponse<UserTokenResponse>>(`${GlobalEnvConfig.BASE_API_PREFIX}/login/github`, { code })
  }
}
