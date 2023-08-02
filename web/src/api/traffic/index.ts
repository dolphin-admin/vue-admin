import type { BaseResponse, TrafficData, UserTrafficsPageType } from '@/types'

import Request from '../axios'
import type { UserTrafficsType } from './types'

export class TrafficAPI {
  private static USER_API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/userTraffics`

  /**
   * 用户流量列表
   */
  static getUserTraffics(params: UserTrafficsPageType) {
    return Request.get<UserTrafficsType>(this.USER_API_PREFIX, { ...params })
  }

  /**
   * 用户列表上报
   */
  static reportUserTraffic(params: TrafficData) {
    return Request.post<BaseResponse>(this.USER_API_PREFIX, { ...params })
  }
}
