<script setup lang="ts">
import type { User } from '@/types'
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

    if (!formData.value.avatarUrl) {
      try {
        const { path } = (await UploadAPI.uploadFile({ file: currentFile.value })).data || {}
        formData.value.avatarUrl = FileUtils.getServerFileUrl(path)
      } catch {
        message.error('头像上传失败')
        submitLoadingDispatcher.loaded()
        return
      }
    }

    try {
      const { data, message: successMessage } = await UserAPI.updateUser(formData.value.id!, formData.value)
      data.birthDate = data.birthDate && TimeUtils.formatTime(data.birthDate, 'YYYY-MM-DD')
      userStore.setUser(data)
      message.success(successMessage!)
    } catch (err: any) {
      message.error(err.message)
    }

    submitLoadingDispatcher.loaded()
  })
}

const UploadAvatarUrl = (options: { fileList: UploadFileInfo[] }) => {
  const [file] = options.fileList
  currentFile.value = file.file ?? null
  formData.value.avatarUrl = ''
}

onMounted(() =>
  UserAPI.getUserInfo().then((res) => {
    const { data } = res
    data.birthDate = data.birthDate && TimeUtils.formatTime(data.birthDate, 'YYYY-MM-DD')
    userStore.setUser(data)
    formData.value = data
  })
)
</script>

<template>
  <div class="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 sm:p-4">
    <NCard class="flex w-full space-y-4 font-medium sm:!w-2/5">
      <div class="flex flex-col items-center space-y-2">
        <NAvatar
          :size="80"
          round
          :src="computedUserInfo?.avatarUrl"
        />

        <div class="flex items-center justify-center space-x-1 text-lg">
          <span>{{ computedUserInfo?.username }}</span>
          <template v-if="computedUserInfo?.gender === 1">
            <MaleIcon class="w-[18px] text-blue-300" />
          </template>
          <template v-if="computedUserInfo?.gender === 0">
            <FemaleIcon class="w-[18px] text-pink-300" />
          </template>
        </div>

        <NEllipsis
          :line-clamp="3"
          class="text-xs"
        >
          {{ computedUserInfo?.biography }}
          <template #tooltip>
            <div class="!max-w-[300px]">{{ computedUserInfo?.biography }}</div>
          </template>
        </NEllipsis>
      </div>

      <NDivider class="!my-4">
        <span>个人信息</span>
      </NDivider>
      <div class="space-y-4">
        <div class="flex space-x-2">
          <span class="self-center">
            <NameIcon />
          </span>
          <span>{{ computedUserInfo?.name }}</span>
        </div>
        <template v-if="computedUserInfo?.birthDate">
          <div class="flex space-x-2">
            <span class="pt-0.5">
              <BirthDateIcon />
            </span>
            <span>{{ computedUserInfo?.birthDate }}</span>
          </div>
        </template>
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
              <NRadio :value="1"> 男 </NRadio>
              <NRadio :value="0"> 女 </NRadio>
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
          <NDatePicker
            v-model:formatted-value="formData.birthDate"
            clearable
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
