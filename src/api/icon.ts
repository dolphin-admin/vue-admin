import type { APIv2CollectionResponse } from '@/types'

import Request from './axios'

export class IconAPI {
  private static ICON_API_PREFIX = GlobalEnvConfig.ICON_API_PREFIX

  static getIconsBySet(iconSet: string) {
    return Request.get<APIv2CollectionResponse>(`${this.ICON_API_PREFIX}/collection?prefix=${iconSet}`)
  }
}
