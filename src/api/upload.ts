import type { BaseResponse, UploadOptions, UploadResult } from '@/types'

import Request from './axios'

export class UploadAPI {
  private static UPLOAD_API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/upload`

  private static headers = { 'Content-Type': 'multipart/form-data' }

  static uploadFile(data: any, options?: UploadOptions) {
    return Request.post<BaseResponse<UploadResult>>(this.UPLOAD_API_PREFIX, data, {
      headers: this.headers,
      onUploadProgress: options?.onUploadProgress ? options.onUploadProgress : () => {}
    })
  }

  static uploadFiles(data: any) {
    return Request.post(`${this.UPLOAD_API_PREFIX}/batch`, data, {
      headers: this.headers
    })
  }
}
