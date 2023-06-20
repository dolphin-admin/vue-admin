export interface User {
  id: number
  uuid: string
  username: string
  email: string
  phoneNumber: number
  address: string
  avatarUrl: string
  biography: string
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
