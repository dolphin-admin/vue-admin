<script setup lang="ts">
import type { MessageSchema } from '@/types'
const route = useRoute()
// @ts-ignore
const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })
</script>

<template>
  <div class="h-[calc(100%-112px)]">
    <div class="mb-4 flex items-center space-x-2 pl-1 text-2xl">
      <component :is="route.meta?.icon" />
      <span>{{ t((route.meta?.title ?? '') as string) }}</span>
    </div>
    <slot />
  </div>
</template>
