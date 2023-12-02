<script setup lang="ts">
import type { Lang } from '@dolphin-admin/utils'

import type { MessageSchema } from '@/types'

const router = useRouter()
const userStore = useUserStore()
const { t } = useI18n<{ message: MessageSchema }, Lang>({})
const NMessage = useMessage()
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
      message: t('TEMP.Validation.OldPassword'),
      trigger: ['blur', 'input']
    }
  ],
  newPassword: [
    {
      required: true,
      message: t('TEMP.Validation.Password'),
      trigger: ['blur', 'input']
    },
    {
      validator: (_: FormItemRule, value: string) => value.length >= 6,
      trigger: ['blur', 'input'],
      message: t('TEMP.Validation.PasswordLength')
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: t('COMMON.ConfirmPassword'),
      trigger: ['blur', 'input']
    },
    {
      validator: (_: FormItemRule, value: string) => value === changePasswordData.newPassword,
      message: t('TEMP.Validation.ConfirmPasswordNotMatch')
    }
  ]
}

const logout = () =>
  router.replace('/login').then(() => {
    NMessage.success(t('TEMP.Logout.LoginAgain'))
    userStore.clearUser()
    AuthUtils.clearAccessToken()
    AuthUtils.clearRefreshToken()
  })

const handleChangePassword = async () => {
  try {
    await changePasswordRef.value!.validate()
  } catch (errors) {
    const errorMessage = (errors as FormValidationError[])[0][0].message
    if (errorMessage) {
      NMessage.error(errorMessage)
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
        NMessage.success(res.message)
      }
      logout()
    })
    .catch((err) => {
      if (err.message) {
        NMessage.error(err.message)
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
          :label="t('COMMON.OldPassword')"
        >
          <NInput
            v-model:value="changePasswordData.oldPassword"
            type="password"
            :placeholder="t('TEMP.User.Password')"
            show-password-on="click"
            :input-props="{ autocomplete: 'oldPassword' }"
            @keydown.enter="handleChangePassword"
          />
        </NFormItem>
        <NFormItem
          path="newPassword"
          :label="t('COMMON.NewPassword')"
          first
        >
          <NInput
            v-model:value="changePasswordData.newPassword"
            type="password"
            :placeholder="t('TEMP.User.Password')"
            show-password-on="click"
            :input-props="{ autocomplete: 'new-password' }"
            @keydown.enter="handleChangePassword"
          />
        </NFormItem>
        <NFormItem
          path="confirmPassword"
          :label="t('COMMON.ConfirmPassword')"
        >
          <NInput
            v-model:value="changePasswordData.confirmPassword"
            type="password"
            :placeholder="t('TEMP.User.Password')"
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
            {{ t('COMMON.Save') }}
          </NButton>
        </div>
      </NForm>
    </NCard>
  </main>
</template>
