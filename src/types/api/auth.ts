import type { User } from '@/types'

export interface LoginModel {
  username: string
  password: string
}

export interface SignupModel extends LoginModel {
  confirmPassword: string
}

export type UserTokenResponse = {
  user: User
  accessToken: string
}

export interface ChangePasswordModel {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
