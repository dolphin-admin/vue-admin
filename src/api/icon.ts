import { GlobalEnvConfig } from '@/constants'
import type { APIv2CollectionResponse } from '@/types'

import Request from './axios'

const { ICON_API_PREFIX } = GlobalEnvConfig

export const IconApi = {
  getIconsBySet: (iconSet: string) =>
    Request.get<APIv2CollectionResponse>(`${ICON_API_PREFIX}/collection?prefix=${iconSet}`)
}
