export interface appData {
  app?: 'web_PC' | 'web_mobile' | 'desktop'
  version?: string
  env?: 'DEV' | 'PRO'
  ip?: string
  source?: string
  userAgent?: string
}
export interface trafficTime {
  duration?: number
  leaveAt?: string
  enterAt?: string
}
export interface geography {
  latitude?: number
  altitude?: number
  longitude?: number
  area?: string
}
export interface recordsItem {
  title?: string
  url?: string
  path?: string
  enterAt?: string
  leaveAt?: string
  duration?: number
}

export type trafficData = appData & recordsItem[] & geography & trafficTime
