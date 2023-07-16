export interface TimeLineItem {
  time?: string
  title?: string
  content?: string
  color?: string
  icon?: any
  lineType?: 'default' | 'dashed'
  type?: 'default' | 'success' | 'info' | 'warning' | 'error'
}

export interface Props {
  data?: TimeLineItem[]
  horizontal?: boolean
  itemPlacement?: 'left' | 'right'
  iconSize?: number
}
