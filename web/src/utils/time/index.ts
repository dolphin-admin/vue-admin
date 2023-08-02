import dayjs from 'dayjs'

import type { TimeFormatter } from '@/types'

export class TimeUtils {
  /**
   * 格式化时间
   * @param time 时间
   * @param format 格式
   */
  static formatTime(
    time: string | number | Date,
    format: TimeFormatter = 'YYYY-MM-DD HH:mm:ss'
  ) {
    return dayjs(time).format(format)
  }
}
