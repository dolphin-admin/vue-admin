import type { BaseResponse, LoginModel, SignupModel, UserTokenResponse } from '@/types'

export class AuthAPI {
  private static AUTH_API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/auth`

  static REFRESH_API_URL = `${this.AUTH_API_PREFIX}/refresh`

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
   * 刷新令牌
   */
  static async refresh(token: string) {
    const { accessToken, refreshToken } =
      (
        await httpRequest.post<BaseResponse<UserTokenResponse>>(
          this.REFRESH_API_URL,
          {},
          { params: { token } }
        )
      ).data ?? {}
    AuthUtils.setAccessToken(accessToken ?? '')
    AuthUtils.setRefreshToken(refreshToken ?? '')
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
