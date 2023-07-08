<script setup lang="ts">
import type { MessageSchema } from '@/types'

const { version, teamName, teamGitHubURL } = siteMetaData

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const { openNewWindow } = BrowserUtils
</script>

<template>
  <footer
    class="z-50 flex h-10 w-full items-center justify-center space-x-2 border-t border-gray-300 bg-light-default text-xs shadow-sm dark:border-gray-950 dark:bg-dark-default"
  >
    <span>{{ t('App.Name') }} - v{{ version }}</span>
    <span>©</span>
    <img
      class="cursor-pointer transition-all hover:-translate-y-1 hover:scale-110 active:-translate-y-0 active:scale-105 active:opacity-75"
      src="@/assets/images/bit_ocean.png"
      alt=""
      loading="eager"
      width="18"
      @click="() => openNewWindow(teamGitHubURL)"
    />
    <span>{{ teamName }}</span>
  </footer>
</template>
