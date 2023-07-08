export interface CreateModel {
  username: string
  password: string
}

export interface ChangePasswordModel {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
