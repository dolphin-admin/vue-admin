export interface User {
  id?: number
  username?: string
  email?: string
  phoneNumber?: string
  address?: string
  avatarUrl?: string
  biography?: string
  firstName?: string
  lastName?: string
  gender?: string
  birthDate?: string
  name?: string
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
