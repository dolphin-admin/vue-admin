import { GlobalEnvConfig } from '@/constants'
import type { BaseResponse, UploadOptions, UploadResult } from '@/types'

import Request from './axios'

const UPLOAD_API_PREFIX = `${GlobalEnvConfig.BASE_API_PREFIX}/upload`

export const UploadApi = {
  uploadFile: (data: any, options?: UploadOptions) =>
    Request.post<BaseResponse<UploadResult>>(UPLOAD_API_PREFIX, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: options?.onUploadProgress ? options.onUploadProgress : () => {}
    }),
  uploadFiles: (data: any) =>
    Request.post(`${UPLOAD_API_PREFIX}/batch`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
}
