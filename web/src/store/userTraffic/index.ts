import type {
  NullableObj,
  UserTrafficAppInfo,
  UserTrafficGeographyInfo,
  UserTrafficRecord,
  UserTrafficSource,
  UserTrafficTimeInfo
} from '@/types'

const { version } = siteMetaData

export const useUserTrafficStore = defineStore('userTraffic', () => {
  /**
   * 用户流量 App 信息
   */
  const appInfo = reactive<NullableObj<UserTrafficAppInfo>>({
    // 用户 App 类型：Web PC、Web Mobile、Desktop、Mobile
    app: UserTrafficUtils.getDeviceType(),
    // 站点版本：从 app.config.ts 中获取
    version,
    // 站点环境：从 Vite 环境变量中获取
    env: import.meta.env.MODE,
    // 用户 IP 地址：通过第三方接口获取
    ip: null,
    // 用户来源：Inner、GitHub、Google
    source: null,
    // 用户 UserAgent 信息
    userAgent: UserTrafficUtils.USER_AGENT
  })

  /**
   * 用户流量时间信息
   */
  const timeInfo = reactive<UserTrafficTimeInfo>({
    enterAt: new Date().toISOString(),
    leaveAt: '', // 离开的时候计算
    duration: 0 // 离开的时候计算
  })

  /**
   * 用户流量地理信息
   */
  const geographyInfo = reactive<NullableObj<UserTrafficGeographyInfo>>({
    // 经纬度信息：通过 navigator.geolocation 获取
    latitude: null,
    longitude: null,
    altitude: null,
    // 地区信息：通过第三方接口得到
    area: null
  })

  /**
   * 用户流量记录
   */
  const records = reactive<UserTrafficRecord[]>([])

  /**
   * 设置 IP
   * @param ip IP 地址
   */
  const setIP = (ip: string | null) => {
    appInfo.ip = ip
  }

  /**
   * 设置用户来源
   * @param source 用户来源
   */
  const setSource = (source: UserTrafficSource) => {
    appInfo.source = source
  }

  /**
   * 重置进入时间
   */
  const resetEnterTime = () => {
    timeInfo.enterAt = new Date().toISOString()
  }

  /**
   * 计算离开时间，返回用户时间信息
   */
  const computeLeaveTime = () => {
    timeInfo.leaveAt = new Date().toISOString()
    timeInfo.duration = TimeUtils.getDuration(
      timeInfo.enterAt,
      timeInfo.leaveAt
    )
    return {
      ...timeInfo
    }
  }

  /**
   * 设置坐标信息
   */
  const setGeoCoords = (
    coords: NullableObj<Omit<UserTrafficGeographyInfo, 'area'>>
  ) => {
    geographyInfo.latitude = coords.latitude
    geographyInfo.longitude = coords.longitude
    geographyInfo.altitude = coords.altitude
  }

  /**
   * 设置地区信息
   */
  const setGeoArea = (area: string) => {
    geographyInfo.area = area
  }

  return {
    appInfo,
    timeInfo,
    geographyInfo,
    records,
    setIP,
    setSource,
    resetEnterTime,
    computeLeaveTime,
    setGeoCoords,
    setGeoArea
  }
})
