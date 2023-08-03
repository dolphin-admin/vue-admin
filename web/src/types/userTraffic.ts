type UserTrafficDevice = 'Web PC' | 'Web Mobile' | 'Desktop' | 'Mobile'

type UserTrafficEnv = 'DEV' | 'PRO'

type UserTrafficResource = 'Inner' | 'GitHub' | 'Google'

export interface UserTrafficAppInfo {
  app?: UserTrafficDevice
  env?: UserTrafficEnv
  ip?: string
  source?: UserTrafficResource
  userAgent?: string
}

export interface UserTrafficGeographyInfo {
  latitude?: number
  altitude?: number
  longitude?: number
  area?: string
}

export interface UserTrafficTimeInfo {
  duration?: number
  leaveAt?: string
  enterAt?: string
}

export interface UserTrafficRecord {
  title?: string
  url?: string
  path?: string
  enterAt?: string
  leaveAt?: string
  duration?: number
}

export type UserTraffic = UserTrafficAppInfo &
  UserTrafficGeographyInfo &
  UserTrafficTimeInfo & {
    records?: UserTrafficRecord[]
    recordsCount?: number
  }
