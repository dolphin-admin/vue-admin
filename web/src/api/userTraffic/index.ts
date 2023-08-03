import type {
  BaseResponse,
  PageRequestModel,
  PageResponse,
  UserTraffic
} from '@/types'

import Request from '../axios'

export class TrafficAPI {
  private static USER_TRAFFIC_API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/userTraffics`

  /**
   * 用户流量列表
   */
  static getUserTraffics(params: PageRequestModel) {
    return Request.get<PageResponse<UserTraffic[]>>(
      this.USER_TRAFFIC_API_PREFIX,
      {
        ...params
      }
    )
  }

  /**
   * 用户流量上报
   * @description 用户设备、浏览器、操作系统、IP、地理位置等信息和用户路由访问记录
   */
  static reportUserTraffic(params: UserTraffic) {
    return Request.post<BaseResponse<UserTraffic>>(
      this.USER_TRAFFIC_API_PREFIX,
      {
        ...params
      }
    )
  }
}
