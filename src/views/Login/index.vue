<script setup lang="ts">
import type { FormInst, FormItemRule, FormRules } from 'naive-ui'

import { LoginApi } from '@/api'
import { useLoading } from '@/hooks'
import { setToken } from '@/utils'

type RememberedAccountData = {
  username: string
  password: string
}

const REMEMBERED_ACCOUNT_DATA_KEY = 'user_password'

const router = useRouter()
const message = useMessage()
const [submitLoading, submitLoadingDispatcher] = useLoading(false)
const submitType = ref<'BASIC' | 'ADMIN'>('BASIC')

const formData = reactive({
  username: '',
  password: ''
})
const formRef = ref<FormInst | null>(null)
const rememberPassword = ref(false)

const rules: FormRules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: ['blur', 'input']
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: ['blur', 'input']
    },
    {
      validator: (rule: FormItemRule, value: string) => value.length >= 6,
      trigger: ['blur', 'input'],
      message: '密码长度至少为6位'
    }
  ]
}

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
        submitLoadingDispatcher.loaded()
      })
      .finally(() => {
        formData.password = ''
      })
  })
}

const loginAsBasic = () => {
  submitType.value = 'BASIC'
  login()
}

const loginAsAdmin = () => {
  submitType.value = 'ADMIN'
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
  <NForm
    ref="formRef"
    :rules="rules"
    :model="formData"
    class="absolute inset-0 m-auto flex h-fit w-[340px] max-w-[85%] flex-col space-y-4 rounded-lg bg-white px-4 py-8 shadow-md sm:w-[260px] md:w-[340px]"
  >
    <div class="select-none text-center text-lg font-semibold text-gray-600">登录</div>

    <NFormItem
      path="username"
      :show-label="false"
      :show-feedback="false"
    >
      <NInput
        v-model:value="formData.username"
        type="text"
        placeholder="账号"
        :input-props="{ autocomplete: 'username' }"
        @keyup.enter="() => loginAsBasic()"
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
        show-password-on="mousedown"
        placeholder="密码"
        :maxlength="16"
        :input-props="{ autocomplete: 'current-password' }"
        @keyup.enter="() => loginAsBasic()"
      />
    </NFormItem>

    <div class="text-grey-300 flex items-center justify-between text-xs font-light">
      <NCheckbox
        v-model:checked="rememberPassword"
        size="small"
        class="!text-xs"
      >
        记住密码
      </NCheckbox>
      <div
        class="cursor-pointer hover:text-blue-600"
        @click="forgotPassword"
      >
        忘记密码
      </div>
    </div>

    <div class="flex w-full flex-1 items-center space-x-2">
      <NButton
        class="!w-[calc(50%-4px)]"
        type="primary"
        :disabled="submitLoading"
        :loading="submitType === 'BASIC' && submitLoading"
        @click="() => loginAsBasic()"
      >
        登录
      </NButton>
      <NButton
        class="!w-[calc(50%-4px)]"
        type="info"
        :disabled="submitLoading"
        :loading="submitType === 'ADMIN' && submitLoading"
        @click="() => loginAsAdmin()"
      >
        以管理员登录
      </NButton>
    </div>

    <NButton
      text
      size="tiny"
      @click="() => router.push('/signup')"
    >
      切换至注册
    </NButton>
  </NForm>
</template>

<style scoped lang="scss">
:deep(.n-checkbox__label) {
  padding: 0 6px;
}
</style>
