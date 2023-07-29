<script setup lang="ts">
import type { MessageSchema } from '@/types'
import LoadingIcon from '~icons/svg-spinners/blocks-shuffle-3'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })
</script>

<template>
  <main class="flex h-screen flex-col items-center justify-center">
    <NIcon
      :component="LoadingIcon"
      size="60"
      class="text-blue-200 dark:text-blue-400"
    />
    <span class="mb-1 mt-4 text-xl">{{ t('App.Name') }}</span>
    <NGradientText type="primary">Powered by Bit Ocean</NGradientText>
  </main>
</template>
