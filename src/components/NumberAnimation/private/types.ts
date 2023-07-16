export interface Props {
  /**
   * 起始值
   */
  startValue?: number
  /**
   * 结束值
   */
  endValue?: number
  /**
   * 动画时长
   */
  duration?: number
  /**
   * 延迟时间
   */
  delay?: number
}

export type Status = 'pending' | 'running' | 'paused' | 'stopped'
