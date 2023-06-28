<script setup lang="ts">
import type { FormInst } from 'naive-ui'

import { UploadApi, UserApi } from '@/api'
import { userInfoRules } from '@/constants'
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

const formRef = ref<FormInst | null>(null)
const formData = ref<Partial<User>>({})

const handleValidateButtonClick = () => {
  formRef.value?.validate((errors) => {
    if (errors) {
      message.error(errors[0][0].message!)
      return
    }

    UserApi.updateUser(formData.value.id!, formData.value)
      .then((res) => {
        userStore.setUser(res.data)
        message.success(res.message!)
      })
      .catch((err) => message.error(err.message))
  })
}

const UploadAvatarUrl = (file: any) =>
  UploadApi.uploadFile(file.file).then((res) => {
    const { path } = res.data
    formData.value.avatarUrl = getServerFileUrl(path)
  })

onMounted(() =>
  UserApi.getUserInfo().then((res) => {
    userStore.setUser(res.data)
    formData.value = res.data
  })
)
</script>

<template>
  <div class="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 sm:p-4">
    <NCard class="flex w-2/5 flex-row space-y-8 font-medium">
      <div class="flex justify-center">
        <img
          :src="userStore.user?.avatarUrl"
          class="h-16 w-16 rounded-full"
        />
      </div>
      <div class="text-align-center flex justify-center text-xl">
        {{ userStore.user?.username }}
        <component :is="userStore.user.gender === '0' ? MaleIcon : FemaleIcon"></component>
      </div>

      <div class="mb-4 flex justify-center border-b-2 border-b-gray-100 pb-2">
        {{ userStore.user?.biography }}
      </div>
      <div class="space-y-4 text-base">
        <div class="flex space-x-2">
          <NameIcon /><span>{{ userStore.user?.name }}</span>
        </div>
        <div class="flex space-x-2">
          <BirthDateIcon /><span>{{ userStore.user?.birthDate }}</span>
        </div>
        <div class="flex space-x-2">
          <PhoneIcon /><span>{{ userStore.user?.phoneNumber }}</span>
        </div>
        <div class="flex space-x-2">
          <EmailIcon /><span>{{ userStore.user?.email }}</span>
        </div>
        <div class="flex space-x-2 overflow-hidden">
          <AddressIcon /><span>{{ userStore.user?.address }}</span>
        </div>
      </div>
    </NCard>
    <NCard class="sm:w-3/5">
      <template #header>
        <div class="space-x-6 border-b pb-1">
          <span>基本信息</span>
        </div>
      </template>
      <NForm
        ref="formRef"
        :rules="userInfoRules"
        :model="formData"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
      >
        <NFormItem
          label="头像"
          path="avatarUrl"
        >
          <NUpload
            full-path
            :max="1"
            :custom-request="UploadAvatarUrl"
            list-type="image-card"
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
          />
        </NFormItem>
        <NFormItem
          label="名字"
          path="firstName"
        >
          <NInput
            v-model:value="formData.firstName"
            placeholder="请输入名字"
          />
        </NFormItem>
        <NFormItem
          label="姓"
          path="lastName"
        >
          <NInput
            v-model:value="formData.lastName"
            placeholder="请输入姓"
          />
        </NFormItem>
        <NFormItem
          label="邮箱"
          path="email"
        >
          <NInput
            v-model:value="formData.email"
            placeholder="请输入邮箱"
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
              <NRadio value="0"> 女 </NRadio>
              <NRadio value="1"> 男 </NRadio>
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
          />
        </NFormItem>

        <NFormItem
          label="简介"
          path="biography"
        >
          <NInput
            v-model:value="formData.biography"
            placeholder="请输入简介"
          />
        </NFormItem>
        <NButton
          round
          type="primary"
          @click="handleValidateButtonClick"
        >
          修改
        </NButton>
      </NForm>
    </NCard>
  </div>
</template>
