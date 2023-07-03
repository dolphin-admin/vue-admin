<script setup lang="ts">
import type { FormInst, FormRules, UploadFileInfo, UploadInst } from 'naive-ui'

import { UploadApi, UserApi } from '@/api'
import { useLoading } from '@/hooks'
import type { User } from '@/types'
import { getServerFileUrl } from '@/utils'

const message = useMessage()
const [submitLoading, submitLoadingDispatcher] = useLoading()

const formRef = ref<FormInst | null>(null)
const uploadRef = ref<UploadInst | null>(null)
const formData = ref<User>({})
const currentFile = ref<File | null>(null)

const rules: FormRules = {
  name: [
    {
      required: true,
      message: '请输入用户名字',
      trigger: ['blur', 'input']
    }
  ],
  firstName: [
    {
      required: true,
      message: '请输入名字',
      trigger: ['blur', 'input']
    }
  ],
  lastName: [
    {
      required: true,
      message: '请输入姓',
      trigger: ['blur', 'input']
    }
  ],
  email: [
    {
      key: 'edit',
      required: true,
      trigger: ['blur', 'change'],
      message: '请输入邮箱'
    },
    {
      pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
      message: '请输入正确格式的邮箱',
      trigger: ['input', 'blur']
    }
  ],
  phoneNumber: [
    {
      pattern: /^[1][3456789]\d{9}$/,
      message: '请输入正确格式的手机号',
      trigger: ['input', 'blur']
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
      formData.value = newValue
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
    try {
      const { path } = (await UploadApi.uploadFile({ file: currentFile.value })).data || {}
      formData.value.avatarUrl = getServerFileUrl(path)
    } catch {
      message.error('头像上传失败')
      return
    }

    try {
      if (props.isEdit) {
        const { message: successMessage } = await UserApi.updateUser(formData.value.id!, formData.value)
        message.success(successMessage!)
        showModal.value = false
      }
    } catch (err: any) {
      message.error(err.message)
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
    :title="isEdit ? '编辑' : '新增'"
    preset="dialog"
    positive-text="确认"
    negative-text="取消"
  >
    <NForm
      ref="formRef"
      :rules="rules"
      :model="formData"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      class="flex flex-col"
    >
      <NFormItem
        label="头像"
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
        label="用户名"
        path="name"
      >
        <NInput
          v-model:value="formData.name"
          placeholder="请输入用户名"
          maxlength="20"
          show-count
          clearable
        />
      </NFormItem>
      <NFormItem
        label="名字"
        path="firstName"
      >
        <NInput
          v-model:value="formData.firstName"
          placeholder="请输入名字"
          maxlength="20"
          show-count
          clearable
        />
      </NFormItem>
      <NFormItem
        label="姓"
        path="lastName"
      >
        <NInput
          v-model:value="formData.lastName"
          placeholder="请输入姓"
          maxlength="10"
          show-count
          clearable
        />
      </NFormItem>
      <NFormItem
        label="邮箱"
        path="email"
      >
        <NInput
          v-model:value="formData.email"
          placeholder="请输入邮箱"
          maxlength="20"
          show-count
          clearable
        />
      </NFormItem>
      <NFormItem
        label="性别"
        path="gender"
      >
        <NRadioGroup
          v-model:value="formData.gender"
          name="性别"
        >
          <NSpace>
            <NRadio :value="0"> 女 </NRadio>
            <NRadio :value="1"> 男 </NRadio>
          </NSpace>
        </NRadioGroup>
      </NFormItem>
      <NFormItem
        label="电话号码"
        path="phoneNumber"
      >
        <NInput
          v-model:value="formData.phoneNumber"
          placeholder="请输入电话号码"
          maxlength="20"
          show-count
          clearable
        />
      </NFormItem>
      <NFormItem
        label="出生日期"
        path="birthDate"
      >
        <NInput
          v-model:value="formData.birthDate"
          placeholder="请输入出生日期"
        />
      </NFormItem>
      <NFormItem
        label="地址"
        path="address"
      >
        <NInput
          v-model:value="formData.address"
          placeholder="请输入地址"
          maxlength="30"
          show-count
          clearable
        />
      </NFormItem>
      <NFormItem
        label="简介"
        path="biography"
      >
        <NInput
          v-model:value="formData.biography"
          placeholder="请输入简介"
          maxlength="300"
          show-count
          clearable
        />
      </NFormItem>
    </NForm>

    <template #action>
      <div class="space-x-2">
        <NButton
          size="small"
          @click="cancelCallback"
          >取消</NButton
        >
        <NButton
          size="small"
          type="success"
          @click="submitCallback"
          >确认</NButton
        >
      </div>
    </template>
  </NModal>
</template>
