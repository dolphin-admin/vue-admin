import type {
  BaseResponse,
  Dictionary,
  DictionaryData,
  PageRequestModel,
  PageResponse,
  Response
} from '@/types'

export class DictionaryAPI {
  private static DICTIONARY_API_PREFIX = `${GlobalEnvConfig.MOCK_API_PREFIX}/dictionaries`

  /**
   * 字典管理列表
   */
  static getDictionaries(params: PageRequestModel) {
    return httpRequest.get<PageResponse<Dictionary[]>>(this.DICTIONARY_API_PREFIX, {
      ...params
    })
  }

  /**
   * 创建字典
   */
  static createDictionary(data: Dictionary) {
    return httpRequest.post<BaseResponse<Dictionary>>(this.DICTIONARY_API_PREFIX, {
      ...data
    })
  }

  /**
   * 修改字典
   */
  static updateDictionaryById(id: number, data: Dictionary) {
    return httpRequest.put<BaseResponse<Dictionary>>(`${this.DICTIONARY_API_PREFIX}/${id}`, {
      ...data
    })
  }

  /**
   * 删除字典
   */
  static deleteDictionaryById(id: number) {
    return httpRequest.delete<Response>(`${this.DICTIONARY_API_PREFIX}/${id}`)
  }

  /**
   * 字典项详情
   */
  static getDictionaryDataById(id: number, params: PageRequestModel) {
    return httpRequest.get<PageResponse<Dictionary[]>>(
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
    return httpRequest.post<BaseResponse<DictionaryData>>(
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
    return httpRequest.put<BaseResponse<DictionaryData>>(
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
    return httpRequest.delete<Response>(`${this.DICTIONARY_API_PREFIX}/${id}/items/${itemId}`)
  }
}
