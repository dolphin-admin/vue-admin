import type { IconifyInfo, IconifyJSON } from '@iconify/types'

export interface APIv2CollectionResponse {
  prefix: string
  total: number
  title?: string
  info?: IconifyInfo
  uncategorized?: string[]
  categories?: Record<string, string[]>
  hidden?: string[]
  aliases?: Record<string, string>
  chars?: Record<string, string>
  themes?: IconifyJSON['themes']
  prefixes?: IconifyJSON['prefixes']
  suffixes?: IconifyJSON['suffixes']
}
