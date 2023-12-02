<script setup lang="ts">
import type { MessageSchema } from '@/types'
import GitHubIcon from '~icons/ant-design/github-outlined'

const { t } = useI18n<{ message: MessageSchema }>()

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const NMessage = useMessage()

const [loading, loadingDispatcher] = useLoading(false)

const redirectUrl = computed(() => route.query.redirect as string)

/**
 * GitHub OAuth2 登录
 */
const loginWithGitHub = () => {
  if (loading.value) {
    return
  }
  loadingDispatcher.loading()

  const authURL = GitHubAuthUtils.getAuthUrl()

  // 打开授权子窗口
  GitHubAuthUtils.openAuthWindow(authURL)

  // 添加新窗口关闭事件监听器
  const messageEventListener = (event: MessageEvent) => {
    // 确保消息来自 GitHub 授权子窗口
    if (event.origin !== window.location.origin) {
      return
    }
    // 接收到数据移除监听器
    window.removeEventListener('message', messageEventListener)

    // 处理从新窗口传递过来的 GitHub 访问令牌
    const githubAuthCode = event.data

    AuthAPI.loginWithGitHub(githubAuthCode)
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
    color="#595D5F"
    :loading="loading"
    :disabled="loading"
    @click="loginWithGitHub"
  >
    <template #icon>
      <NIcon
        color="white"
        size="16"
      >
        <GitHubIcon class="scale-125" />
      </NIcon>
    </template>
    <span class="text-white">{{ t('TEMP.Login.LoginWithGitHub') }}</span>
  </NButton>
</template>
