import dayjs from 'dayjs'

import type { TimeFormatter } from '@/types'

/**
 * 获取带格式化的当前时间
 * @param formatter 格式化字符串
 * @returns 格式化后的当前时间
 */
export const getCurrentTime = (
  formatter: TimeFormatter = 'YYYY-MM-DD HH:mm:ss'
) => dayjs(Date.now()).format(formatter)

/**
 * 格式化时间
 * @param date 时间
 * @param formatter 格式化字符串
 * @returns 格式化后的时间
 */
export const formatTime = (
  date: Date | number | string,
  formatter: TimeFormatter = 'YYYY-MM-DD HH:mm:ss'
) => {
  if (!date) return ''
  return dayjs(date).format(formatter)
}
