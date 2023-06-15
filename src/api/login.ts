import { GlobalAPIConfig } from '@/constants'

import Request from './axios'

const LOGIN_API_PREFIX = `/${GlobalAPIConfig.API_PREFIX}/login`

export interface LoginResponse {
  accessToken: string
}

export const LoginApi = {
  login: (username: string, password: string) => Request.post<LoginResponse>(LOGIN_API_PREFIX, { username, password })
}
