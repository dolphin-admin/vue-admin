<script setup lang="ts">
import type { MessageSchema } from '@/types'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const router = useRouter()
</script>

<template>
  <main class="absolute inset-0 m-auto">
    <div class="absolute inset-0 m-auto flex h-fit w-1/3 flex-col items-center space-y-4 pb-20 text-center">
      <img
        class="animate-pulse cursor-pointer select-none"
        width="200"
        height="200"
        src="@/assets/images/500.png"
        alt=""
        loading="eager"
      />
      <div class="flex select-none flex-col space-y-2">
        <span class="text-2xl font-semibold">500 {{ t('Common.500') }}</span>
      </div>
      <NButton
        type="primary"
        @click="() => router.push('/')"
        >返回</NButton
      >
    </div>
  </main>
</template>
