<script setup lang="ts">
import type { Props } from './private'

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  showNum: 20,
  itemHeight: 20
})

const listWrapRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const scrollbar = ref<HTMLElement | null>(null)

const startIndex = ref(0)
const endIndex = ref(0)

const scrollOffset = ref(0)

// 展示的列表
const showList = computed(() =>
  props.data.slice(startIndex.value, endIndex.value)
)

const handleScroll = () => {
  const { scrollTop } = listWrapRef.value!
  if (scrollOffset.value === scrollTop) {
    return
  }
  startIndex.value = Math.floor(scrollTop / props.itemHeight)
  endIndex.value = startIndex.value + props.showNum + 5
  if (startIndex.value > 5) {
    startIndex.value -= 5
  }
  // 列表偏移
  scrollOffset.value = scrollTop - (scrollTop % props.itemHeight)
}

onMounted(() => {
  listWrapRef.value!.style.height = `${props.itemHeight * props.showNum}px`
  scrollbar.value!.style.height = `${props.itemHeight * props.data.length}px`
})
</script>

<template>
  <div
    ref="listWrapRef"
    class="flex w-full overflow-y-auto"
    @scroll="handleScroll"
  >
    <div ref="scrollbar" />
    <div
      ref="listRef"
      :style="{ transform: `translateY(${scrollOffset}px)` }"
      class="w-full bg-white"
    >
      <div
        v-for="(item, index) in showList"
        :key="index + startIndex"
        class="border-b"
      >
        {{ item.data + ':' + item.id }}
      </div>
    </div>
  </div>
</template>
