import { GlobalAPIConfig } from '@/constants'
import type { LoginInputModel, LoginOrSignupResponse } from '@/types'

import Request from './axios'

const LOGIN_API_PREFIX = `/${GlobalAPIConfig.API_PREFIX}/login`

export const LoginApi = {
  login: (loginInputModel: LoginInputModel) =>
    Request.post<LoginOrSignupResponse>(LOGIN_API_PREFIX, { ...loginInputModel })
}
