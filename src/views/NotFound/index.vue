<script setup lang="ts">
import type { MessageSchema } from '@/types'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })
</script>

<template>
  <main class="absolute inset-0 m-auto">
    <div class="absolute inset-0 m-auto flex h-fit w-1/3 flex-col items-center space-y-4 pb-20 text-center">
      <img
        class="animate-pulse cursor-pointer select-none"
        width="160"
        height="160"
        src="@/assets/images/favicon.png"
        alt=""
        loading="eager"
      />
      <div class="flex select-none flex-col space-y-2">
        <span class="text-2xl font-semibold">404 {{ t('Common.404') }}</span>
      </div>
    </div>
  </main>
</template>
