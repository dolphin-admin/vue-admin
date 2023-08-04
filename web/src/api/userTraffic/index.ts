import type { PageRequestModel, PageResponse, UserTraffic } from '@/types'

import Request from '../axios'

export class UserTrafficAPI {
  private static USER_TRAFFIC_API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/userTraffics`

  private static IP_API_PREFIX = `${GlobalEnvConfig.IP_API_PREFIX}`

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
   * - 该接口使用的是 navigator.sendBeacon 方法，该方法不支持同步请求，且不会接收服务端的响应
   * - 只支持传输字符串，且字符串长度不能超过 64KB
   * - 只支持 POST 请求
   * - 不支持设置请求头
   */
  static reportUserTraffic(params: UserTraffic) {
    const token = AuthUtils.getToken()
    return navigator.sendBeacon(
      `${this.USER_TRAFFIC_API_PREFIX}?token=${token}`,
      JSON.stringify(params)
    )
  }

  /**
   * 获取用户 IP 地址
   * @description 第三方接口
   */
  static getIP() {
    return Request.get<{ ip: string }>(`${this.IP_API_PREFIX}?format=json`)
  }
}
