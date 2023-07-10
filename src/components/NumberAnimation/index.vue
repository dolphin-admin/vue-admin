<script setup lang="ts">
interface NumberData {
  duration: number
  startValue: number
  endValue: number
}

interface Props {
  numberData: NumberData
}

const props = withDefaults(defineProps<Props>(), {
  numberData: () => ({
    duration: 3000,
    startValue: 0,
    endValue: 0
  })
})

const numberValue = ref(0)
const isPause = ref(false)
const isContinue = ref(false)
const lastNumber = ref(0)

const intervalIdRef = ref<any>(null)

const handleNumberValue = (data: NumberData) => {
  if (isContinue.value) {
    numberValue.value = lastNumber.value
  } else {
    numberValue.value = data.startValue
  }
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
      if (isPause.value) {
        if (intervalIdRef.value) {
          clearInterval(intervalIdRef.value)
        }
        lastNumber.value = numberValue.value
        isPause.value = false
      }
      if (numberValue.value > data.endValue) {
        if (intervalIdRef.value) {
          clearInterval(intervalIdRef.value)
        }
        numberValue.value = data.endValue
        lastNumber.value = data.endValue
      }
    }, 5)
  }, 500)
}

const handleIsPause = () => {
  isPause.value = true
}

const handleIsContinue = () => {
  isContinue.value = true
  handleNumberValue(props.numberData)
}

const handleIsStart = () => {
  isPause.value = false
  isContinue.value = false
  handleNumberValue(props.numberData)
}

onMounted(() => handleNumberValue(props.numberData))

defineExpose({
  handleIsPause,
  handleIsStart,
  handleIsContinue
})
</script>

<template>
  <div>
    {{ numberValue }}
  </div>
</template>
