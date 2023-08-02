import type { TrafficData, UserTrafficsPageType } from '@/types'

export interface UserTrafficsType extends UserTrafficsPageType {
  data: TrafficData[]
  total: number
}
