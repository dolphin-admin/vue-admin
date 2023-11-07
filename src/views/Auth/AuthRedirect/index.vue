<script setup lang="ts">
import type { MessageSchema } from '@/types'
import LoadingIcon from '~icons/svg-spinners/blocks-scale'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const route = useRoute()
const router = useRouter()

onBeforeMount(() => {
  // 如果是授权子窗口，则将授权码传递给父窗口
  if (window.opener) {
    const code = route.query.code as string
    if (code) {
      window.opener.postMessage(code, window.location.origin)
    }
    setTimeout(() => window.close(), 0)
  } else {
    // 如果不是授权子窗口，则跳转到登录页面
    router.replace('/login')
  }
})
</script>

<template>
  <main class="absolute inset-0 m-auto flex h-fit w-fit flex-col items-center space-y-2">
    <NIcon
      size="80"
      :component="LoadingIcon"
    />
    <span class="animate-pulse text-xl">
      {{ t('AuthRedirect.Authorizing') }}
    </span>
  </main>
</template>
