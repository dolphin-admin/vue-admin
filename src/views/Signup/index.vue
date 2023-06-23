<script setup lang="ts">
import type { FormInst, FormItemInst, FormItemRule, FormRules } from 'naive-ui'

import { SignupApi } from '@/api'
import { useLoading } from '@/hooks'
import { setToken } from '@/utils'

const router = useRouter()
const message = useMessage()
const [submitLoading, submitLoadingDispatcher] = useLoading(false)

const formData = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})
const formRef = ref<FormInst | null>(null)
const passwordFormItemRef = ref<FormItemInst | null>(null)

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
  ],
  confirmPassword: [
    {
      required: true,
      message: '请输入确认密码',
      trigger: ['blur', 'input']
    },
    {
      validator: (rule: FormItemRule, value: string) => value === formData.password,
      message: '两次密码输入不一致'
    }
  ]
}

const signup = () => {
  formRef.value!.validate((errors) => {
    if (errors) {
      message.error(errors[0][0].message!)
      return
    }

    if (submitLoading.value) {
      return
    }

    submitLoadingDispatcher.loading()

    SignupApi.signup(formData)
      .then((res) => {
        const { accessToken } = res.data || {}
        setToken(accessToken)
        message.success('注册成功')
        router.push('/')
      })
      .catch(() => {
        message.error('注册失败')
        submitLoadingDispatcher.loaded()
      })
      .finally(() => {
        formData.password = ''
        formData.confirmPassword = ''
      })
  })
}
</script>

<template>
  <NForm
    ref="formRef"
    :rules="rules"
    :model="formData"
    class="absolute inset-0 m-auto flex h-fit w-[340px] max-w-[85%] flex-col space-y-4 rounded-lg bg-white px-4 py-8 shadow-md sm:w-[260px] md:w-[340px]"
  >
    <div class="select-none text-center text-lg font-semibold text-gray-600">注册</div>

    <NFormItem
      path="username"
      :show-label="false"
      :show-feedback="false"
    >
      <NInput
        v-model:value="formData.username"
        type="text"
        placeholder="请输入用户名"
        :input-props="{ autocomplete: 'username' }"
        @keydown.enter="() => signup()"
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
        placeholder="请输入密码"
        show-password-on="click"
        :input-props="{ autocomplete: 'new-password' }"
        @keydown.enter="() => signup()"
      />
    </NFormItem>

    <NFormItem
      path="confirmPassword"
      :show-label="false"
      :show-feedback="false"
    >
      <NInput
        ref="passwordFormItemRef"
        v-model:value="formData.confirmPassword"
        type="password"
        placeholder="请再次输入密码"
        show-password-on="click"
        :input-props="{ autocomplete: 'new-password' }"
        @keydown.enter="() => signup()"
      />
    </NFormItem>

    <NButton
      type="primary"
      :disabled="submitLoading"
      :loading="submitLoading"
      @click="() => signup()"
    >
      注册
    </NButton>

    <NButton
      class="w-100"
      text
      size="tiny"
      @click="() => router.push('/login')"
    >
      切换至登录
    </NButton>
  </NForm>
</template>
