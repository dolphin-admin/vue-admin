<script setup lang="ts">
const { version, teamName } = siteMetaData

// @ts-ignore
const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })
</script>

<template>
  <footer
    class="z-50 flex h-12 w-full items-center justify-center space-x-2 border-t border-gray-300 bg-light-default text-xs tracking-wide shadow-sm dark:border-gray-950 dark:bg-dark-default"
  >
    <span class="hidden sm:static">{{ t('App.Name') }} - v{{ version }}</span>
    <span>© {{ teamName }}</span>
  </footer>
</template>
