import type { Dictionary, PageRequestModel, PageResponse } from '@/types'

import Request from '../axios'

export class DictionaryAPI {
  /**
   * 字典管理列表
   */
  static getDictionaries(params: PageRequestModel) {
    return Request.get<PageResponse<Dictionary[]>>(
      'https://mock.apifox.cn/m1/2894302-0-default/dictionaries',
      {
        ...params
      }
    )
  }
}
