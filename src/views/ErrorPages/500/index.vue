<script setup lang="ts">
import type { MessageSchema } from '@/types'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const router = useRouter()
</script>

<template>
  <main class="absolute inset-0 m-auto flex items-center justify-center pb-20">
    <NResult
      status="500"
      :title="'500 ' + t('Common.500')"
      description=""
    >
      <template #footer>
        <NButton @click="router.push('/')">{{ t('Common.Back') }}</NButton>
      </template>
    </NResult>
  </main>
</template>
