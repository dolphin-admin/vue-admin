<script setup lang="ts">
import type { MessageSchema } from '@/types'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const message = useMessage()

//文件名字
const filename = ref('')

type headerItemProps = {
  key: string
  width: number
  ignore: boolean
}

const header: headerItemProps[] = [
  {
    key: 'id',
    width: 20,
    ignore: false
  },
  {
    key: 'username',
    width: 40,
    ignore: false
  },
  {
    key: 'email',
    width: 40,
    ignore: false
  },
  {
    key: 'name',
    width: 40,
    ignore: false
  },
  {
    key: 'verified',
    width: 10,
    ignore: false
  }
]

const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0
})
const users = ref<any>([])
const queryList = () => {
  const params = new BasePageModel({
    page: pagination.page,
    pageSize: pagination.pageSize
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
  ExcelUtils.handleDownloadExcel(header, users.value, filename.value)
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
        >导出</NButton
      >
    </div>
    <div>
      <NUpload :default-upload="false">
        <NButton>导入Excel</NButton>
      </NUpload>
    </div>
  </main>
</template>
