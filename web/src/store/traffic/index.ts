import type { AppData, RecordItem, Geography, TrafficTime, TrafficData } from '@/types'
const { version } = siteMetaData

export const useTrafficStore = defineStore('traffic', () => {
  /**
   * 统计用户流量信息
   */
  const appData = reactive<AppData>({
    app: 'web_PC',
    version: version,
    env: 'DEV',
    ip: '',
    source: '',
    userAgent: TrafficUtils.USER_AGENT
  })

  const trafficTime = reactive<TrafficTime>({
    duration: 0,
    leaveAt: '',
    enterAt: ''
  })

  const geography = reactive<Geography>({
    latitude: 0,
    altitude: 0,
    longitude: 0,
    area: ''
  })

  const records = reactive<RecordItem[]>([])

  let RecordItem: RecordItem = {}

  return {
    appData,
    trafficTime,
    geography,
    records,
    RecordItem
  }
})
