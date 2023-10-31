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

const currentStatus = ref<Status>('pending')
let timer: ReturnType<typeof setInterval> | null = null
const seconds = ref(0)

const date = reactive<Time>({
  day: '00',
  showHour: '00',
  minute: '00',
  second: '00'
})

// 清除定时器
const clearTimer = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

/* 更改格式化时间 */
const changeTime = () => {
  const {
    day = '00',
    showHour = '00',
    minute = '00',
    second = '00'
  } = formatTime(seconds.value) || {}
  date.day = day
  date.showHour = showHour
  date.minute = minute
  date.second = second
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
  timer = setInterval(() => {
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

onUnmounted(() => changeStatus('stopped'))

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
