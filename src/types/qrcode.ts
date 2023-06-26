import type { QRCodeErrorCorrectionLevel } from 'qrcode'

export interface QRCodeOptions {
  margin?: number
  width?: number
  errorCorrectionLevel?: QRCodeErrorCorrectionLevel
}
