<script setup lang="ts">
import type { FormInst, FormRules, UploadFileInfo, UploadInst } from 'naive-ui'

import { UploadApi, UserApi } from '@/api'
import { useLoading } from '@/hooks'
import { useUserStore } from '@/store'
import type { User } from '@/types'
import { getServerFileUrl } from '@/utils'
import NameIcon from '~icons/mdi/account-outline'
import BirthDateIcon from '~icons/mdi/bookmark-minus-outline'
import EmailIcon from '~icons/mdi/email-outline'
import FemaleIcon from '~icons/mdi/gender-female'
import MaleIcon from '~icons/mdi/gender-male'
import PhoneIcon from '~icons/mdi/phone'
import AddressIcon from '~icons/mdi/store-plus-outline'

const userStore = useUserStore()
const message = useMessage()
const [submitLoading, submitLoadingDispatcher] = useLoading()

const formRef = ref<FormInst | null>(null)
const uploadRef = ref<UploadInst | null>(null)
const formData = ref<Partial<User>>({})
const fileListLengthRef = ref({})

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
const computedUserInfo = computed(() => userStore.user)

const handleValidateButtonClick = () => {
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
    await UploadApi.uploadFile(fileListLengthRef.value).then((res) => {
      const { path } = res.data
      formData.value.avatarUrl = getServerFileUrl(path)
    })

    UserApi.updateUser(formData.value.id!, formData.value)
      .then((response) => {
        userStore.setUser(response.data)
        message.success(response.message!)
      })
      .catch((err) => message.error(err.message))
      .finally(() => submitLoadingDispatcher.loaded())
  })
}

const UploadAvatarUrl = (options: { fileList: UploadFileInfo[] }) => {
  const [file] = options.fileList
  fileListLengthRef.value = file
}

onMounted(() =>
  UserApi.getUserInfo().then((res) => {
    userStore.setUser(res.data)
    formData.value = res.data
  })
)
</script>

<template>
  <div class="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 sm:p-4">
    <NCard class="flex w-full flex-row space-y-8 font-medium sm:!w-2/5">
      <div class="flex justify-center">
        <img
          :src="computedUserInfo?.avatarUrl"
          class="h-16 w-16 rounded-full"
        />
      </div>
      <div class="flex items-center justify-center text-xl">
        {{ computedUserInfo?.username }}
        <template v-if="computedUserInfo?.gender">
          <component
            :is="computedUserInfo?.gender === 0 ? MaleIcon : FemaleIcon"
            class="w-[18px]"
          />
        </template>
      </div>

      <div class="mb-4 flex justify-center border-b-2 border-b-gray-100 pb-2">
        {{ computedUserInfo?.biography }}
      </div>
      <div class="space-y-4">
        <div class="flex space-x-2">
          <span class="self-center">
            <NameIcon />
          </span>
          <span>{{ computedUserInfo?.name }}</span>
        </div>
        <div class="flex space-x-2">
          <span class="pt-0.5">
            <BirthDateIcon />
          </span>
          <span>{{ computedUserInfo?.birthDate }}</span>
        </div>
        <div class="flex space-x-2">
          <span class="self-center">
            <PhoneIcon />
          </span>
          <span>{{ computedUserInfo?.phoneNumber }}</span>
        </div>
        <div class="flex space-x-2">
          <span class="self-center">
            <EmailIcon />
          </span>
          <span>{{ computedUserInfo?.email }}</span>
        </div>
        <div class="flex space-x-2">
          <div class="shrink-0 pt-0.5">
            <AddressIcon />
          </div>
          <span>{{ computedUserInfo?.address }}</span>
        </div>
      </div>
    </NCard>

    <NCard class="sm:w-3/5">
      <template #header>
        <div class="space-x-6 border-b pb-1 text-center sm:text-left">
          <span>基本信息</span>
        </div>
      </template>
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

        <div class="self-center sm:self-start">
          <NButton
            round
            type="primary"
            :loading="submitLoading"
            :disabled="submitLoading"
            @click="handleValidateButtonClick"
          >
            修改
          </NButton>
        </div>
      </NForm>
    </NCard>
  </div>
</template>
