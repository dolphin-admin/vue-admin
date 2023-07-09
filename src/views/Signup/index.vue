<script setup lang="ts">
import type { MessageSchema } from '@/types'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

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
  ],
  confirmPassword: [
    {
      required: true,
      trigger: ['blur', 'input'],
      renderMessage: () => t('Validation.ConfirmPassword')
    },
    {
      validator: (_: FormItemRule, value: string) => value === formData.password,
      renderMessage: () => t('Validation.ConfirmPasswordNotMatch')
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

    AuthAPI.signup(formData)
      .then((res) => {
        const { accessToken } = res.data || {}
        AuthUtils.setToken(accessToken)
        message.success(t('Signup.Success'))
        router.replace('/')
      })
      .catch((err) => {
        message.error(err.message ?? t('Signup.Failed'))
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
    class="absolute inset-0 m-auto flex h-fit w-[340px] max-w-[85%] flex-col space-y-4 rounded-lg bg-light-default px-4 py-8 shadow-md transition-colors dark:bg-dark-default sm:w-[260px] md:w-[340px]"
  >
    <div class="select-none text-center text-lg font-semibold">{{ t('Menu.Signup') }}</div>

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
        :placeholder="t('User.Password')"
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
        :placeholder="t('Common.ConfirmPassword')"
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
      {{ t('Menu.Signup') }}
    </NButton>

    <div class="flex items-center space-x-1 text-xs">
      <span>{{ t('Signup.AlreadyHaveAccount') }}</span>
      <NButton
        type="primary"
        text
        @click="() => router.push('/login')"
      >
        <span class="text-xs font-semibold underline-offset-4 hover:underline">
          {{ t('Menu.Login') }}
        </span>
      </NButton>
    </div>
  </NForm>
</template>
