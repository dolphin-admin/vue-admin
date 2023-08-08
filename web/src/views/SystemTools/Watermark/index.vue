<script setup lang="ts">
const elementRef = ref<HTMLElement | null>(null)
const number = ref(0)

const updateNumber = () => {
  nextTick(() => {
    const element = elementRef.value
    console.log(elementRef.value)
    if (element) {
      const width = element.offsetWidth
      const height = element.offsetHeight
      const result = (width * height) / 13800
      number.value = Math.floor(result)
    }
  })
}

onMounted(() => {
  updateNumber()
  useEventListener(window, 'resize', updateNumber, true)
})
</script>

<template>
  <main
    class="absolute inset-0 flex"
    ref="elementRef"
  >
    <NCard
      class="flex w-full flex-col space-y-2"
      hoverable
    >
      <span
        v-for="item in number"
        :key="item"
        v-watermark="{
          text: 'Bit Ocean',
          textColor: 'rgba(180, 180, 180, 0.6)'
        }"
      >
      </span>
    </NCard>
  </main>
</template>
