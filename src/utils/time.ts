import dayjs from 'dayjs'

import type { TimeFormatter } from '@/types'

export const formatTime = (time: string | number | Date, format: TimeFormatter = 'YYYY-MM-DD HH:mm:ss') =>
  dayjs(time).format(format)
