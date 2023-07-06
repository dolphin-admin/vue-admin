import type { AxiosProgressEvent } from 'axios'

export interface UploadResponse {
  path: string
}

// TODO: 考虑支持上传进度
export type UploadProgressFc = (progressEvent?: AxiosProgressEvent) => void

export interface UploadOptions {
  onUploadProgress?: UploadProgressFc
}
