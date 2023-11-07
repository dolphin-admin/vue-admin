import type { QRCodeErrorCorrectionLevel } from 'qrcode'

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
