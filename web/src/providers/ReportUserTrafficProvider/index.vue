<script setup lang="ts">
/**
 * NOTE: 上报用户数据组件
 * @description 在用户退出前或页面隐藏、关闭、刷新时上报用户数据
 */

const startRecord = () => {
  console.log('startRecord')
  // 获取用户的访问记录
  // getRecords()
  // 获取用户的流量信息
  // getTrafficTime()
}

/**
 * 上报用户数据
 */
const sendReport = () => {
  console.log('sendReport')
  navigator.sendBeacon('http://localhost:3000/api/traffics', '123')
}

onMounted(() => {
  useEventListener(document, 'visibilitychange', (event: Event) => {
    if (document.visibilityState === 'hidden') {
      sendReport()
    } else {
      startRecord()
    }
  })
  // 页面隐藏时发送数据
  // 获取用户IP地址
  // getIP()
  // 获取用户的appData信息
  // getAppData()
  // 获取用户的地理位置信息
  // getGeography()
  // 获取用户的流量信息
  // getTrafficTime()
  // 获取用户的访问记录
  // getRecords()
  // 监听用户的退出事件
  // useEventListener(window, 'beforeunload', sendReport)
  // 监听用户的页面隐藏事件
  // useEventListener(document, 'visibilitychange', sendReport)
  // 监听用户的页面关闭事件
  // useEventListener(window, 'unload', sendReport)
  // 监听用户的页面刷新事件
  // useEventListener(window, 'pagehide', sendReport)
  // 监听用户的页面刷新事件
  // useEventListener(window, 'pageshow', sendReport)
})
</script>

<template>
  <slot />
</template>
