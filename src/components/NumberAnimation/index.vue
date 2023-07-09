<script setup lang="ts">
interface NumberData {
  duration: number
  startValue: number
  endValue: number
}

interface Props {
  numberData: NumberData
  fontSize: string | number
}

const props = withDefaults(defineProps<Props>(), {
  numberData: () => ({
    duration: 3000,
    startValue: 0,
    endValue: 0
  })
})

const numberValue = ref(0)

const intervalIdRef = ref<any>(null)

const handleNumberValue = (data: NumberData) => {
  numberValue.value = data.startValue
  setTimeout(() => {
    if (intervalIdRef.value) {
      clearInterval(intervalIdRef.value)
    }
    let incrementNumber = Math.floor(((data.endValue - data.startValue) / data.duration) * 5)
    if (incrementNumber < 1) {
      incrementNumber = 1
    }
    intervalIdRef.value = setInterval(() => {
      numberValue.value += incrementNumber
      if (numberValue.value > data.endValue) {
        if (intervalIdRef.value) {
          clearInterval(intervalIdRef.value)
        }
        numberValue.value = data.endValue
      }
    }, 5)
  }, 500)
}

onMounted(() => handleNumberValue(props.numberData))

defineExpose({
  handleNumberValue
})
</script>

<template>
  <div>
    {{ numberValue }}
  </div>
</template>
