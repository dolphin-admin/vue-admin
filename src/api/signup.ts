import { GlobalEnvConfig } from '@/constants'
import type { LoginOrSignupResponse, SignupInputModel } from '@/types'

import Request from './axios'

const LOGIN_API_PREFIX = `${GlobalEnvConfig.API_PREFIX}/signup`

export const SignupApi = {
  signup: (signupInputModel: SignupInputModel) =>
    Request.post<LoginOrSignupResponse>(LOGIN_API_PREFIX, { ...signupInputModel })
}
