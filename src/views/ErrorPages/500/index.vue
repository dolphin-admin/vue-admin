<script setup lang="ts">
import type { MessageSchema } from '@/types'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const route = useRoute()
const router = useRouter()
const tabStore = useTabStore()

const handleBack = () => {
  router.push('/')
  console.log(route.fullPath)
  tabStore.removeTabByHref(route.fullPath)
}
</script>

<template>
  <main class="absolute inset-0 m-auto flex items-center justify-center pb-20">
    <NResult
      status="500"
      :title="'500 ' + t('Common.500')"
      description=""
    >
      <template #footer>
        <NButton @click="handleBack">{{ t('Common.Back') }}</NButton>
      </template>
    </NResult>
  </main>
</template>
