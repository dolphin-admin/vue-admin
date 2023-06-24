<script setup lang="ts">
import { useThemeStore, useUserStore } from '@/store'
import NotificationIcon from '~icons/ic/baseline-notifications-none'
import LanguageIcon from '~icons/ion/language-outline'
import SunIcon from '~icons/line-md/moon-to-sunny-outline-transition'
import MoonIcon from '~icons/line-md/sunny-filled-loop-to-moon-alt-filled-loop-transition'
import FullScreenIcon from '~icons/material-symbols/fullscreen'

const themeStore = useThemeStore()
const userStore = useUserStore()
</script>

<template>
  <header
    class="z-50 flex h-16 w-full items-center justify-between border-b border-gray-300 bg-light-default p-4 shadow-sm dark:border-gray-950 dark:bg-dark-default"
  >
    <div class="flex h-full items-center justify-start"></div>
    <div class="flex h-full items-center justify-end space-x-4">
      <div><NotificationIcon /></div>
      <div><LanguageIcon /></div>
      <div
        class="cursor-pointer"
        @click="() => themeStore.changeThemeMode(themeStore.themeMode === 'light' ? 'dark' : 'light')"
      >
        <SunIcon
          v-if="themeStore.themeMode === 'light'"
          class="dark:text-white"
        />
        <MoonIcon
          v-else
          class="dark:text-white"
        />
      </div>

      <div>
        <FullScreenIcon />
      </div>
      <div>
        <img />
        <span>{{ userStore.userInfo.username }}</span>
      </div>
    </div>
  </header>
</template>
