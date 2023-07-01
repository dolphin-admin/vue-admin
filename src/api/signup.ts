import { GlobalEnvConfig } from '@/constants'
import type { BaseResponse, LoginOrSignupResponse, SignupInputModel } from '@/types'

import Request from './axios'

const LOGIN_API_PREFIX = `${GlobalEnvConfig.API_PREFIX}/signup`

export const SignupApi = {
  signup: (signupInputModel: SignupInputModel) =>
    Request.post<BaseResponse<LoginOrSignupResponse>>(LOGIN_API_PREFIX, { ...signupInputModel })
}
