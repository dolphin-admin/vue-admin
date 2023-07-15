import type { PageModel } from '@/types'

/**
 * 分页模型
 * @description 用于分页查询的基本参数
 * - `page`: 当前页码
 * - `pageSize`: 每页条数
 * - `searchText`: 搜索文本
 * - `startDate`: 开始日期
 * - `endDate`: 结束日期
 */
export class BasePageModel {
  page: number

  pageSize: number

  searchText?: string

  startDate?: string

  endDate?: string

  constructor(pageModel?: PageModel) {
    const { page, pageSize, searchText, startDate, endDate } = pageModel ?? {}
    this.page = page ?? 1
    this.pageSize = pageSize ?? 10
    if (searchText) {
      this.searchText = searchText
    }
    if (startDate) {
      this.startDate = startDate
    }
    if (endDate) {
      this.endDate = endDate
    }
  }
}
