<script setup lang="ts">
import type { FormInst, FormItemInst, FormItemRule, FormRules } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { reactive, ref } from 'vue'

import { SignupApi } from '@/api'
import { siteMetaData } from '@/constants'
import { useLoading } from '@/hooks'
import { setToken } from '@/utils'

const { appName, version } = siteMetaData

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

const validateConfirmPassword = (rules: FormItemRule, value: string) => value === formData.password

const rules: FormRules = {
  username: [
    {
      required: true,
      message: '请输入用户名'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码'
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur']
    },
    {
      validator: validateConfirmPassword,
      message: '两次密码输入不一致',
      trigger: 'input'
    }
  ]
}

const signup = () => {
  formRef.value!.validate((errors) => {
    console.log(errors)
    if (errors) {
      message.success('注册失败')
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

    <div class="flex w-full items-center justify-center bg-blue-300 sm:w-1/2">
      <n-form
        ref="formRef"
        v-model:value="formData"
        :rules="rules"
        class="flex w-[340px] max-w-[85%] flex-col space-y-4 rounded-lg bg-blue-400 p-6"
      >
        <div class="text-center text-lg font-semibold text-white">注册</div>
        <n-input
          v-model:value="formData.username"
          type="text"
          placeholder="请输入用户名"
          :input-props="{ autocomplete: 'username' }"
          @keydown.enter="() => signup()"
        />
        <n-input
          v-model:value="formData.password"
          type="password"
          placeholder="请输入密码"
          show-password-on="mousedown"
          :input-props="{ autocomplete: 'new-password' }"
          @keydown.enter="() => signup()"
        />
        <n-input
          ref="passwordFormItemRef"
          v-model:value="formData.confirmPassword"
          type="password"
          placeholder="请再次输入密码"
          show-password-on="mousedown"
          :input-props="{ autocomplete: 'new-password' }"
          @keydown.enter="() => signup()"
        />
        <n-button
          :disabled="submitLoading"
          :loading="submitLoading"
          type="primary"
          @click="() => signup()"
        >
          注册
        </n-button>
      </n-form>
    </div>
  </main>
</template>
