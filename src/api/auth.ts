import type { BaseResponse, LoginModel, SignupModel, UserTokenResponse } from '@/types'

// 登录类型
enum LoginType {
  USERNAME = 1, // 用户名登录
  EMAIL = 2 // 邮箱登录
}

export class AuthAPI {
  private static AUTH_API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/auth`

  static REFRESH_API_URL = `${this.AUTH_API_PREFIX}/refresh`

  /**
   * 登录
   */
  static login(data: LoginModel) {
    return httpRequest.post<BaseResponse<UserTokenResponse>>(
      `${this.AUTH_API_PREFIX}/login`,
      { ...data },
      { params: { type: LoginType.USERNAME } }
    )
  }

  /**
   * 注册
   */
  static signup(data: SignupModel) {
    return httpRequest.post<BaseResponse<UserTokenResponse>>(`${this.AUTH_API_PREFIX}/signup`, {
      ...data
    })
  }

  /**
   * 刷新令牌
   */
  static async refresh(token: string) {
    return httpRequest.post<BaseResponse<UserTokenResponse>>(
      this.REFRESH_API_URL,
      {},
      { params: { token } }
    )
  }

  /**
   * GitHub 登录
   */
  static loginWithGitHub(code: string) {
    return httpRequest.post<BaseResponse<UserTokenResponse>>(
      `${this.AUTH_API_PREFIX}/login/github`,
      { code }
    )
  }

  /**
   * Google 登录
   */
  static loginWithGoogle(code: string) {
    return httpRequest.post<BaseResponse<UserTokenResponse>>(
      `${this.AUTH_API_PREFIX}/login/google`,
      { code }
    )
  }
}
