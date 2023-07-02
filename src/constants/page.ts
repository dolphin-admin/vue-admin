import type { PageModel } from '@/types'

export class BasePageModel {
  pageCount: number

  pageSize: number

  searchText?: string

  constructor(pageModel?: PageModel) {
    const { pageCount, pageSize, searchText } = pageModel ?? {}
    this.pageCount = pageCount ?? 1
    this.pageSize = pageSize ?? 10
    if (searchText) {
      this.searchText = searchText
    }
  }
}
