import type { User } from '@/types'

export interface LoginModel {
  username: string
  password: string
}

export interface SignupModel extends LoginModel {
  confirmPassword: string
}

export interface TokenResponse {
  accessToken: string
  refreshToken: string
}

export interface UserTokenResponse extends TokenResponse {
  user: User
}

export interface ChangePasswordModel {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
