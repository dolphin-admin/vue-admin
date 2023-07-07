<script setup lang="ts">
import type { MessageSchema, User } from '@/types'
import UserAvatarIcon from '~icons/carbon/user-avatar-filled-alt'

export interface Props {
  userFormData?: User
  isEdit: Boolean
}

const props = defineProps<Props>()

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })
const message = useMessage()
const [submitLoading, submitLoadingDispatcher] = useLoading()

const formRef = ref<FormInst | null>(null)
const uploadRef = ref<UploadInst | null>(null)
const formData = ref<User>({})
const createFormData = reactive({
  username: '',
  password: ''
})
const currentFile = ref<File | null>(null)
const showModal = ref(false)

const rules: FormRules = {
  name: [
    {
      required: true,
      message: t('Validation.Name'),
      trigger: ['blur', 'input']
    }
  ],
  firstName: [
    {
      required: true,
      message: t('Validation.FirstName'),
      trigger: ['blur', 'input']
    }
  ],
  lastName: [
    {
      required: true,
      message: t('Validation.LastName'),
      trigger: ['blur', 'input']
    }
  ],
  email: [
    {
      key: 'edit',
      trigger: ['blur', 'change'],
      message: t('Validation.Email')
    },
    {
      pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
      message: t('Validation.EmailFormat'),
      trigger: ['input', 'blur']
    }
  ],
  phoneNumber: [
    {
      pattern: /^[1][3456789]\d{9}$/,
      message: t('Validation.PhoneNumberFormat'),
      trigger: ['input', 'blur']
    }
  ]
}
const createRules: FormRules = {
  username: [
    {
      required: true,
      message: t('Validation.Username'),
      trigger: ['blur', 'input']
    }
  ],
  password: [
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
  ]
}

const UploadAvatarUrl = (options: { fileList: UploadFileInfo[] }) => {
  const [file] = options.fileList
  currentFile.value = file.file ?? null
}

const submitCallback = () => {
  showModal.value = true
  formRef.value?.validate(async (errors) => {
    if (errors) {
      message.error(errors[0][0].message!)
      return
    }
    if (submitLoading.value) {
      return
    }
    submitLoadingDispatcher.loading()

    uploadRef.value?.submit()

    if (props.isEdit) {
      if (!formData.value.avatarUrl) {
        try {
          const { path } = (await UploadAPI.uploadFile({ file: currentFile.value })).data || {}
          formData.value.avatarUrl = FileUtils.getServerFileUrl(path)
          message.success(t('Message.UploadAvatar.Success'))
        } catch {
          message.error(t('Message.UploadAvatar.Failed'))
          return
        }
      }
      try {
        const { message: successMessage } = await UserAPI.updateUser(formData.value.id!, formData.value)
        message.success(successMessage!)
        showModal.value = false
      } catch (err: any) {
        message.error(err.message)
      }
    } else {
      try {
        const { message: successMessage } = await UserAPI.createUser(createFormData)
        message.success(successMessage!)
        createFormData.username = ''
        createFormData.password = ''
        showModal.value = false
      } catch (err: any) {
        message.error(err.message)
      }
    }

    submitLoadingDispatcher.loaded()
  })
}

const cancelCallback = () => {
  showModal.value = false
  formData.value = {}
}

const handleShowModal = () => {
  showModal.value = true
}

watch(
  () => props.userFormData,
  (newValue) => {
    if (newValue) {
      const newBirthDate = newValue.birthDate && TimeUtils.formatTime(newValue.birthDate, 'YYYY-MM-DD')
      formData.value = newValue
      formData.value.birthDate = newBirthDate
    } else {
      formData.value = {}
    }
  },
  { immediate: true }
)

defineExpose({
  handleShowModal
})
</script>

