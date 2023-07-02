import type { PageModel } from '@/types'

export class BasePageModel {
  page: number

  pageSize: number

  searchText?: string

  constructor(pageModel?: PageModel) {
    const { page, pageSize, searchText } = pageModel ?? {}
    this.page = page ?? 1
    this.pageSize = pageSize ?? 10
    if (searchText) {
      this.searchText = searchText
    }
  }
}
