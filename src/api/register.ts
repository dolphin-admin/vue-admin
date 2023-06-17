import { GlobalAPIConfig } from '@/constants'

import Request from './axios'

const LOGIN_API_PREFIX = `/${GlobalAPIConfig.API_PREFIX}/signup`

export interface SignupResponse {
  accessToken: string
}

export const SignupApi = {
  signup: (username: string, password: string, confirmPassword: string) =>
    Request.post<SignupResponse>(LOGIN_API_PREFIX, { username, password, confirmPassword })
}
