<script setup lang="ts">
import type { Props } from './private'

const listWrapRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const scrollbar = ref<HTMLElement | null>(null)
const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  showNum: 20,
  itemHeight: 20
})

const startIndex = ref(0)

const endIndex = ref(0)

const scrollOffset = ref(0)

// 展示的列表
const showList = computed(() =>
  props.data.slice(startIndex.value, endIndex.value)
)

const handleScroll = () => {
  const { scrollTop } = listWrapRef.value!
  if (scrollOffset.value === scrollTop) return
  startIndex.value = Math.floor(scrollTop / props.itemHeight)
  endIndex.value = startIndex.value + props.showNum + 5
  if (startIndex.value > 5) {
    startIndex.value -= 5
  }
  // 列表偏移
  scrollOffset.value = scrollTop - (scrollTop % props.itemHeight)
}

const listWrapRefHeight = computed(() =>
  props.itemHeight * props.showNum > 500
    ? 500
    : props.itemHeight * props.showNum
)

onMounted(() => {
  listWrapRef.value!.style.height = `${listWrapRefHeight.value}px`
  scrollbar.value!.style.height = `${props.itemHeight * props.data.length}px`
})
</script>

<template>
  <div
    ref="listWrapRef"
    class="absolute flex overflow-y-auto bg-white"
    @scroll="handleScroll"
  >
    <div ref="scrollbar"></div>
    <div
      ref="listRef"
      :style="{ transform: `translateY(${scrollOffset}px)` }"
      class="w-full bg-white"
    >
      <div
        v-for="(item, index) in showList"
        :key="index + startIndex"
        class="flex w-full border-b"
        :class="h - [props.itemHeight]"
      >
        {{ item.data + ':' + item.id }}
      </div>
    </div>
  </div>
</template>