<template>
  <NModal
    v-model:show="showModal"
    class="!my-6"
    :title="isEdit ? t('UserManagement.EditUser') : t('UserManagement.CreateUser')"
    preset="dialog"
    :positive-text="t('Common.Confirm')"
    :negative-text="t('Common.Cancel')"
  >
    <NForm
      v-if="isEdit"
      ref="formRef"
      :rules="rules"
      :model="formData"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      class="flex flex-col"
    >
      <NFormItem
        :label="t('User.Avatar')"
        path="avatarUrl"
      >
        <NUpload
          ref="uploadRef"
          full-path
          :max="1"
          list-type="image-card"
          :default-upload="false"
          @change="UploadAvatarUrl"
        >
          <template v-if="formData.avatarUrl">
            <NAvatar
              :size="80"
              :src="formData.avatarUrl"
            />
          </template>
          <template v-else>
            <NIcon
              size="80"
              depth="3"
            >
              <UserAvatarIcon />
            </NIcon>
          </template>
        </NUpload>
      </NFormItem>
      <NFormItem
        :label="t('User.Name')"
        path="name"
      >
        <NInput
          v-model:value="formData.name"
          :placeholder="t('Validation.Name')"
          maxlength="20"
          show-count
          clearable
        />
      </NFormItem>
      <NFormItem
        :label="t('User.FirstName')"
        path="firstName"
      >
        <NInput
          v-model:value="formData.firstName"
          :placeholder="t('Validation.FirstName')"
          maxlength="20"
          show-count
          clearable
        />
      </NFormItem>
      <NFormItem
        :label="t('User.LastName')"
        path="lastName"
      >
        <NInput
          v-model:value="formData.lastName"
          :placeholder="t('Validation.LastName')"
          maxlength="10"
          show-count
          clearable
        />
      </NFormItem>
      <NFormItem
        :label="t('User.Email')"
        path="email"
      >
        <NInput
          v-model:value="formData.email"
          :placeholder="t('Validation.Email')"
          maxlength="20"
          show-count
          clearable
        />
      </NFormItem>
      <NFormItem
        :label="t('User.Gender')"
        path="gender"
      >
        <NRadioGroup
          v-model:value="formData.gender"
          :name="t('User.Gender')"
        >
          <NSpace>
            <NRadio :value="0"> {{ t('User.Female') }} </NRadio>
            <NRadio :value="1"> {{ t('User.Male') }} </NRadio>
          </NSpace>
        </NRadioGroup>
      </NFormItem>
      <NFormItem
        :label="t('User.PhoneNumber')"
        path="phoneNumber"
      >
        <NInput
          v-model:value="formData.phoneNumber"
          :placeholder="t('Validation.PhoneNumber')"
          maxlength="20"
          show-count
          clearable
        />
      </NFormItem>
      <NFormItem
        :label="t('User.BirthDate')"
        path="birthDate"
      >
        <NDatePicker
          v-model:formatted-value="formData.birthDate"
          clearable
        />
      </NFormItem>
      <NFormItem
        :label="t('User.Address')"
        path="address"
      >
        <NInput
          v-model:value="formData.address"
          :placeholder="t('Validation.Address')"
          maxlength="30"
          show-count
          clearable
        />
      </NFormItem>
      <NFormItem
        :label="t('User.Biography')"
        path="biography"
      >
        <NInput
          v-model:value="formData.biography"
          :placeholder="t('Validation.Biography')"
          maxlength="300"
          show-count
          clearable
        />
      </NFormItem>
    </NForm>

    <NForm
      v-else
      ref="formRef"
      :rules="createRules"
      :model="createFormData"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      class="flex flex-col"
    >
      <NFormItem
        :label="t('User.Username')"
        path="username"
      >
        <NInput
          v-model:value="createFormData.username"
          :placeholder="t('Validation.Username')"
          maxlength="20"
          show-count
          clearable
        />
      </NFormItem>
      <NFormItem
        :label="t('User.Password')"
        path="password"
      >
        <NInput
          v-model:value="createFormData.password"
          type="password"
          :placeholder="t('Validation.Password')"
          maxlength="20"
          clearable
          show-password-on="click"
          :input-props="{ autocomplete: 'new-password' }"
        />
      </NFormItem>
    </NForm>
    <template #action>
      <div class="space-x-2">
        <NButton
          size="small"
          @click="cancelCallback"
        >
          {{ t('Common.Cancel') }}
        </NButton>
        <NButton
          size="small"
          type="primary"
          @click="submitCallback"
        >
          {{ t('Common.Confirm') }}
        </NButton>
      </div>
    </template>
  </NModal>
</template>
