<script setup lang="ts">
import type { Props, Status, Time } from './private'
import { formatTime } from './private'

const props = withDefaults(defineProps<Props>(), {
  target: 86400 // 目标值
})
const emit = defineEmits<{
  (e: 'change', time: number, status: Status): void
  (e: 'end'): void
}>()
let fromTimeData = null
const currentStatus = ref<Status>('pending')
const timer = ref<NodeJS.Timer | null>(null) // 定时器
const seconds = ref(0) // 记录不停倒计过程中变化的秒数
const date: Time = reactive({
  day: '00',
  showHour: '00',
  minute: '00',
  second: '00'
})
// 清除定时器
const clearTimer = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}
/* 更改格式化时间 */
const changeTime = () => {
  fromTimeData = reactive(formatTime(seconds.value))
  date.second = (fromTimeData && fromTimeData.second) || '00'
  date.showHour = (fromTimeData && fromTimeData.showHour) || '00'
  date.minute = (fromTimeData && fromTimeData.minute) || '00'
  date.day = (fromTimeData && fromTimeData.day) || '00'
}
/* 状态更改 */
const changeStatus = (e: Status) => {
  currentStatus.value = e
  if (e === 'running') {
    changeTime()
  }
  if (e === 'paused' || e === 'stopped') {
    clearTimer()
    if (e === 'stopped') emit('end')
  }
  emit('change', seconds.value, currentStatus.value)
}

/**
 * 暂停
 */
const pause = () => changeStatus('paused')
/* 开始 */
const start = () => {
  clearTimer()
  if (props.target <= 0 || currentStatus.value === 'running') return
  if (currentStatus.value !== 'paused') seconds.value = Number(props.target)
  changeStatus('running')
  timer.value = setInterval(() => {
    emit('change', seconds.value, currentStatus.value)
    seconds.value -= 1
    if (seconds.value < 0) {
      changeStatus('stopped')
    }
    changeTime()
  }, 1000)
}
/* 重新开始 */
const restart = () => {
  changeStatus('pending')
  start()
}

// 监听时间戳的变化
watch(
  () => props.target,
  () => {
    clearTimer()
    start()
  },
  { immediate: true }
)
onUnmounted(() => {
  changeStatus('stopped')
})
defineExpose({
  start,
  pause,
  restart
})
</script>

<template>
  <div class="">{{ date.showHour }}:{{ date.minute }}:{{ date.second }}</div>
</template>

<style scoped></style>
