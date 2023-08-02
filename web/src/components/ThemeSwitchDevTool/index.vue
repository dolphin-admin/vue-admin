<script setup lang="ts">
import ToolIcon from '~icons/mdi/tools'

const { IS_DEV } = GlobalEnvConfig

const themeStore = useThemeStore()
</script>

<template>
  <div
    v-if="IS_DEV"
    class="bg-light-default dark:bg-dark-default fixed bottom-20 right-10 z-[1000] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-2 shadow-md transition-colors"
    @click="
      () =>
        themeStore.changeThemeMode(
          themeStore.themeMode === 'light' ? 'dark' : 'light'
        )
    "
  >
    <ToolIcon class="dark:text-white" />
  </div>
</template>
