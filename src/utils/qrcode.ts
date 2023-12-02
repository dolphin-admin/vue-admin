import type { QRCodeErrorCorrectionLevel } from 'qrcode'
import QRCode from 'qrcode'

/**
 * 二维码配置项
 * @description 用于配置二维码的相关参数
 * - `margin`: 二维码边距
 * - `width`: 二维码宽度
 * - `errorCorrectionLevel`: 二维码容错率
 * @see {@link https://www.npmjs.com/package/qrcode}
 */
export interface QRCodeOptions {
  margin?: number
  width?: number
  errorCorrectionLevel?: QRCodeErrorCorrectionLevel
}

export class QRCodeUtils {
  /**
   * 生成二维码
   * @param data 二维码数据内容，可以是字符串或者对象
   * @param options 二维码配置项
   */
  static generateQRCode(
    data: string | object,
    options: QRCodeOptions = {
      margin: 0,
      width: 200,
      errorCorrectionLevel: 'low'
    }
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      let content
      if (typeof data === 'object') {
        content = JSON.stringify(data)
      } else {
        content = data
      }
      QRCode.toDataURL(
        content,
        {
          margin: options.margin ?? 0,
          width: options.width ?? 200,
          errorCorrectionLevel: options.errorCorrectionLevel ?? 'low'
        },
        (err, url) => {
          if (err) {
            reject(new Error('生成二维码失败'))
          }
          resolve(url)
        }
      )
    })
  }
}
