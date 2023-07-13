<script setup lang="ts">
import type { MessageSchema } from '@/types'
import { header } from './private'

const message = useMessage()

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const users = ref<any>([])
const filename = ref('')

const queryList = () => {
  const params = new BasePageModel({
    page: 1,
    pageSize: 10
  })
  UserAPI.getUsers(params)
    .then((res) => {
      const { data } = res || {}
      users.value = data
    })
    .catch(() => {
      message.error(t('Common.LoadingDataError'))
      users.value = []
    })
}

const handleExport = () => {
  if (filename.value === '') {
    message.info(t('Validation.FileName'))
    return
  }
  ExcelUtils.export(header, users.value, filename.value)
}

onMounted(() => {
  queryList()
})
</script>

<template>
  <main class="space-y-4">
    <div class="space-x-4 flex">
      <div>
        <NInput
          v-model:value="filename"
          type="text"
          clearable
          :placeholder="t('Validation.FileName')"
        />
      </div>
      <NButton
        type="primary"
        @click="handleExport"
      >
        {{ t('Common.Export') }}
      </NButton>
    </div>
    <div>
      <NUpload :default-upload="false">
        <NButton>{{ t('Common.Import') }}</NButton>
      </NUpload>
    </div>
  </main>
</template>
