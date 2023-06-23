<script setup lang="ts">
import { GlobalAPIConfig } from '@/constants'
import { useThemeStore } from '@/store'
import ToolIcon from '~icons/mdi/tools'

const themeStore = useThemeStore()
</script>

<template>
  <div
    v-if="GlobalAPIConfig.IS_DEV"
    class="fixed bottom-10 left-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-light-default p-2 shadow-md transition-colors dark:bg-dark-default"
    @click="() => themeStore.changeThemeMode(themeStore.themeMode === 'light' ? 'dark' : 'light')"
  >
    <ToolIcon class="dark:text-white" />
  </div>
</template>
