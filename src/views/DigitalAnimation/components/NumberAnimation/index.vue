<script setup lang="ts">
type Props = {
  numberData: () => {
    duration: number
    startValue: number
    endValue: number
  }
}

const props = withDefaults(defineProps<Props>(), {
  numberData: () => ({
    duration: 3000,
    startValue: 0,
    endValue: 5000
  })
})

const numberValue = ref(0)

const intervalIdRef = ref<any>(null)

const handleNumberValue = (value: any) => {
  numberValue.value = value.startValue
  setTimeout(() => {
    if (intervalIdRef.value) {
      clearInterval(intervalIdRef.value)
    }
    let incrementNumber = Math.floor(((value.endValue - value.startValue) / value.duration) * 5)
    if (incrementNumber < 1) {
      incrementNumber = 1
    }
    intervalIdRef.value = setInterval(() => {
      numberValue.value += incrementNumber
      if (numberValue.value > value.endValue) {
        if (intervalIdRef.value) {
          clearInterval(intervalIdRef.value)
        }
        numberValue.value = value.endValue
      }
    }, 5)
  }, 500)
}
onMounted(() => {
  handleNumberValue(props.numberData)
})
defineExpose({
  handleNumberValue
})
</script>
<template>
  <div class="text-6xl font-semibold text-blue-400">{{ numberValue }}</div>
</template>
