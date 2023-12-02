<script setup lang="ts">
import type { Props } from './private'

const props = withDefaults(defineProps<Props>(), {
  content: '' // 打印内容（HTML 字符串）
})

const dynamicContent = computed(() => props.content)
</script>

<template>
  <teleport to="html">
    <div
      class="print-content"
      v-html="dynamicContent"
    />
  </teleport>
</template>

<style scoped lang="scss">
.print-content {
  visibility: hidden;
}

@media print {
  @page {
    margin: 0mm;
  }
  .print-content {
    visibility: visible;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
}
</style>
