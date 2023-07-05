<script setup lang="ts">
const router = useRouter()
const userStore = useUserStore()
const message = useMessage()
// @ts-ignore
const { t } = useI18n<{ message: MessageSchema }, Lang>({ useScope: 'global' })
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
      message: t('Common.Validation.OldPassword'),
      trigger: ['blur', 'input']
    }
  ],
  newPassword: [
    {
      required: true,
      message: t('Common.Validation.Password'),
      trigger: ['blur', 'input']
    },
    {
      validator: (rule: FormItemRule, value: string) => value.length >= 6,
      trigger: ['blur', 'input'],
      message: t('Common.Validation.PasswordLength')
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: t('Common.Validation.ConfirmPassword'),
      trigger: ['blur', 'input']
    },
    {
      validator: (rule: FormItemRule, value: string) => value === changePasswordData.newPassword,
      message: t('Common.Validation.ConfirmPasswordNotMatch')
    }
  ]
}

const logout = () => {
  AuthUtils.clearToken()
  // LangUtils.clearLang()
  ThemeUtils.clearTheme()
  userStore.clearUser()
  router.replace('/login')
  message.success(t('Logout.LoginAgain'))
}

const handleChangePassword = () => {
  changePasswordRef.value!.validate((errors) => {
    if (errors) {
      message.error(errors[0][0].message!)
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
        message.error(err.message)
      })
      .finally(() => {
        submitLoadingDispatcher.loaded()
      })
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
        label-placement="left"
        label-align="right"
        :label-width="80"
        :model="changePasswordData"
        :rules="changePasswordRules"
      >
        <NFormItem
          path="oldPassword"
          :label="t('Common.OldPassword')"
        >
          <NInput
            v-model:value="changePasswordData.oldPassword"
            type="password"
            :placeholder="t('Common.Password')"
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
            :placeholder="t('Common.Password')"
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
            :placeholder="t('Common.Password')"
            show-password-on="click"
            @keydown.enter="handleChangePassword"
          />
        </NFormItem>

        <NButton
          type="primary"
          class="rounded"
          :disabled="submitLoading"
          :loading="submitLoading"
          @click="() => handleChangePassword()"
        >
          {{ t('Common.Save') }}
        </NButton>
      </NForm>
    </NCard>
  </main>
</template>
