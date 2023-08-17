export interface VirtualListItem {
  id?: number
  data?: string
}
export interface Props {
  data?: VirtualListItem[]
  showNum?: number
  itemHeight?: number
}
