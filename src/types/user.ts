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

/**
 * 性别
 */
export type Gender = 0 | 1
