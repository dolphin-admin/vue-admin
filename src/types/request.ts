import type { AxiosProgressEvent } from 'axios'

interface Response {
  code?: number | string
  message?: string
}

export interface BaseResponse<T = any> extends Response {
  data: T
}

export interface PageResponse<T = any> extends Response {
  data: T
  pageCount: number
  pageSize: number
  total: number
}

export interface PageModel {
  page: number
  pageSize: number
  searchText?: string
}

export type UploadProgressFc = (progressEvent?: AxiosProgressEvent) => void

export interface UploadOptions {
  onUploadProgress?: UploadProgressFc
}
