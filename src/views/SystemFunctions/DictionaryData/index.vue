<script setup lang="ts">
import type { Lang } from '@dolphin-admin/utils'
import dayjs from 'dayjs'

import type { DictionaryData, MessageSchema, Sorter } from '@/types'
import ResetIcon from '~icons/ic/round-refresh'
import CreateIcon from '~icons/ic/sharp-add'
import EditIcon from '~icons/ic/sharp-edit'
import SearchIcon from '~icons/line-md/search'

import { UserPageModel } from './private'

const { t, locale } = useI18n<{ message: MessageSchema }, Lang>({
  useScope: 'global'
})

const props = defineProps<{
  id: number
}>()

const message = useMessage()
const [loading, loadingDispatcher] = useLoading()
const [submitLoading, submitLoadingDispatcher] = useLoading()
const [deleteLoading, deleteLoadingDispatcher] = useLoading()
const isMobile = useMobile()

const formRef = ref<FormInst | null>(null)
const formData = ref<DictionaryData>({})
const dictionaryData = ref<DictionaryData[]>([])

const queryParams = reactive({
  searchText: '',
  daterange: null,
  sorters: [] as Sorter[],
  authTypes: ''
})

const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0
})

const showDialog = ref(false)
const isEdit = ref(true)
const type = ref('')

const rules: FormRules = {
  value: [
    {
      required: true,
      trigger: ['blur', 'input'],
      message: t('Validation.DictionaryValue')
    }
  ],
  label: [
    {
      required: true,
      trigger: ['blur', 'input'],
      message: t('Validation.DictionaryLabel')
    }
  ]
}

const queryList = () => {
  if (loading.value) {
    return
  }

  loadingDispatcher.loading()

  const params = new UserPageModel({
    page: pagination.page,
    pageSize: pagination.pageSize,
    searchText: queryParams.searchText,
    sorters: queryParams.sorters,
    authTypes: queryParams.authTypes
  })

  if (queryParams.daterange && Array.isArray(queryParams.daterange)) {
    const [startDate, endDate] = queryParams.daterange as string[]
    params.startDate = dayjs(startDate).startOf('day').toISOString()
    params.endDate = dayjs(endDate).endOf('day').toISOString()
  }

  DictionaryAPI.getDictionaryDataById(props.id, params)
    .then((res) => {
      const { data, total } = res || {}
      dictionaryData.value = data
      type.value = data.length > 0 ? data[0].type! : ''

      pagination.itemCount = total
    })
    .catch(() => {
      message.error(t('Common.LoadingDataError'))
    })
    .finally(() => loadingDispatcher.loaded())
}

const handleDelete = async (id: number) => {
  if (deleteLoading.value) return
  deleteLoadingDispatcher.loading()
  try {
    const { message: successMessage } = await DictionaryAPI.deleteDictionaryItem(props.id, id)
    message.success(successMessage!)
    queryList()
  } catch (error: any) {
    if (error.message) message.success(error.message)
  }
  deleteLoadingDispatcher.loaded()
}

const columns = ref<DataTableColumns<DictionaryData>>([
  {
    title: 'ID',
    key: 'id',
    width: 50,
    titleAlign: 'center',
    align: 'center',
    sorter: true
  },
  {
    title: () => t('DictionaryData.Label'),
    key: 'label',
    width: 120,
    ellipsis: {
      tooltip: true
    },
    titleAlign: 'center',
    align: 'center'
  },
  {
    title: () => t('DictionaryData.Value'),
    key: 'value',
    width: 120,
    ellipsis: {
      tooltip: true
    },
    titleAlign: 'center',
    align: 'center'
  },
  {
    title: () => t('Common.Type'),
    key: 'type',
    width: 120,
    titleAlign: 'center',
    align: 'center',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: () => t('Common.Status'),
    key: 'status',
    width: 80,
    titleAlign: 'center',
    align: 'center',
    render(row) {
      return h(
        NTag,
        {
          type: row.status === 1 ? 'primary' : 'info',
          bordered: false
        },
        {
          default: () => t(row.status === 1 ? 'Common.Enable' : 'Common.Disable')
        }
      )
    }
  },
  {
    title: () => t('Common.Remark'),
    key: 'remark',
    width: 120,
    titleAlign: 'center',
    align: 'center',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: () => t('Common.CreateAt'),
    key: 'createAt',
    width: 140,
    titleAlign: 'center',
    align: 'center',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: () => t('Common.Operation'),
    key: 'operation',
    width: 80,
    titleAlign: 'center',
    align: 'center',
    fixed: !isMobile.value ? 'right' : undefined,
    render: (row) =>
      h(
        'div',
        {
          class: 'space-x-3 flex justify-center'
        },
        [
          h(
            NButton,
            {
              type: 'default',
              size: 'small',
              onClick: () => {
                isEdit.value = true
                showDialog.value = true
                formData.value = row
              }
            },
            {
              default: () => t('Common.Edit')
            }
          ),
          h(
            NPopconfirm,
            {
              showIcon: false,
              positiveButtonProps: {
                loading: deleteLoading.value,
                disabled: deleteLoading.value
              },
              positiveText: t('Common.Confirm'),
              negativeText: t('Common.Cancel'),
              onPositiveClick: () => handleDelete(row.id!)
            },
            {
              trigger: () =>
                h(
                  NButton,
                  {
                    type: 'default',
                    size: 'small'
                  },
                  { default: () => t('Common.Delete') }
                ),
              default: () => t('Common.Delete')
            }
          )
        ]
      )
  }
])

/**
 * 重置查询条件
 */
