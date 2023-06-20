<script setup lang="ts">
import { LoginApi } from '@/api'
import { setToken } from '@/utils'

type RememberedAccountData = {
  username: string
  password: string
}

const REMEMBERED_ACCOUNT_DATA_KEY = 'user_password'

const router = useRouter()
const message = useMessage()

const formData = reactive({
  username: '',
  password: ''
})
const rememberPassword = ref(false)

const validateFormData = () => {
  if (!formData.username?.trim()) {
    message.error('请输入账号')
    return false
  }
  if (!formData.password?.trim()) {
    message.error('请输入密码')
    return false
  }
  return true
}

const login = () => {
  if (!validateFormData()) {
    return
  }
  LoginApi.login(formData)
    .then((res) => {
      const { accessToken } = res.data || {}
      setToken(accessToken)
      message.success('登录成功')
      if (rememberPassword.value) {
        localStorage.setItem(REMEMBERED_ACCOUNT_DATA_KEY, JSON.stringify(formData))
      } else {
        localStorage.removeItem(REMEMBERED_ACCOUNT_DATA_KEY)
      }
      router.push('/')
    })
    .catch(() => {
      message.error('登录失败')
    })
    .finally(() => {
      formData.password = ''
    })
}

const loginAsBasic = () => login()

const loginAsAdmin = () => {
  formData.username = 'Admin'
  formData.password = '123456'
  login()
}

const forgotPassword = () => {}

onMounted(() => {
  const localStorageData = localStorage.getItem(REMEMBERED_ACCOUNT_DATA_KEY)
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
  <form
    class="absolute inset-0 m-auto flex h-fit w-[340px] max-w-[85%] flex-col space-y-4 rounded-lg bg-white px-4 py-8 shadow-md sm:w-[260px] md:w-[340px]"
  >
    <div class="text-center text-lg font-semibold text-gray-600">登录</div>
    <n-input
      v-model:value="formData.username"
      type="text"
      placeholder="账号"
      :input-props="{ autocomplete: 'username' }"
      @keyup.enter="() => loginAsBasic()"
    />
    <n-input
      v-model:value="formData.password"
      type="password"
      show-password-on="mousedown"
      placeholder="密码"
      :maxlength="16"
      :input-props="{ autocomplete: 'current-password' }"
      @keyup.enter="() => loginAsBasic()"
    />

    <div class="text-grey-300 flex items-center justify-between text-xs font-light">
      <n-checkbox
        v-model:checked="rememberPassword"
        size="small"
        class="!text-xs"
      >
        记住密码
      </n-checkbox>
      <div
        class="cursor-pointer hover:text-blue-600"
        @click="forgotPassword"
      >
        忘记密码
      </div>
    </div>

    <n-button
      type="primary"
      @click="() => loginAsBasic()"
    >
      登录
    </n-button>
    <n-button
      type="info"
      @click="() => loginAsAdmin()"
    >
      以管理员登录
    </n-button>
    <n-button
      text
      size="tiny"
      @click="() => router.push('/signup')"
    >
      注册
    </n-button>
  </form>
</template>

<style scoped lang="scss">
:deep(.n-checkbox__label) {
  padding: 0 6px;
}
</style>
