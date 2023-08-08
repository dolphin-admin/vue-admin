<script setup lang="ts">
import type { MessageSchema, User } from '@/types'
import UserAvatarIcon from '~icons/carbon/user-avatar-filled-alt'
import CreateIcon from '~icons/ic/sharp-add'
import EditIcon from '~icons/ic/sharp-edit'

export interface Props {
  userFormData?: User
  isEdit: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'save'): void
}>()

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

const editRules: FormRules = {
  name: [
    {
      required: true,
      trigger: ['blur', 'input'],
      message: () => t('Validation.Name'),
      renderMessage: () => t('Validation.Name')
    }
  ],
  firstName: [
    {
      required: true,
      trigger: ['blur', 'input'],
      message: () => t('Validation.FirstName'),
      renderMessage: () => t('Validation.FirstName')
    }
  ],
  lastName: [
    {
      required: true,
      trigger: ['blur', 'input'],
      message: () => t('Validation.LastName'),
      renderMessage: () => t('Validation.LastName')
    }
  ],
  email: [
    {
      key: 'edit',
      trigger: ['blur', 'change'],
      message: () => t('Validation.Email'),
      renderMessage: () => t('Validation.Email')
    },
    {
      pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
      trigger: ['input', 'blur'],
      message: () => t('Validation.EmailFormat'),
      renderMessage: () => t('Validation.EmailFormat')
    }
  ],
  phoneNumber: [
    {
      pattern: /^[1][3456789]\d{9}$/,
      trigger: ['input', 'blur'],
      message: () => t('Validation.PhoneNumberFormat'),
      renderMessage: () => t('Validation.PhoneNumberFormat')
    }
  ]
}

const createRules: FormRules = {
  username: [
    {
      required: true,
      trigger: ['blur', 'input'],
      message: () => t('Validation.Username'),
      renderMessage: () => t('Validation.Username')
    }
  ],
  password: [
    {
      required: true,
      trigger: ['blur', 'input'],
      message: () => t('Validation.Password'),
      renderMessage: () => t('Validation.Password')
    },
    {
      validator: (_: FormItemRule, value: string) => value.length >= 6,
      trigger: ['blur', 'input'],
      message: () => t('Validation.PasswordLength'),
      renderMessage: () => t('Validation.PasswordLength')
    }
  ]
}

const uploadAvatarUrl = (options: { fileList: UploadFileInfo[] }) => {
  const [file] = options.fileList
  currentFile.value = file?.file ?? null
}

const handleSubmit = async () => {
  try {
    await formRef.value!.validate()
  } catch (errors) {
    const errorMessage = (errors as FormValidationError[])[0][0].message
    if (errorMessage) {
      message.error(errorMessage)
    }
    return false
  }

  if (submitLoading.value) {
    return true
  }
  submitLoadingDispatcher.loading()

  if (props.isEdit) {
    uploadRef.value!.submit()
    if (currentFile.value) {
      try {
        const { data, message: resMessage } = await UploadAPI.uploadFile({
          file: currentFile.value
        })
        formData.value.avatarUrl = data.path
        if (resMessage) {
          message.success(resMessage)
        }
      } catch (err) {
        if (err instanceof Error && err.message) {
          message.error(err.message)
        }
        submitLoadingDispatcher.loaded()
        return false
      }
    }
    try {
      const { message: successMessage } = await UserAPI.updateUser(
        formData.value.id!,
        formData.value
      )
      message.success(successMessage!)
      showModal.value = false
      emit('save')
    } catch (err: any) {
      if (err.message) {
        message.error(err.message)
      }
    }
  } else {
    try {
      const { message: successMessage } = await UserAPI.createUser(
        createFormData
      )
      message.success(successMessage!)
      createFormData.username = ''
      createFormData.password = ''
      showModal.value = false
      emit('save')
    } catch (err: any) {
      if (err.message) {
        message.error(err.message)
      }
    }
  }

  submitLoadingDispatcher.loaded()
  return true
}

const handleCancel = () => {
  showModal.value = false
  formData.value = {}
}

/**
 * TODO: 重构
 * 使用参数传递的方式，不要用 defineExpose 暴露方法给父组件
 */
const handleShowModal = () => {
  showModal.value = true
}

watch(
  () => props.userFormData,
  (newValue) => {
    if (newValue) {
      formData.value = {
        ...newValue,
        ...(newValue.birthDate && {
          birthDate: TimeUtils.formatTime(newValue.birthDate, 'YYYY-MM-DD')
        })
      }
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
    preset="dialog"
    :title="
      isEdit ? t('UserManagement.EditUser') : t('UserManagement.CreateUser')
    "
    :loading="submitLoading"
    :positive-text="t('Common.Confirm')"
    :negative-text="t('Common.Cancel')"
    @positive-click="handleSubmit"
    @negative-click="handleCancel"
  >
    <template #icon>
      <NIcon
        size="24"
        :component="isEdit ? EditIcon : CreateIcon"
      />
    </template>

    <NForm
      v-if="isEdit"
      ref="formRef"
      :model="formData"
      :rules="editRules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      class="flex flex-col"
    >
      <NFormItem
        path="avatarUrl"
        :label="t('User.Avatar')"
      >
        <NUpload
          ref="uploadRef"
          full-path
          :max="1"
          list-type="image-card"
          :default-upload="false"
          @change="uploadAvatarUrl"
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
              :component="UserAvatarIcon"
            />
          </template>
        </NUpload>
      </NFormItem>

      <NFormItem
        path="name"
        :label="t('User.Name')"
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
        path="firstName"
        :label="t('User.FirstName')"
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
        path="lastName"
        :label="t('User.LastName')"
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
        path="email"
        :label="t('User.Email')"
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
        path="gender"
        :label="t('User.Gender')"
      >
        <NRadioGroup
          v-model:value="formData.gender"
          :name="t('User.Gender')"
        >
          <NSpace>
            <NRadio :value="1"> {{ t('User.Male') }} </NRadio>
            <NRadio :value="0"> {{ t('User.Female') }} </NRadio>
          </NSpace>
        </NRadioGroup>
      </NFormItem>

      <NFormItem
        path="phoneNumber"
        :label="t('User.PhoneNumber')"
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
        path="birthDate"
        :label="t('User.BirthDate')"
      >
        <NDatePicker
          v-model:formatted-value="formData.birthDate"
          clearable
        />
      </NFormItem>

      <NFormItem
        path="address"
        :label="t('User.Address')"
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
        path="biography"
        :label="t('User.Biography')"
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
      :model="createFormData"
      :rules="createRules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      class="flex flex-col"
    >
      <NFormItem
        path="username"
        :label="t('User.Username')"
      >
        <NInput
          v-model:value="createFormData.username"
          :placeholder="t('Validation.Username')"
          maxlength="20"
          show-count
          clearable
          :input-props="{ autocomplete: 'username' }"
        />
      </NFormItem>

      <NFormItem
        path="password"
        :label="t('User.Password')"
      >
        <NInput
          v-model:value="createFormData.password"
          type="password"
          :placeholder="t('Validation.Password')"
          maxlength="20"
          clearable
          show-password-on="click"
          :input-props="{ autocomplete: 'password' }"
        />
      </NFormItem>
    </NForm>
  </NModal>
</template>
