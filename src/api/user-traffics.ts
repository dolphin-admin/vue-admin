import type { Lang } from '@dolphin-admin/utils'

import type { PageRequestModel, PageResponse, UserTraffic } from '@/types'

export class UserTrafficAPI {
  private static USER_TRAFFIC_API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/userTraffics`

  /**
   * 用户流量列表
   */
  static getUserTraffics(params: PageRequestModel) {
    return httpRequest.get<PageResponse<UserTraffic[]>>(this.USER_TRAFFIC_API_PREFIX, {
      ...params
    })
  }

  /**
   * 用户流量上报
   * @description 用户设备、浏览器、操作系统、IP、地理位置等信息和用户路由访问记录
   * - 该接口使用的是 navigator.sendBeacon 方法，该方法不支持同步请求，且不会接收服务端的响应
   * - 只支持传输字符串，且字符串长度不能超过 64KB
   * - 只支持 POST 请求
   * - 不支持设置请求头
   * - 认证方式通过 URL query 参数传递
   *
   * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon}
   *
   * @todo 没有考虑浏览器不支持 navigator.sendBeacon 方法的情况
   */
  static reportUserTraffic(params: UserTraffic) {
    const authorization = AuthUtils.getAuthorization()
    const data = { data: params, authorization }
    return navigator.sendBeacon(`${this.USER_TRAFFIC_API_PREFIX}`, JSON.stringify(data))
  }

  /**
   * 获取用户 IP 地址
   * @description 第三方接口
   */
  static async getIP(): Promise<{ ip: string | null }> {
    try {
      const res = await fetch('https://api.ipify.org?format=json')
      const data = await res.json()
      return data
    } catch (e) {
      return {
        ip: null
      }
    }
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
   *
   * @see {@link https://nominatim.org/release-docs/develop/api/Reverse/}
   */
  static async getArea(
    latitude: number,
    longitude: number,
    lang: Lang
  ): Promise<{ display_name: string | null }> {
    const params = {
      format: 'json',
      lat: `${latitude}`,
      lon: `${longitude}`,
      zoom: '8',
      addressdetails: '1',
      'accept-language': lang
    }
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      queryParams.append(key, value)
    })
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?${queryParams.toString()}`
      )
      const data = await res.json()
      return data
    } catch (e) {
      return {
        display_name: null
      }
    }
    // TODO: Axios 使用 Vite 代理好像有问题，暂时使用 fetch
    // return Request.get<{ display_name: string }>(
    //   `${this.AREA_API_PREFIX}/reverse`,
    //   params
    // )
  }
}
