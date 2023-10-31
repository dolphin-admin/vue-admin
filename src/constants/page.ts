import type { PageModel } from '@/types'

/**
 * 分页模型
 * @description 用于分页查询的基本参数
 */
export class BasePageModel {
  /**
   * 当前页码
   */
  page: number

  /**
   * 每页条数
   */
  pageSize: number

  /**
   * 搜索文本
   */
  searchText?: string

  /**
   * 开始日期
   */
  startDate?: string

  /**
   * 结束日期
   */
  endDate?: string

  /**
   * 排序关键字
   * @description 以逗号分隔
   */
  sort?: string

  /**
   * 排序顺序
   * @description 以逗号分隔
   */
  order?: string

  constructor(pageModel?: PageModel) {
    const { page, pageSize, searchText, startDate, endDate, sorters } =
      pageModel ?? {}
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
    if (sorters && Array.isArray(sorters) && sorters.length > 0) {
      const sorterKeys = sorters.map((sorter) => sorter.key)
      this.sort = sorterKeys.join()
      const sorterOrders = sorters.map((sorter) => sorter.order)
      this.order = sorterOrders.join()
    }
  }
}
