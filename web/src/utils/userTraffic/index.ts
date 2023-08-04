import type { UserTrafficDevice } from '@/types'

const { t } = i18n.global

export class UserTrafficUtils {
  static USER_AGENT = window.navigator.userAgent

  /**
   * 获取用户的地理位置信息
   * @description 如果用户拒绝了授权请求，需要再次请求授权
   */
  static getGeolocation(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position.coords), // 获取用户的地理位置信息，并将其作为 Promise 的结果返回
          (error) => {
            if (error.code === 1) {
              // 用户拒绝了授权请求，需要再次请求授权
              if (window.confirm(t('Common.RequestGeolocation'))) {
                // 用户同意了授权请求，重新获取地理位置信息
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    resolve(position.coords)
                  },
                  (err) => {
                    reject(err)
                  }
                )
              }
            } else {
              reject(error)
            }
          },
          {
            enableHighAccuracy: false
          }
        )
      } else {
        reject(new Error('Geolocation is not supported by this browser.'))
      }
    })
  }

  /**
   * 判断用户设备类型
   * TODO: 目前判断是否是桌面端可能存在问题，需要重构判断逻辑
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
