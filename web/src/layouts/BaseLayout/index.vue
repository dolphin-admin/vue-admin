<script setup lang="ts">
import type { UserTrafficRecord } from '@/types'

const userStore = useUserStore()
const trafficStore = useTrafficStore()
const route = useRoute()
const router = useRouter()

const records = reactive<UserTrafficRecord[]>([])
const recordItem: UserTrafficRecord = {}

// 若没有授权，则显示系统 loading
const loading = ref(true)
// 统计用户流量信息

// const appData = reactive<AppData>({
//   app: 'web_PC',
//   version: version,
//   env: 'DEV',
//   ip: '',
//   source: '',
//   userAgent: ''
// })

// const trafficTime = reactive<TrafficTime>({
//   duration: 0,
//   leaveAt: '',
//   enterAt: ''
// })

// const geography = reactive<Geography>({
//   latitude: 0,
//   altitude: 0,
//   longitude: 0,
//   area: ''
// })

// 获取用户的appData信息
// const getAppData = () => {
//   const sitePath = window.location.origin + window.location.pathname
//   if (sitePath.includes('localhost')) {
//     appData.env = 'DEV'
//   } else {
//     appData.env = 'PRO'
//   }
//   const userAgent = window.navigator.userAgent
//   appData.userAgent = userAgent
//   if (/Windows|Macintosh/.test(userAgent)) {
//     appData.app = 'web_PC'
//   } else if (/Android|iPhone/.test(userAgent)) {
//     appData.app = 'web_mobile'
//   } else {
//     appData.app = 'desktop'
//   }
// }

// 获取用户IP地址
// const getIP = () => {
//   fetch('https://api.ipify.org?format=json')
//     .then((response) => response.json())
//     .then((data) => {
//       appData.ip = data.ip
//     })
//     .catch((error) => console.error(error))
// }

// 根据经纬度获取具体地址
// const getArea = (latitude: number, longitude: number) => {
//   if (typeof latitude === 'undefined' || typeof longitude === 'undefined') {
//     return
//   }
//   const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       const { city, country, state } = data.address
//       const address = `${country || ''}, ${state || ''},${city || ''}`
//       geography.area = address
//     })
//     .catch((error) => console.error(error))
// }

// // 获取用户的地理位置信息
// const getGeolocation = () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       function (position) {
//         // 获取地理位置信息
//         const { latitude, altitude, longitude } = position.coords
//         geography.latitude = latitude!
//         geography.altitude = altitude!
//         geography.longitude = longitude!
//         getArea(latitude, longitude)
//       },
//       function (error) {
//         // 处理错误
//         if (error.code === 1) {
//           // 用户拒绝了授权请求，需要再次请求授权
//           const message = '请授权以获取您的位置信息'
//           if (confirm(message)) {
//             // 用户同意了授权请求，重新获取地理位置信息
//             navigator.geolocation.getCurrentPosition(
//               function (position) {
//                 // 获取地理位置信息
//                 const { latitude, altitude, longitude } = position.coords
//                 geography.latitude = latitude!
//                 geography.altitude = altitude!
//                 geography.longitude = longitude!
//                 getArea(latitude, longitude)
//               },
//               function (error) {
//                 console.error(error)
//               }
//             )
//           }
//         }
//       }
//     )
//   }
// }

// //通过两个日期字符串，获取差值，将差值转为毫秒数
// const getDuration = (enter: string | undefined, leave: string | undefined) => {
//   if (enter === undefined || leave === undefined) return 0
//   const enterAt = new Date(enter).getTime()
//   const leaveAt = new Date(leave).getTime()
//   return leaveAt - enterAt
// }

// 检查登录状态

const checkLogin = async () => {
  // 如果有 token，获取用户信息
  if (AuthUtils.isAuthenticated()) {
    trafficStore.trafficTime.enterAt = new Date().toISOString()
    try {
      trafficStore.appData.ip = (await TrafficUtils.getIP()) as string
      const res = (await TrafficUtils.getGeolocation()) as any
      trafficStore.geography.latitude = res.latitude
      trafficStore.geography.altitude = res.altitude
      trafficStore.geography.longitude = res.longitude
      trafficStore.geography.area = (await TrafficUtils.getArea(
        res.latitude,
        res.longitude
      )) as string
      trafficStore.appData.env = TrafficUtils.getEnv()
      trafficStore.appData.app = TrafficUtils.getApp()
    } catch {
      //
    }
    if (!userStore.hasData()) {
      const { data } = (await UserAPI.getUserInfo()) || {}
      userStore.setUser(data)
    }
    loading.value = false
  } else {
    // 否则清除用户信息并跳转到登录页
    userStore.clearUser()
    router.replace({
      path: '/login',
      query: {
        redirect: route.fullPath
      }
    })
  }
}

// 进入路由时候触发
// onBeforeRouteEnter((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
//   console.log('1111111')
//   // 在这里添加路由进入时的逻辑
//   next()
// })
// onBeforeRouteEnter((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
//   console.log('1111111')
//   // RecordItem = {}
//   // RecordItem.enterAt = new Date().toISOString()
//   // RecordItem.url = window.location.href
//   next()
// })

// 离开路由的时候触发
onBeforeRouteLeave((to, from) => {
  recordItem.path = from.fullPath
  const { title } = from.meta
  let pageTitle = ''
  if (typeof title === 'function') {
    pageTitle = title()
  } else {
    pageTitle = title!
  }
  // RecordItem.title = pageTitle
  // RecordItem.leaveAt = new Date().toISOString()
  // RecordItem.duration = getDuration(RecordItem.enterAt, RecordItem.leaveAt)
  records.push(recordItem)
})

// 向后台发送数据
const handleTraffic = () => {
  // if (records.length === 0) return
  // trafficTime.leaveAt = new Date().toISOString()
  // trafficTime.duration = getDuration(trafficTime.enterAt, trafficTime.leaveAt)
  // const body = {
  //   ...appData,
  //   ...trafficTime,
  //   ...geography,
  //   records
  // }
  // TrafficAPI.reportUserTraffic(body)
  //   .then((res) => {
  //     console.log(res)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
}

// const trafficData = computed(() => {
//   return {
//     ...appData,
//     ...trafficTime,
//     ...geography,
//     records
//   }
// })

onBeforeMount(() => checkLogin())

// 页面加载完成时添加 beforeunload 事件监听
onMounted(() => window.addEventListener('beforeunload', handleTraffic))

// 页面销毁前移除 beforeunload 事件监听

onBeforeUnmount(() => window.removeEventListener('beforeunload', handleTraffic))
</script>

<template>
  <template v-if="loading">
    <BaseGlobalLoading />
  </template>
  <template v-else>
    <main class="h-screen w-full overflow-hidden">
      <ReportUserTrafficProvider>
        <div class="flex h-full w-full">
          <BaseSidebar />
          <div class="relative h-full flex-1 overflow-y-auto overflow-x-hidden">
            <BaseHeader />
            <BaseTabs />
            <RouterView v-slot="{ Component }">
              <Transition
                name="slide-fade"
                mode="out-in"
              >
                <component
                  :is="Component"
                  class="relative min-h-[calc(100%-144px)] w-full p-2 sm:p-4"
                />
              </Transition>
            </RouterView>
            <BaseFooter />
          </div>
        </div>
      </ReportUserTrafficProvider>
    </main>
  </template>
</template>

<style scoped lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
