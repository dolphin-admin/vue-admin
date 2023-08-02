<script setup lang="ts">
import type { MessageSchema } from '@/types'

const { version } = siteMetaData

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const themeStore = useThemeStore()
</script>

<template>
  <main class="absolute inset-0 m-auto dark:bg-black">
    <div
      class="absolute inset-0 m-auto flex h-fit w-1/3 flex-col items-center space-y-4 text-center"
    >
      <img
        class="animate-pulse cursor-pointer select-none"
        width="160"
        height="160"
        src="@/assets/images/favicon.png"
        alt=""
        loading="eager"
        @click="
          () =>
            themeStore.changeThemeMode(
              themeStore.themeMode === 'light' ? 'dark' : 'light'
            )
        "
      />
      <div class="flex flex-col space-y-2">
        <span class="whitespace-nowrap text-2xl font-semibold">
          {{ t('App.Name') }}
        </span>
        <span class="text-base tracking-wider">v{{ version }}</span>
      </div>
    </div>
  </main>
</template>
