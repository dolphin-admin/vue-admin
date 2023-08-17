<script setup lang="ts">
const listData = new Array(10000)
  .fill(null)
  .map((_item, i) => ({ id: i + 1, data: '列表项' }))
</script>

<template>
  <main>
    <DVirtualList
      :data="listData"
      :show-num="20"
      :item-height="20"
      class="w-full sm:w-64"
    />
  </main>
</template>
