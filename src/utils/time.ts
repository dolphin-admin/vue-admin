import dayjs from 'dayjs'

import type { TimeFormatter } from './time.type'

export const formatTime = (time: string | number | Date, format: TimeFormatter = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(time).format(format)
}