const handleReset = () => {
  queryParams.searchText = ''
  queryParams.daterange = null
  pagination.page = 1
  pagination.pageSize = 10
  pagination.itemCount = 0
  queryParams.sorters = []
  queryParams.authTypes = ''
  queryList()
}

const handleCreateUser = () => {
  formData.value = {}
  formData.value.status = 1
  formData.value.type = type.value
  isEdit.value = false
  showDialog.value = true
}

const handleConfirmDialog = async () => {
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

  try {
    if (isEdit.value) {
      const { message: successMessage } = await DictionaryAPI.updateDictionaryItem(
        props.id,
        formData.value.id!,
        formData.value
      )
      message.success(successMessage!)
    } else {
      formData.value.createAt = new Date().toISOString()
      const { message: successMessage } = await DictionaryAPI.createDictionaryData(
        props.id,
        formData.value
      )
      message.success(successMessage!)
    }
    queryList()
  } catch (err: any) {
    if (err.message) {
      message.error(err.message)
    }
  }
  showDialog.value = false
  submitLoadingDispatcher.loaded()
  return true
}

const handleCannelDialog = () => {}

watch(
  () => [locale.value, props.id],
  () => queryList(),
  { immediate: true }
)
</script>

<template>
  <DataTableLayout>
    <template #operate>
      <div class="flex flex-col items-center space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
        <div class="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0">
          <div class="flex w-full items-center !space-x-2 sm:w-fit">
            <NInput
              v-model:value="queryParams.searchText"
              class="sm:!w-[200px]"
              clearable
              :placeholder="t('Common.KeywordSearch')"
              @keydown.enter="queryList"
            >
              <template #prefix>
                <NIcon
                  :component="SearchIcon"
                  class="mr-1"
                />
              </template>
            </NInput>
            <NButton
              type="primary"
              size="small"
              @click="queryList"
            >
              {{ t('Common.Search') }}
            </NButton>
          </div>
          <NDatePicker
            v-model:value="queryParams.daterange"
            class="sm:!w-[250px]"
            type="daterange"
            clearable
            input-readonly
            @update:value="() => queryList()"
          />
        </div>
        <div class="flex w-full items-center justify-between space-x-3 sm:justify-end">
          <NTooltip>
            <template #trigger>
              <NButton
                circle
                :size="isMobile ? 'small' : 'medium'"
                :disabled="loading"
                @click="handleReset"
              >
                <template #icon>
                  <NIcon :component="ResetIcon" />
                </template>
              </NButton>
            </template>
            {{ t('Common.Reset') }}
          </NTooltip>
          <NButton
            :size="isMobile ? 'small' : 'medium'"
            @click="handleCreateUser"
          >
            {{ t('Common.Create') }}
          </NButton>
        </div>
      </div>
    </template>
    <NDataTable
      ref="tableRef"
      remote
      flex-height
      size="small"
      :columns="columns"
      :data="dictionaryData"
      :loading="loading"
      :pagination="{
        ...pagination,
        simple: isMobile,
        showQuickJumper: true,
        showSizePicker: true,
        pageSizes: [
          {
            label: t('Common.EachPage', { count: 10 }),
            value: 10
          },
          {
            label: t('Common.EachPage', { count: 20 }),
            value: 20
          },
          {
            label: t('Common.EachPage', { count: 30 }),
            value: 30
          },
          {
            label: t('Common.EachPage', { count: 40 }),
            value: 40
          }
        ],
        onUpdatePage: (page: number) => {
          pagination.page = page
          queryList()
        },
        onUpdatePageSize: (pageSize: number) => {
          pagination.page = 1
          pagination.pageSize = pageSize
          queryList()
        },
        prefix: (info) => t('Common.TotalPage', { totalPage: info.itemCount })
      }"
    />
    <NModal
      v-model:show="showDialog"
      preset="dialog"
      :title="t(isEdit ? 'Common.Edit' : 'Common.Create')"
      :loading="submitLoading"
      :positive-text="t('Common.Confirm')"
      :negative-text="t('Common.Cancel')"
      @positive-click="handleConfirmDialog"
      @negative-click="handleCannelDialog"
    >
      <template #icon>
        <NIcon
          size="24"
          :component="isEdit ? EditIcon : CreateIcon"
        />
      </template>
      <NForm
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        :style="{
          maxwidth: '640px'
        }"
      >
        <NFormItem
          :label="t('Common.Type')"
          path="type"
        >
          <n-input
            v-model:value="formData.type"
            disabled
          />
        </NFormItem>
        <NFormItem
          :label="t('DictionaryData.Label')"
          path="label"
        >
          <n-input
            v-model:value="formData.label"
            :placeholder="t('Validation.DictionaryLabel')"
          />
        </NFormItem>
        <NFormItem
          :label="t('DictionaryData.Value')"
          path="value"
        >
          <n-input
            v-model:value="formData.value"
            :placeholder="t('Validation.DictionaryValue')"
          />
        </NFormItem>
        <NFormItem
          :label="t('Common.Status')"
          path="status"
        >
          <NRadioGroup v-model:value="formData.status">
            <NSpace>
              <NRadio :value="1"> {{ t('Common.Enable') }} </NRadio>
              <NRadio :value="0"> {{ t('Common.Disable') }} </NRadio>
            </NSpace>
          </NRadioGroup>
        </NFormItem>
        <NFormItem
          :label="t('Common.Remark')"
          path="remark"
        >
          <NInput
            v-model:value="formData.remark"
            type="textarea"
            :autosize="{
              minRows: 3,
              maxRows: 5
            }"
          />
        </NFormItem>
      </NForm>
    </NModal>
  </DataTableLayout>
</template>
