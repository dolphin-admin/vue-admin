export interface Props {
  startValue: number
  endValue: number
  duration?: number
  delay?: number
}

export type Status = 'pending' | 'running' | 'paused' | 'stopped'
