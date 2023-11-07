import type { BaseResponse, LoginModel, SignupModel, UserTokenResponse } from '@/types'

export class AuthAPI {
  private static AUTH_API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/auth`

  /**
   * 登录
   */
  static login(data: LoginModel) {
    return httpRequest.post<BaseResponse<UserTokenResponse>>(`${this.AUTH_API_PREFIX}/login`, {
      ...data
    })
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
