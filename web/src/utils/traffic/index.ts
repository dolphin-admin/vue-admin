import Request from '@/api/axios'
import { resolve } from 'path'
const message = useMessage()

export class TrafficUtils {
  static SITE_PATH = window.location.origin + window.location.pathname

  static USER_AGENT = window.navigator.userAgent

  /**
   * 获取用户的IP地址
   *  return new Promise((resolve, reject) => {
   */
  static getIP() {
    return new Promise((resolve, reject) => {
      fetch('https://api.ipify.org?format=json')
        .then((response) => response.json())
        .then((data) => {
          resolve(data.ip)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * 获取用户的地理位置信息
   */
  static getGeolocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            // 获取用户的地理位置信息，并将其作为 Promise 的结果返回
            resolve(position.coords)
          },
          function (error) {
            if (error.code === 1) {
              // 用户拒绝了授权请求，需要再次请求授权
              const message = '请授权以获取您的位置信息'
              if (confirm(message)) {
                // 用户同意了授权请求，重新获取地理位置信息
                navigator.geolocation.getCurrentPosition(
                  function (position) {
                    resolve(position.coords)
                  },
                  function (error) {
                    reject(error)
                  }
                )
              }
            } else {
              reject(error)
            }
          }
        )
      } else {
        reject(new Error('Geolocation is not supported by this browser.'))
      }
    })
  }

  /**
   * 通过两个日期字符串，获取差值，将差值转为毫秒数
   */
  static getDuration(enter: string | undefined, leave: string | undefined) {
    if (enter === undefined || leave === undefined) return 0
    const enterAt = new Date(enter).getTime()
    const leaveAt = new Date(leave).getTime()
    return leaveAt - enterAt
  }

  /**
   * 根据经纬度获取具体地址
   */
  static getArea(latitude: number, longitude: number) {
    if (typeof latitude === 'undefined' || typeof longitude === 'undefined') {
      return ''
    }
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response: any) => response.json())
        .then((data) => {
          const { city, country, state } = data.address
          const address = `${country || ''}, ${state || ''},${city || ''}`
          resolve(address)
        })
        .catch((error) => {
          reject(new Error(error))
        })
    })
  }

  /**
   * 获取用户处于开发还是生产环境
   */
  static getEnv() {
    if (this.SITE_PATH.includes('localhost')) {
      return 'DEV'
    } else {
      return 'PRO'
    }
  }

  /**
   * 判断用户是web-mobile 还是web-pc 还是 desktop
   */
  static getApp() {
    if (/Windows|Macintosh/.test(this.USER_AGENT)) {
      return 'web_PC'
    } else if (/Android|iPhone/.test(this.USER_AGENT)) {
      return 'web_mobile'
    } else {
      return 'desktop'
    }
  }
}
