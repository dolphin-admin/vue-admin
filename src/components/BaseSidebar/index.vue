<script setup lang="ts">
import { useSidebarStore, useThemeStore } from '@/store'

const themeStore = useThemeStore()
const sidebarStore = useSidebarStore()

// @ts-ignore
const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })
</script>

<template>
  <div
    :class="`
    h-full
    w-${sidebarStore.isCollapse ? 10 : 64}
    border-r
    border-gray-300
    bg-light-default
    shadow-sm
    dark:border-gray-950
    dark:bg-dark-default`"
  >
    <div class="flex h-16 w-full items-center justify-center">
      <img
        class="animate-pulse cursor-pointer select-none"
        width="32"
        height="32"
        src="@/assets/images/favicon.png"
        alt=""
        @click="() => themeStore.changeThemeMode(themeStore.themeMode === 'light' ? 'dark' : 'light')"
      />
      <span class="whitespace-nowrap text-xs font-semibold">{{ t('App.Name') }}</span>
    </div>
    <div class="w-full"></div>
  </div>
</template>
