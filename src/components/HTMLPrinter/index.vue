<script setup lang="ts">
const props = defineProps({
  // 打印内容
  content: {
    type: String,
    default: ''
  }
})

const dynamicContent = computed(() => props.content)
</script>

<template>
  <teleport to="body">
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
    margin-bottom: 0mm;
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
