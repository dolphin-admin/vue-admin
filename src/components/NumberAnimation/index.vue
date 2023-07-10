<script setup lang="ts">
import type { Props, Status } from './private'

// TODO: 如果 Duration 设置较大，仍然可能出现问题

const props = withDefaults(defineProps<Props>(), {
  startValue: 0, // 开始值
  endValue: 0, // 结束值
  duration: 3000, // 持续时间，单位毫秒
  delay: 500 // 延迟执行时间，单位毫秒
})

// 当前值
const currentValue = ref(0)

// 当前状态
const currentStatus = ref<Status>('pending')

// 当前计时器
const currentInterval = ref<NodeJS.Timer | null>(null)

const emit = defineEmits<{
  (e: 'status:change', status: Status): void
}>()

/**
 * 开始
 */
const start = () => {
  // 如果当前状态为 running，直接返回
  if (currentStatus.value === 'running') {
    return
  }
  // 如果当前状态为 stopped，重置当前值
  if (currentStatus.value === 'stopped') {
    currentValue.value = props.startValue
  }
  currentStatus.value = 'running'
  setTimeout(() => {
    if (currentInterval.value) {
      clearInterval(currentInterval.value)
    }
    // 计算增量
    let incrementNumber = Math.floor(((props.endValue - props.startValue) / props.duration) * 5)
    if (incrementNumber < 1) {
      incrementNumber = 1
    }
    // 开始执行
    currentInterval.value = setInterval(() => {
      currentValue.value += incrementNumber
      // 如果当前值大于等于结束值，停止计时器
      if (currentValue.value > props.endValue) {
        if (currentInterval.value) {
          clearInterval(currentInterval.value)
        }
        currentValue.value = props.endValue
        currentStatus.value = 'stopped'
      }
    }, 5)
  }, props.delay)
}

/**
 * 暂停
 */
const pause = () => {
  if (currentStatus.value !== 'running') {
    return
  }
  currentStatus.value = 'paused'
  if (currentInterval.value) {
    clearInterval(currentInterval.value)
  }
}

onMounted(() => {
  currentValue.value = props.startValue
  start()
})

watch(
  () => currentStatus.value,
  () => emit('status:change', currentStatus.value)
)

defineExpose({
  start,
  pause
})
</script>

<template>
  <div>
    {{ currentValue }}
  </div>
</template>
