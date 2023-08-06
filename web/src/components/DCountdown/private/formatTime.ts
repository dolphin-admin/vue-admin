import type { Time } from './index'

export const formatTime = function (seconds: number): Time {
  if (seconds <= 0)
    return { day: '00', showHour: '00', minute: '00', second: '00' }
  let [day, hour, minute, second]: any = [0, 0, 0, 0]
  day = Math.floor(seconds / (60 * 60 * 24))
  hour = Math.floor(seconds / (60 * 60)) - day * 24
  let showHour = null
  showHour = Math.floor(seconds / (60 * 60))
  minute = Math.floor(seconds / 60) - hour * 60 - day * 24 * 60
  second =
    Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60
  // 如果小于10，在前面补上一个"0"
  showHour = Math.floor(seconds / (60 * 60))
  minute = minute < 10 ? `0${minute}` : minute
  second = second < 10 ? `0${second}` : second
  day = day < 10 ? `0${day}` : day
  return { day, showHour, minute, second }
}
