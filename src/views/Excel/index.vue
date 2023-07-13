<script setup lang="ts">
import type { MessageSchema } from '@/types'
import { header } from './private'

const message = useMessage()

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

//文件名字
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

const handleExportExcel = () => {
  if (filename.value === '') {
    message.info(t('Excel.FileName'))
    return
  }
  ExcelUtils.exportExcel(header, users.value, filename.value)
}

onMounted(() => {
  queryList()
})
</script>

<template>
  <main class="space-y-4">
    <div class="space-x-4 flex">
      <div>
        <n-input
          v-model:value="filename"
          type="text"
          clearable
          :placeholder="t('Excel.FileName')"
        />
      </div>
      <NButton
        type="primary"
        @click="handleExportExcel"
        >{{ t('Common.Import') }}</NButton
      >
    </div>
    <div>
      <NUpload :default-upload="false">
        <NButton>{{ t('Common.Export') }}</NButton>
      </NUpload>
    </div>
  </main>
</template>
