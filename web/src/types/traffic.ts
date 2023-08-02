export interface AppData {
  id?: number
  recordsCount?: number
  app?: 'web_PC' | 'web_mobile' | 'desktop'
  version?: string
  env?: 'DEV' | 'PRO'
  ip?: string
  source?: string
  userAgent?: string
}
export interface TrafficTime {
  duration?: number
  leaveAt?: string
  enterAt?: string
}
export interface Geography {
  latitude?: number
  altitude?: number
  longitude?: number
  area?: string
}
export interface RecordItem {
  title?: string
  url?: string
  path?: string
  enterAt?: string
  leaveAt?: string
  duration?: number
}

export interface UserTrafficsPageType {
  page: number
  pageSize: number
  startDate?: string
  endDate?: string
}

export type TrafficData = AppData &
  Geography &
  TrafficTime & {
    records: RecordItem[]
  }
