<script setup lang="ts">
import CollapseIcon from '~icons/line-md/chevron-small-double-left'

const sidebarStore = useSidebarStore()
</script>

<template>
  <div
    v-if="sidebarStore.isDisplay"
    class="h-10 p-1"
  >
    <div
      class="group flex h-full w-full cursor-pointer items-center justify-center rounded-sm transition-all hover:bg-gray-200 active:opacity-75 dark:hover:bg-gray-600"
      @click="sidebarStore.toggleCollapse"
    >
      <NIcon
        size="24"
        class="transition-transform duration-300 group-hover:scale-110 group-active:scale-100"
        :class="[sidebarStore.isCollapse ? '!rotate-180' : '!rotate-0']"
        :component="CollapseIcon"
      />
    </div>
  </div>
</template>
