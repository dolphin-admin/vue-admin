export interface Props {
  /**
   * 目标时间
   */
  target: number
}

export interface Time {
  day: number | string
  showHour: number | string
  minute: number | string
  second: number | string
}

export type Status = 'pending' | 'running' | 'paused' | 'stopped'
