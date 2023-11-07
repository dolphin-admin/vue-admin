import type { UserTrafficDevice } from '@/types'

export class UserTrafficUtils {
  static USER_AGENT = window.navigator.userAgent

  /**
   * 获取用户的地理位置信息
   * @description 如果用户拒绝了授权请求，需要再次请求授权
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/getCurrentPosition
   * @todo 目前无法监听用户重新授权的事件
   */
  static getGeolocation(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      // 判断浏览器是否支持 Geolocation API
      if (!('geolocation' in navigator)) {
        reject(new Error('Geolocation is not available.'))
      }
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position.coords),
          (error) => reject(error),
          {
            enableHighAccuracy: false // 是否要求高精度的地理位置信息
          }
        )
      } else {
        reject(new Error('Geolocation is not supported by this browser.'))
      }
    })
  }

  /**
   * 判断用户设备类型
   * @todo 目前判断是否是桌面端可能存在问题，需要重构判断逻辑
   */
  static getDeviceType(): UserTrafficDevice {
    if (/Windows|Macintosh/.test(this.USER_AGENT)) {
      return 'Web PC'
    }
    if (/Android|iPhone/.test(this.USER_AGENT)) {
      return 'Web Mobile'
    }
    return 'Desktop'
  }
}
