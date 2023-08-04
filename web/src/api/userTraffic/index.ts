import type { Lang, PageRequestModel, PageResponse, UserTraffic } from '@/types'

import Request from '../axios'

export class UserTrafficAPI {
  private static USER_TRAFFIC_API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/userTraffics`

  private static IP_API_PREFIX = '/ip-api'

  private static AREA_API_PREFIX = '/area-api'

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
    return Request.get<{ ip: string }>(this.IP_API_PREFIX, {
      format: 'json'
    })
  }

  /**
   * 获取用户地理位置信息
   * @description
   * 缩放等级（目前取到8）
   * - 3	国家
   * - 5	州（国外）/省份（国内）
   * - 8	县区（国外）
   * - 10	城市
   * - 12	镇/区
   * - 13	村庄/郊区
   * - 14	邻里
   * - 15	地点
   * - 16	主要街道
   * - 17 主要街道和次要街道
   * - 18	建筑
   */
  static getArea(latitude: number, longitude: number, lang: Lang) {
    return Request.get<{ display_name: string }>(
      `${this.AREA_API_PREFIX}/reverse`,
      {
        format: 'json',
        lat: latitude,
        lon: longitude,
        zoom: 8,
        addressdetails: 1,
        'accept-language': lang
      }
    )
  }
}
