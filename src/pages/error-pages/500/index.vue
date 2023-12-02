<script setup lang="ts">
import type { MessageSchema } from '@/types'
import InternalServerErrorIcon from '~icons/noto-v1/face-with-head-bandage'

const { t } = useI18n<{ message: MessageSchema }>()

const route = useRoute()
const router = useRouter()
const tabStore = useTabStore()

const handleBack = () => {
  router.push('/')
  tabStore.removeTabByHref(route.fullPath)
}
</script>

<template>
  <main class="absolute inset-0 m-auto flex items-center justify-center pb-20">
    <NResult
      status="500"
      :title="'500 ' + t('COMMON.500')"
      description=""
      size="small"
    >
      <template #icon>
        <NIcon
          :component="InternalServerErrorIcon"
          size="80"
        />
      </template>
      <template #footer>
        <NButton @click="handleBack">{{ t('COMMON.BACK') }}</NButton>
      </template>
    </NResult>
  </main>
</template>
