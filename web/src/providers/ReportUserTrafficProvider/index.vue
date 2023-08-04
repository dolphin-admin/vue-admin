<script setup lang="ts">
/**
 * NOTE: 上报用户数据组件
 * @description 在用户退出前或页面隐藏、关闭、刷新时上报用户数据
 */

const userTrafficStore = useUserTrafficStore()

/**
 * 开始记录用户数据
 */
const startRecord = () => {
  console.log('startRecord')
  // 获取用户的访问记录
  // 获取用户的流量信息
}

/**
 * 上报用户数据
 */
const sendReport = () => {
  console.log('sendReport')
  navigator.sendBeacon('http://localhost:3000/traffics', '123')
}

onMounted(() => {
  // 获取用户IP地址
  UserTrafficAPI.getIP()
    .then((res) => {
      const { ip } = res
      userTrafficStore.setIP(ip)
    })
    .catch(() => userTrafficStore.setIP(null))

  // 获取用户的地理坐标信息
  UserTrafficUtils.getGeolocation()
    .then((coords) => {
      const { latitude, longitude, altitude } = coords
      userTrafficStore.setGeoCoords({ latitude, longitude, altitude })
      UserTrafficAPI.getArea(latitude, longitude, 'zh_CN').then((res) => {
        userTrafficStore.setGeoArea(res.display_name)
        console.log(userTrafficStore.geographyInfo)
      })
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.error(error)
      }
    })

  // 获取用户的流量信息
  useEventListener(document, 'visibilitychange', (event: Event) => {
    if (document.visibilityState === 'hidden') {
      sendReport()
    } else {
      startRecord()
    }
  })
})
</script>

<template>
  <slot />
</template>
