<script setup lang="ts">
const sidebarStore = useSidebarStore()
</script>

<template>
  <div
    class="absolute inset-0 z-[75] bg-black opacity-40 sm:hidden"
    :class="sidebarStore.isDisplay ? 'block' : 'hidden'"
    @click="sidebarStore.toggleDisplay"
  />
</template>
