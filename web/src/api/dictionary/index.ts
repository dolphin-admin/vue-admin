import type {
  BaseResponse,
  Dictionary,
  DictionaryData,
  PageRequestModel,
  PageResponse,
  Response
} from '@/types'

import Request from '../axios'

export class DictionaryAPI {
  private static DICTIONARY_API_PREFIX = `${GlobalEnvConfig.MOCK_API_PROXY}/dictionaries`

  /**
   * 字典管理列表
   */
  static getDictionaries(params: PageRequestModel) {
    return Request.get<PageResponse<Dictionary[]>>(this.DICTIONARY_API_PREFIX, {
      ...params
    })
  }

  /**
   * 创建字典
   */
  static createDictionary(data: Dictionary) {
    return Request.post<BaseResponse<Dictionary>>(this.DICTIONARY_API_PREFIX, {
      ...data
    })
  }

  /**
   * 修改字典
   */
  static updateDictionaryById(id: number, data: Dictionary) {
    return Request.put<BaseResponse<Dictionary>>(
      `${this.DICTIONARY_API_PREFIX}/${id}`,
      {
        ...data
      }
    )
  }

  /**
   * 删除字典
   */
  static deleteDictionaryById(id: number) {
    return Request.delete<Response>(`${this.DICTIONARY_API_PREFIX}/${id}`)
  }

  /**
   * 字典项详情
   */
  static getDictionaryDataById(id: number, params: PageRequestModel) {
    return Request.get<PageResponse<Dictionary[]>>(
      `${this.DICTIONARY_API_PREFIX}/${id}/items`,
      {
        ...params
      }
    )
  }

  /**
   * 创建字典项
   */
  static createDictionaryData(id: number, data: Dictionary) {
    return Request.post<BaseResponse<DictionaryData>>(
      `this.DICTIONARY_API_PREFIX/${id}/items`,
      {
        ...data
      }
    )
  }

  /**
   * 修改字典项
   */
  static updateDictionaryItem(id: number, itemId: number, data: Dictionary) {
    return Request.put<BaseResponse<DictionaryData>>(
      `${this.DICTIONARY_API_PREFIX}/${id}/items/${itemId}`,
      {
        ...data
      }
    )
  }

  /**
   * 删除字典项
   */
  static deleteDictionaryItem(id: number, itemId: number) {
    return Request.delete<Response>(
      `${this.DICTIONARY_API_PREFIX}/${id}/items/${itemId}`
    )
  }
}
