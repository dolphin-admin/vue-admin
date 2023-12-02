<script setup lang="ts">
import { CollapseButton, Header, Mask, Menu } from './components'

const sidebarStore = useSidebarStore()
</script>

<template>
  <div
    class="absolute inset-y-0 left-0 z-[100] h-full border border-gray-300 bg-default-light shadow-sm transition-[width] dark:border-gray-950 dark:bg-default-dark sm:static"
    :class="[
      sidebarStore.isDisplay ? (sidebarStore.isCollapse ? 'w-16' : 'w-56') : 'w-0 border-r-0'
    ]"
  >
    <Header />
    <Menu />
    <CollapseButton />
  </div>
  <Mask />
</template>
