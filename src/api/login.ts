import type { BaseResponse, LoginInputModel, LoginOrSignupResponse } from '@/types'

import Request from './axios'

export class LoginAPI {
  private static LOGIN_API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/login`

  static login(loginInputModel: LoginInputModel) {
    return Request.post<BaseResponse<LoginOrSignupResponse>>(this.LOGIN_API_PREFIX, { ...loginInputModel })
  }
}
