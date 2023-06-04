import type { PageModel } from '@/types'

export class BasePageModel {
  pageNum: number

  pageSize: number

  constructor(pageModel?: PageModel) {
    const { pageNum, pageSize } = pageModel ?? {}
    this.pageNum = pageNum ?? 1
    this.pageSize = pageSize ?? 10
  }
}
