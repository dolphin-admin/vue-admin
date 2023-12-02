// 响应类型
export interface Response {
  code?: string
  message?: string
}

// 响应类型（数据）
export interface BaseResponse<T = any> extends Response {
  data: T
}

// 响应类型（分页）
export interface PageResponse<T = any> extends Response {
  data: T
  page: number
  pageSize: number
  total: number
}

// 排序枚举类型
export enum OrderType {
  descend = 'desc',
  ascend = 'asc'
}

// 排序参数
export interface Sorter {
  key: string
  order: OrderType
}
