import type { AxiosProgressEvent } from 'axios'

interface Response {
  code?: number | string
  message?: string
}

export interface ResponseData<T = any> extends Response {
  data: T
}

interface PageResponse extends Response {
  pageNum: number
  pageSize: number
  total: number
}

export interface PageResponseData<T = any> extends PageResponse {
  data: T
}

export interface PageModel {
  pageNum: number
  pageSize: number
}

export type UploadProgressFc = (progressEvent?: AxiosProgressEvent) => void

export interface UploadOptions {
  onUploadProgress?: UploadProgressFc
}

export type ToRecord<T, K = unknown> = Record<keyof T, K>

export type Nullable<T> = T | null

export type NullableObj<T> = {
  [K in keyof T]: Nullable<T[K]>
}
