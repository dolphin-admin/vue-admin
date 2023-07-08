<script setup lang="ts">
import type { MessageSchema } from '@/types'

const route = useRoute()
const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })
</script>

<template>
  <div class="h-[calc(100%-144px)]">
    <div class="mb-2 flex items-center justify-between">
      <div class="flex items-center space-x-2 pl-1 text-2xl">
        <template v-if="route.meta?.icon">
          <component :is="route.meta.icon" />
        </template>
        <template v-if="route.meta?.title">
          <span>{{ t(route.meta.title as string) }}</span>
        </template>
      </div>
      <slot name="operate" />
    </div>
    <slot />
  </div>
</template>
