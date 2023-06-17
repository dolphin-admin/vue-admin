<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useMessage, FormRules, FormItemRule, FormItemInst, FormInst } from 'naive-ui'
// import { SignupApi } from '@/api'
// import { siteMetaData } from '@/constants'
// import { setToken } from '@/utils'
// const router = useRouter()
const message = useMessage()
const formRef = ref<FormInst | null>(null)
const rPasswordFormItemRef = ref<FormItemInst | null>(null)
// const { appName, version } = siteMetaData
const formData = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

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
      validator: validatePasswordSame,
      message: '两次密码输入不一致',
      trigger: 'input'
    }
  ]
}
function validatePasswordSame(rule: FormItemRule, value: string): boolean {
  return value === formData.password
}

const signup = () => {
  formRef.value?.validate((errors) => {
    if (errors) {
      message.success('注册失败')
      return
    }
    // SignupApi.signup(formData.username.trim(), formData.password.trim(), formData.confirmPassword.trim())
    //   .then((res) => {
    //     const { accessToken } = res.data || {}
    //     setToken(accessToken)
    //     message.success('注册成功')
    //     router.push('/login')
    //   })
    //   .catch(() => {
    //     message.error('注册失败')
    //   })
    //   .finally(() => {
    //     formData.password = ''
    //     formData.confirmPassword = ''
    //   })
  })
}
</script>

<template>
  <main class="flex h-screen w-screen">
    <div class="bg-blue-200 w-min-0 sm:w-1/2 flex justify-center items-center">
      <div class="  ">
        <!-- <img
          src="@/assets/images/favicon.png"
          alt=""
          class="w-20 h-20"
        /> -->
      </div>
    </div>
    <div class="bg-blue-300 w-full sm:w-1/2 flex justify-center items-center">
      <n-form
        :rules="rules"
        ref="formRef"
        v-model:value="formData"
        class="bg-white w-200 rounded-md px-6 py-6 flex flex-col"
      >
        <div class="text-lg text-center mb-5">注册</div>

        <n-input
          class="mb-5"
          v-model:value="formData.username"
          @keydown.enter.prevent
          placeholder="请输入用户名"
        />

        <n-input
          class="mb-5"
          v-model:value="formData.password"
          type="password"
          @keydown.enter.prevent
          placeholder="请输入密码"
          show-password-on="mousedown"
        />

        <n-input
          class="mb-5"
          ref="rPasswordFormItemRef"
          v-model:value="formData.confirmPassword"
          type="password"
          @keydown.enter.prevent
          placeholder="请再次输入密码"
          show-password-on="mousedown"
        />

        <n-button
          :disabled="formData.username === null"
          round
          type="primary"
          @click="() => signup()"
        >
          注册
        </n-button>
      </n-form>
    </div>
  </main>
</template>
