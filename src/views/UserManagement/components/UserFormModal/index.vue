<script setup lang="ts">
import type { User } from '@/types'

const message = useMessage()
const [submitLoading, submitLoadingDispatcher] = useLoading()

// @ts-ignore
const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const formRef = ref<FormInst | null>(null)
const uploadRef = ref<UploadInst | null>(null)
const formData = ref<User>({})
const createFormData = reactive({
  username: '',
  password: ''
})
const currentFile = ref<File | null>(null)

const rules: FormRules = {
  name: [
    {
      required: true,
      message: t('Common.Validation.Name'),
      trigger: ['blur', 'input']
    }
  ],
  firstName: [
    {
      required: true,
      message: t('Common.Validation.FirstName'),
      trigger: ['blur', 'input']
    }
  ],
  lastName: [
    {
      required: true,
      message: t('Common.Validation.LastName'),
      trigger: ['blur', 'input']
    }
  ],
  email: [
    {
      key: 'edit',
      trigger: ['blur', 'change'],
      message: t('Common.Validation.Email')
    },
    {
      pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
      message: t('Common.Validation.CorrectEmailFormat'),
      trigger: ['input', 'blur']
    }
  ],
  phoneNumber: [
    {
      pattern: /^[1][3456789]\d{9}$/,
      message: t('Common.Validation.CorrectPhoneNumberFormat'),
      trigger: ['input', 'blur']
    }
  ]
}
const createRules: FormRules = {
  username: [
    {
      required: true,
      message: t('Common.Validation.Username'),
      trigger: ['blur', 'input']
    }
  ],
  password: [
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
  ]
}

const showModal = ref(false)

export interface Props {
  userFormData?: User
  isEdit: Boolean
}

const props = defineProps<Props>()

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
      try {
        const { path } = (await UploadAPI.uploadFile({ file: currentFile.value })).data || {}
        formData.value.avatarUrl = FileUtils.getServerFileUrl(path)
      } catch {
        message.error(t('Common.FailedUploadAvatar'))
        return
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
defineExpose({
  handleShowModal
})
</script>

<template>
  <NModal
    v-model:show="showModal"
    class="!my-6"
    :title="isEdit ? t('UserManagement.Edit') : t('UserManagement.CreateUser')"
    preset="dialog"
    :positive-text="t('Common.Confirm')"
    :negative-text="t('Common.Cancer')"
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
        :label="t('Common.Avatar')"
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
          <NAvatar
            :size="80"
            :src="formData.avatarUrl"
          />
        </NUpload>
      </NFormItem>
      <NFormItem
        :label="t('Common.Name')"
        path="name"
      >
        <NInput
          v-model:value="formData.name"
          :placeholder="t('Common.Validation.Name')"
          maxlength="20"
          show-count
          clearable
        />
      </NFormItem>
      <NFormItem
        :label="t('Common.FirstName')"
        path="firstName"
      >
        <NInput
          v-model:value="formData.firstName"
          :placeholder="t('Common.Validation.FirstName')"
          maxlength="20"
          show-count
          clearable
        />
      </NFormItem>
      <NFormItem
        :label="t('Common.LastName')"
        path="lastName"
      >
        <NInput
          v-model:value="formData.lastName"
          :placeholder="t('Common.Validation.LastName')"
          maxlength="10"
          show-count
          clearable
        />
      </NFormItem>
      <NFormItem
        :label="t('Common.Email')"
        path="email"
      >
        <NInput
          v-model:value="formData.email"
          :placeholder="t('Common.Validation.Email')"
          maxlength="20"
          show-count
          clearable
        />
      </NFormItem>
      <NFormItem
        :label="t('Common.Gender')"
        path="gender"
      >
        <NRadioGroup
          v-model:value="formData.gender"
          :name="t('Common.Gender')"
        >
          <NSpace>
            <NRadio :value="0"> {{ t('Common.Female') }} </NRadio>
            <NRadio :value="1"> {{ t('Common.Male') }} </NRadio>
          </NSpace>
        </NRadioGroup>
      </NFormItem>
      <NFormItem
        :label="t('Common.PhoneNumber')"
        path="phoneNumber"
      >
        <NInput
          v-model:value="formData.phoneNumber"
          :placeholder="t('Common.Validation.PhoneNumber')"
          maxlength="20"
          show-count
          clearable
        />
      </NFormItem>
      <NFormItem
        :label="t('Common.BirthDate')"
        path="birthDate"
      >
        <NDatePicker
          v-model:formatted-value="formData.birthDate"
          clearable
        />
      </NFormItem>
      <NFormItem
        :label="t('Common.Address')"
        path="address"
      >
        <NInput
          v-model:value="formData.address"
          :placeholder="t('Common.Validation.Address')"
          maxlength="30"
          show-count
          clearable
        />
      </NFormItem>
      <NFormItem
        :label="t('Common.Biography')"
        path="biography"
      >
        <NInput
          v-model:value="formData.biography"
          :placeholder="t('Common.Validation.Biography')"
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
        :label="t('Common.Username')"
        path="username"
      >
        <NInput
          v-model:value="createFormData.username"
          :placeholder="t('Common.Validation.Username')"
          maxlength="20"
          show-count
          clearable
        />
      </NFormItem>
      <NFormItem
        :label="t('Common.Password')"
        path="password"
      >
        <NInput
          v-model:value="createFormData.password"
          :placeholder="t('Common.Validation.Password')"
          maxlength="20"
          show-count
          clearable
          type="password"
        />
      </NFormItem>
    </NForm>
    <template #action>
      <div class="space-x-2">
        <NButton
          size="small"
          @click="cancelCallback"
          >{{ t('Common.Cancer') }}</NButton
        >
        <NButton
          size="small"
          type="success"
          @click="submitCallback"
          >{{ t('Common.Confirm') }}</NButton
        >
      </div>
    </template>
  </NModal>
</template>
