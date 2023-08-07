<script setup lang="ts">
import bitOceanSrc from '@/assets/images/bit_ocean.png'
import type {
  Lang,
  MessageSchema,
  NullableObj,
  UserTraffic,
  UserTrafficAppInfo,
  UserTrafficGeographyInfo,
  UserTrafficRecord,
  UserTrafficSource,
  UserTrafficTimeInfo
} from '@/types'

/**
 * NOTE: 上报用户数据组件
 * @description 在用户退出前或页面隐藏、关闭、刷新时上报用户数据
 */

const { t, locale } = useI18n<{ message: MessageSchema }, Lang>({
  useScope: 'global'
})

const { version } = siteMetaData

const userStore = useUserStore()
const notification = useNotification()

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
  source: 'Inner',
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
 * 当前路由记录时间信息
 */
const currentRouteRecordTimeInfo = reactive<UserTrafficTimeInfo>({
  enterAt: new Date().toISOString(),
  leaveAt: '', // 离开的时候计算
  duration: 0 // 离开的时候计算
})

/**
 * 用户流量记录
 */
const records = ref<UserTrafficRecord[]>([])

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
 * TODO: 暂时还没有使用 source 字段
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
 * 重置当前路由记录进入时间
 */
const resetCurrentRouteRecordEnterTime = () => {
  currentRouteRecordTimeInfo.enterAt = new Date().toISOString()
}

/**
 * 计算离开时间，返回用户时间信息
 */
const computeLeaveTime = () => {
  timeInfo.leaveAt = new Date().toISOString()
  timeInfo.duration = TimeUtils.getDuration(timeInfo.enterAt, timeInfo.leaveAt)
  return {
    ...timeInfo
  }
}

/**
 * 计算路由记录的停留时间
 */
const computeRouteRecordTime = () => {
  currentRouteRecordTimeInfo.leaveAt = new Date().toISOString()
  currentRouteRecordTimeInfo.duration = TimeUtils.getDuration(
    currentRouteRecordTimeInfo.enterAt,
    currentRouteRecordTimeInfo.leaveAt
  )
  return {
    ...currentRouteRecordTimeInfo
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
const setGeoArea = (area: string | null) => {
  geographyInfo.area = area
}

/**
 * 上报用户流量
 * @todo 考虑添加一个 key，控制多少路由记录才进行上报
 */
const sendReport = () => {
  // 用户路由记录小于 5 条时不上报
  if (records.value.length >= 5) {
    const userTraffic = {
      ...appInfo,
      ...computeLeaveTime(),
      ...geographyInfo,
      records: records.value
    } as UserTraffic
    if (UserTrafficAPI.reportUserTraffic(userTraffic)) {
      records.value = []
    }
  }
  userStore.clearUser()
  AuthUtils.clearToken()
}

/**
 * 发送位置请求授权通知
 */
const sendGeoRequestNotification = () =>
  setTimeout(() => {
    const n = notification.create({
      title: () => t('Notification.RequestGeolocation.Title'),
      description: () => t('Notification.RequestGeolocation.Description'),
      content: () => t('Notification.RequestGeolocation.Content'),
      avatar: () =>
        h(NAvatar, {
          size: 'small',
          round: true,
          src: bitOceanSrc,
          alt: ''
        }),
      duration: 10000,
      keepAliveOnHover: true,
      meta: TimeUtils.formatTime(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
      action: () =>
        h(
          NButton,
          {
            text: true,
            type: 'success',
            onClick: () => n.destroy()
          },
          {
            default: () => t('Common.AlreadyRead')
          }
        )
    })
  }, 800)

// 语言切换时，要获取对应语言的地理信息
watch(
  () => locale.value,
  () =>
    // 获取用户的地理坐标信息
    UserTrafficUtils.getGeolocation()
      .then((coords) => {
        const { latitude, longitude, altitude } = coords
        setGeoCoords({ latitude, longitude, altitude })
        UserTrafficAPI.getArea(latitude, longitude, locale.value).then((res) =>
          setGeoArea(res.display_name)
        )
      })
      .catch(() => sendGeoRequestNotification())
)

onBeforeRouteLeave(() => sendReport())

onBeforeRouteUpdate((to, from) => {
  const { path: fromPath, meta: fromMeta, fullPath } = from
  const { title: fromTitle } = fromMeta
  records.value.push({
    title: typeof fromTitle === 'function' ? fromTitle() : fromTitle,
    url: GlobalEnvConfig.APP_BASE_URL + fullPath,
    path: fromPath,
    ...computeRouteRecordTime()
  })
  resetCurrentRouteRecordEnterTime()
})

onMounted(() => {
  // 获取用户IP地址
  UserTrafficAPI.getIP()
    .then((res) => {
      const { ip } = res
      setIP(ip)
    })
    .catch(() => setIP(null))

  // 获取用户的地理坐标信息
  UserTrafficUtils.getGeolocation()
    .then((coords) => {
      const { latitude, longitude, altitude } = coords
      setGeoCoords({ latitude, longitude, altitude })
      UserTrafficAPI.getArea(latitude, longitude, locale.value).then((res) =>
        setGeoArea(res.display_name)
      )
    })
    .catch(() => sendGeoRequestNotification())

  // 获取用户的流量信息
  useEventListener(document, 'visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      sendReport()
    } else {
      // 初始化进入时间
      resetEnterTime()
      resetCurrentRouteRecordEnterTime()
    }
  })
})
</script>

<template>
  <slot />
</template>
