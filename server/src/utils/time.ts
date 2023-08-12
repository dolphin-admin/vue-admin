import dayjs from 'dayjs'

import type { TimeFormatter } from '@/types'

/**
 * 获取带格式化的当前时间
 */
export const getCurrentTime = (
  formatter: TimeFormatter = 'YYYY-MM-DD HH:mm:ss'
) => dayjs(Date.now()).format(formatter)
