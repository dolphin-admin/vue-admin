export type UserTrafficDevice = 'Web PC' | 'Web Mobile' | 'Desktop' | 'Mobile'

export type UserTrafficSource = 'Inner' | 'GitHub' | 'Google'

export interface UserTrafficAppInfo {
  app?: UserTrafficDevice
  version?: string
  env?: string
  ip?: string
  source?: UserTrafficSource
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
