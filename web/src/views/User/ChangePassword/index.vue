<script setup lang="ts">
import type { Lang, MessageSchema } from '@/types'

const router = useRouter()
const userStore = useUserStore()
const { t } = useI18n<{ message: MessageSchema }, Lang>({
  useScope: 'global'
})
const message = useMessage()
const [submitLoading, submitLoadingDispatcher] = useLoading(false)

const changePasswordRef = ref<FormInst | null>(null)
const changePasswordData = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const changePasswordRules: FormRules = {
  oldPassword: [
    {
      required: true,
      message: t('Validation.OldPassword'),
      trigger: ['blur', 'input']
    }
  ],
  newPassword: [
    {
      required: true,
      message: t('Validation.Password'),
      trigger: ['blur', 'input']
    },
    {
      validator: (_: FormItemRule, value: string) => value.length >= 6,
      trigger: ['blur', 'input'],
      message: t('Validation.PasswordLength')
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: t('Common.ConfirmPassword'),
      trigger: ['blur', 'input']
    },
    {
      validator: (_: FormItemRule, value: string) =>
        value === changePasswordData.newPassword,
      message: t('Validation.ConfirmPasswordNotMatch')
    }
  ]
}

const logout = () => {
  AuthUtils.clearToken()
  userStore.clearUser()
  router.replace('/login')
  message.success(t('Logout.LoginAgain'))
}

const handleChangePassword = async () => {
  try {
    await changePasswordRef.value!.validate()
  } catch (errors) {
    const errorMessage = (errors as FormValidationError[])[0][0].message
    if (errorMessage) {
      message.error(errorMessage)
    }
    return
  }
  if (submitLoading.value) {
    return
  }

  if (submitLoading.value) {
    return
  }

  submitLoadingDispatcher.loading()

  UserAPI.changePassword(userStore.user.id!, changePasswordData)
    .then((res) => {
      if (res.message) {
        message.success(res.message)
      }
      logout()
    })
    .catch((err) => {
      if (err.message) {
        message.error(err.message)
      }
    })
    .finally(() => {
      submitLoadingDispatcher.loaded()
    })
}
</script>

<template>
  <main class="flex justify-start">
    <NCard
      class="h-fit w-full sm:!w-2/5"
      hoverable
      content-style="width: 100%;"
    >
      <NForm
        ref="changePasswordRef"
        :model="changePasswordData"
        :rules="changePasswordRules"
        label-placement="left"
        label-align="right"
        label-width="90"
        require-mark-placement="right-hanging"
      >
        <NFormItem
          path="oldPassword"
          :label="t('Common.OldPassword')"
        >
          <NInput
            v-model:value="changePasswordData.oldPassword"
            type="password"
            :placeholder="t('User.Password')"
            show-password-on="click"
            :input-props="{ autocomplete: 'oldPassword' }"
            @keydown.enter="handleChangePassword"
          />
        </NFormItem>
        <NFormItem
          path="newPassword"
          :label="t('Common.NewPassword')"
          first
        >
          <NInput
            v-model:value="changePasswordData.newPassword"
            type="password"
            :placeholder="t('User.Password')"
            show-password-on="click"
            :input-props="{ autocomplete: 'new-password' }"
            @keydown.enter="handleChangePassword"
          />
        </NFormItem>
        <NFormItem
          path="confirmPassword"
          :label="t('Common.ConfirmPassword')"
        >
          <NInput
            v-model:value="changePasswordData.confirmPassword"
            type="password"
            :placeholder="t('User.Password')"
            show-password-on="click"
            @keydown.enter="handleChangePassword"
          />
        </NFormItem>

        <div class="flex justify-center">
          <NButton
            type="primary"
            class="rounded"
            :disabled="submitLoading"
            :loading="submitLoading"
            @click="() => handleChangePassword()"
          >
            {{ t('Common.Save') }}
          </NButton>
        </div>
      </NForm>
    </NCard>
  </main>
</template>
