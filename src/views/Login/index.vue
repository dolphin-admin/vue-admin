<script setup lang="ts">
import { LoginApi } from '@/api'
import { siteMetaData } from '@/constants'
import { setToken } from '@/utils'

const { appName, version } = siteMetaData

const router = useRouter()
const message = useMessage()

const username = localStorage.getItem('username')
const password = localStorage.getItem('password')
console.log(username, password)
const formData = reactive({
  username: username || '',
  password: password || ''
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
        localStorage.setItem('username', formData.username)
        localStorage.setItem('password', formData.password)
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
</script>

<template>
  <main class="flex h-screen w-screen">
    <div class="invisible relative w-0 bg-blue-200 sm:visible sm:w-1/2">
      <div class="absolute inset-0 m-auto flex h-fit w-fit select-none flex-col space-y-2 text-center font-mono">
        <img
          src="@/assets/images/favicon.png"
          alt=""
          width="180"
          height="180"
        />
        <span class="text-xl font-semibold">{{ appName }}</span>
        <span class="text-base">v{{ version }}</span>
      </div>
    </div>

    <div class="relative w-full bg-blue-300 sm:w-1/2">
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
            class="text-xs"
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
          @click="$router.push('/signup')"
          >注册</n-button
        >
      </form>
    </div>
  </main>
</template>
