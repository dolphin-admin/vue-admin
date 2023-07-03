import type { BaseResponse, LoginOrSignupResponse, SignupInputModel } from '@/types'

import Request from './axios'

export class SignupAPI {
  private static LOGIN_API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/signup`

  static signup(signupInputModel: SignupInputModel) {
    return Request.post<BaseResponse<LoginOrSignupResponse>>(this.LOGIN_API_PREFIX, { ...signupInputModel })
  }
}
