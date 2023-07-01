import { GlobalEnvConfig } from '@/constants'
import type { BaseResponse, LoginInputModel, LoginOrSignupResponse } from '@/types'

import Request from './axios'

const LOGIN_API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/login`

export const LoginApi = {
  login: (loginInputModel: LoginInputModel) =>
    Request.post<BaseResponse<LoginOrSignupResponse>>(LOGIN_API_PREFIX, { ...loginInputModel })
}
