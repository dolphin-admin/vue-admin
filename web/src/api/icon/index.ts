import Request from '../axios'
import type { APIv2CollectionResponse } from './types'

export class IconAPI {
  private static ICON_API_PREFIX = '/icon-api'

  /**
   * 图标集列表
   */
  static getIconsBySet(iconSet: string) {
    return Request.get<APIv2CollectionResponse>(
      `${this.ICON_API_PREFIX}/collection?prefix=${iconSet}`
    )
  }
}
