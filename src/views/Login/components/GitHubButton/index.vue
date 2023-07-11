<script setup lang="ts">
import type { MessageSchema } from '@/types'
import GitHubIcon from '~icons/line-md/github'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const message = useMessage()

const [githubLoading, githubLoadingDispatcher] = useLoading(false)

const redirectUrl = computed(() => route.query.redirect as string)

/**
 * GitHub OAuth2 登录
 */
const loginWithGitHub = () => {
  if (githubLoading.value) {
    return
  }
  githubLoadingDispatcher.loading()

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
        const { accessToken, user } = res.data || {}
        AuthUtils.setToken(accessToken)
        userStore.setUser(user)
        message.success(t('Login.Success'))

        if (redirectUrl.value) {
          router.replace(redirectUrl.value)
        } else {
          router.replace('/')
        }
      })
      .catch((err) => {
        message.error(err.message ?? t('Login.Failed'))
        githubLoadingDispatcher.loaded()
      })
  }

  // 父窗口监听子窗口传递过来的消息
  window.addEventListener('message', messageEventListener)
}

onBeforeMount(() => {
  // 如果是授权子窗口，则将授权码传递给父窗口
  if (window.opener) {
    const code = route.query.code as string
    if (code) {
      window.opener.postMessage(code, window.location.origin)
    }
    setTimeout(() => window.close(), 0)
  }
})
</script>

<template>
  <NButton
    color="#595D5F"
    :loading="githubLoading"
    :disabled="githubLoading"
    @click="loginWithGitHub"
  >
    <template #icon>
      <NIcon
        color="white"
        :component="GitHubIcon"
      />
    </template>
    <span class="text-white">{{ t('Login.LoginWithGitHub') }}</span>
  </NButton>
</template>
