<script setup lang="ts">
import type { MessageSchema } from '@/types'
import GitHubIcon from '~icons/line-md/github'

import type { RememberedAccountData } from './private'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const message = useMessage()

const [submitLoading, submitLoadingDispatcher] = useLoading(false)
const [githubLoading, githubLoadingDispatcher] = useLoading(false)
const submitType = ref<'BASIC' | 'ADMIN'>('BASIC')

const formData = reactive({
  username: '',
  password: ''
})
const formRef = ref<FormInst | null>(null)
const rememberPassword = ref(false)

const redirectUrl = computed(() => route.query.redirect as string)

const rules: FormRules = {
  username: [
    {
      required: true,
      trigger: ['blur', 'input'],
      renderMessage: () => t('Validation.Username')
    }
  ],
  password: [
    {
      required: true,
      trigger: ['blur', 'input'],
      renderMessage: () => t('Validation.Password')
    },
    {
      validator: (_: FormItemRule, value: string) => value.length >= 6,
      trigger: ['blur', 'input'],
      renderMessage: () => t('Validation.PasswordLength')
    }
  ]
}

/**
 * 登录
 */
const login = () => {
  formRef.value!.validate((errors) => {
    if (errors) {
      message.error(errors[0][0].message!)
      return
    }

    if (submitLoading.value) {
      return
    }

    submitLoadingDispatcher.loading()

    AuthAPI.login(formData)
      .then((res) => {
        const { accessToken, user } = res.data || {}
        AuthUtils.setToken(accessToken)
        userStore.setUser(user)
        message.success(t('Login.Success'))
        if (rememberPassword.value) {
          AuthUtils.setRememberedAccount(JSON.stringify(formData))
        } else {
          AuthUtils.clearRememberedAccount()
        }

        if (redirectUrl.value) {
          router.replace(redirectUrl.value)
        } else {
          router.replace('/')
        }
      })
      .catch((err) => {
        message.error(err.message ?? t('Login.Failed'))
        submitLoadingDispatcher.loaded()
      })
      .finally(() => {
        formData.password = ''
      })
  })
}

/**
 * 基础登录
 */
const loginAsBasic = () => {
  submitType.value = 'BASIC'
  login()
}

/**
 * 以管理员身份登录
 */
const loginAsAdmin = () => {
  submitType.value = 'ADMIN'
  formData.username = AuthUtils.DEFAULT_ADMIN_USERNAME
  formData.password = AuthUtils.DEFAULT_PASSWORD
  login()
}

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

/**
 * 忘记密码
 */
const forgetPassword = () => {}

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

onMounted(() => {
  const localStorageData = AuthUtils.getRememberedAccount()
  if (localStorageData) {
    try {
      const { username, password } = JSON.parse(localStorageData) as RememberedAccountData
      formData.username = username
      formData.password = password
      rememberPassword.value = true
    } catch {
      //
    }
  }
})
</script>

<template>
  <NForm
    ref="formRef"
    :rules="rules"
    :model="formData"
    class="absolute inset-0 m-auto flex h-fit w-[340px] max-w-[85%] flex-col space-y-4 rounded-lg bg-light-default px-4 py-8 shadow-md transition-colors dark:bg-dark-default sm:w-[260px] md:w-[340px]"
  >
    <div class="select-none text-center text-lg font-semibold">{{ t('Menu.Login') }}</div>

    <NFormItem
      path="username"
      :show-label="false"
      :show-feedback="false"
    >
      <NInput
        v-model:value="formData.username"
        type="text"
        :placeholder="t('User.Username')"
        :input-props="{ autocomplete: 'username' }"
        @keyup.enter="loginAsBasic"
      />
    </NFormItem>

    <NFormItem
      path="password"
      :show-label="false"
      :show-feedback="false"
    >
      <NInput
        v-model:value="formData.password"
        type="password"
        show-password-on="click"
        :placeholder="t('User.Password')"
        :maxlength="16"
        :input-props="{ autocomplete: 'current-password' }"
        @keyup.enter="loginAsBasic"
      />
    </NFormItem>

    <div class="text-grey-300 flex items-center justify-between text-xs font-light">
      <NCheckbox
        v-model:checked="rememberPassword"
        size="small"
        class="!text-xs"
      >
        {{ t('Common.RememberPassword') }}
      </NCheckbox>
      <div
        v-if="false"
        class="cursor-pointer hover:text-blue-600"
        @click="forgetPassword"
      >
        {{ t('Common.ForgetPassword') }}
      </div>
    </div>

    <div class="flex w-full flex-1 items-center space-x-2">
      <NButton
        class="!w-[calc(50%-4px)]"
        type="primary"
        :disabled="submitLoading"
        :loading="submitType === 'BASIC' && submitLoading"
        @click="loginAsBasic"
      >
        {{ t('Menu.Login') }}
      </NButton>
      <NButton
        class="!w-[calc(50%-4px)]"
        secondary
        type="primary"
        :disabled="submitLoading"
        :loading="submitType === 'ADMIN' && submitLoading"
        @click="loginAsAdmin"
      >
        {{ t('Login.AsAdmin') }}
      </NButton>
    </div>

    <div class="flex items-center space-x-1 text-xs">
      <span>{{ t('Login.NeedAccount') }}</span>
      <NButton
        type="primary"
        text
        @click="() => router.push('/signup')"
      >
        <span class="text-xs font-semibold underline-offset-4 hover:underline">
          {{ t('Menu.Signup') }}
        </span>
      </NButton>
    </div>

    <NDivider>
      <span class="text-xs">{{ t('Login.ThirdPartyLogin') }}</span>
    </NDivider>

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
  </NForm>
</template>

<style scoped lang="scss">
:deep(.n-checkbox__label) {
  padding: 0 6px;
}
</style>
