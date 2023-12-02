<script setup lang="ts">
import type { MessageSchema } from '@/types'
import { GoogleAuthUtils } from '@/utils/google'
import GoogleIcon from '~icons/logos/google-icon'

const { t } = useI18n<{ message: MessageSchema }>()

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const NMessage = useMessage()

const [loading, loadingDispatcher] = useLoading(false)

const redirectUrl = computed(() => route.query.redirect as string)

/**
 * Google OAuth2 登录
 */
const loginWithGoogle = () => {
  if (loading.value) {
    return
  }
  loadingDispatcher.loading()

  const authURL = GoogleAuthUtils.getAuthUrl()

  // 打开授权子窗口
  GoogleAuthUtils.openAuthWindow(authURL)

  // 添加新窗口关闭事件监听器
  const messageEventListener = (event: MessageEvent) => {
    // 确保消息来自 Google 授权子窗口
    if (event.origin !== window.location.origin) {
      return
    }
    // 接收到数据移除监听器
    window.removeEventListener('message', messageEventListener)

    // 处理从新窗口传递过来的 Google 访问令牌
    const googleAuthCode = event.data

    AuthAPI.loginWithGoogle(googleAuthCode)
      .then((res) => {
        const { data, message } = res
        const { accessToken, refreshToken, user } = data ?? {}
        AuthUtils.setAccessToken(accessToken)
        AuthUtils.setRefreshToken(refreshToken)
        userStore.setUser(user)
        if (message) {
          NMessage.success(message)
        }

        if (redirectUrl.value) {
          router.replace(redirectUrl.value)
        } else {
          router.replace('/')
        }
      })
      .catch((err) => {
        if (err.message) {
          NMessage.error(err.message)
        }
        loadingDispatcher.loaded()
      })
  }

  // 父窗口监听子窗口传递过来的消息
  window.addEventListener('message', messageEventListener)
}
</script>

<template>
  <NButton
    :loading="loading"
    :disabled="loading"
    @click="loginWithGoogle"
  >
    <template #icon>
      <NIcon
        size="16"
        :component="GoogleIcon"
      />
    </template>
    <span>{{ t('TEMP.Login.LoginWithGoogle') }}</span>
  </NButton>
</template>
