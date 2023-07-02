export interface User {
  id?: number
  username?: string
  email?: string
  phoneNumber?: string
  name?: string
  firstName?: string
  lastName?: string
  nickName?: string
  avatarUrl?: string
  gender?: Gender
  genderLabel?: string
  country?: string
  province?: string
  city?: string
  address?: string
  biography?: string
  birthDate?: string
  verified?: boolean
  enabled?: boolean
  createdAt?: string
  roles?: string[]
}

export interface LoginInputModel {
  username: string
  password: string
}

export interface SignupInputModel extends LoginInputModel {
  confirmPassword: string
}

export interface LoginOrSignupResponse {
  user: User
  accessToken: string
}

export type Gender = 0 | 1
