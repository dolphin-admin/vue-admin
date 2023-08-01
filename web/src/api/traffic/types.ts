import type { User, UserTrafficsPageType } from '@/types'

export interface UserTrafficsType extends UserTrafficsPageType {
  data: User[]
  total: number
}
