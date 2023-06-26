<script setup lang="ts">
import { menuOptions } from '@/constants'
import { useSidebarStore, useThemeStore } from '@/store'

const themeStore = useThemeStore()
const sidebarStore = useSidebarStore()
const router = useRouter()

// @ts-ignore
const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })
</script>

<template>
  <div
    class="z-100 h-full border-r border-gray-300 bg-light-default shadow-sm transition-[width] duration-500 dark:border-gray-950 dark:bg-dark-default"
    :class="[sidebarStore.isCollapse ? 'w-0 sm:w-16' : 'absolute inset-y-0 left-0 w-56 sm:static sm:w-56']"
  >
    <div class="flex h-16 w-full select-none items-center justify-center space-x-3">
      <img
        class="animate-pulse cursor-pointer select-none"
        width="36"
        height="36"
        src="@/assets/images/favicon.png"
        alt=""
        loading="eager"
        @click="() => themeStore.changeThemeMode(themeStore.themeMode === 'light' ? 'dark' : 'light')"
      />
      <span
        v-show="!sidebarStore.isCollapse"
        class="cursor-pointer whitespace-nowrap text-sm tracking-wide"
        @click="() => router.push('/')"
      >
        {{ t('App.Name') }}
      </span>
    </div>
    <div class="h-[calc(100%-64px)]">
      <NScrollbar :size="10">
        <NMenu
          :collapsed-icon-size="20"
          :collapsed="sidebarStore.isCollapse"
          :options="menuOptions"
          :collapsed-width="64"
          :root-indent="18"
          :indent="28"
        />
      </NScrollbar>
    </div>
  </div>
</template>
