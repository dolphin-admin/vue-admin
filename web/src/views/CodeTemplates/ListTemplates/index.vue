<script setup lang="ts">
import type { DataTableFilterState, DataTableSortState } from 'naive-ui'
import type { Lang, MessageSchema, Sorter, User } from '@/types'
import { AuthType, OrderType } from '@/types'
import { UserPageModel } from './private'

import SearchIcon from '~icons/line-md/search'
import ResetIcon from '~icons/ic/round-refresh'
import CreateIcon from '~icons/ic/sharp-add'
import EditIcon from '~icons/ic/sharp-edit'
import GitHubIcon from '~icons/ant-design/github-outlined'
import GoogleIcon from '~icons/logos/google-icon'

const { t, locale } = useI18n<{ message: MessageSchema }, Lang>({ useScope: 'global' })
const { isMobileDevice } = BrowserUtils
const [showDialogLoading, showDialogLoadingDispatcher] = useLoading()
const [deleteLoading, deleteLoadingDispatcher] = useLoading()

const message = useMessage()
const [loading, loadingDispatcher] = useLoading()

const showDialog = ref(false)
const isEdit = ref(true)

const queryParams = reactive({
  searchText: '',
  daterange: null,
  sorters: [] as Sorter[],
  authTypes: ''
})
const users = ref<User[]>([])

const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0
})

const authTypeColumn: DataTableBaseColumn<User> = {
  title: () => t('User.AuthType'),
  key: 'authTypes',
  width: 200,
  filter: true,
  filterMultiple: true,
  defaultFilterOptionValues: [],
  filterOptions: [
    {
      label: 'GitHub',
      value: 0
    },
    {
      label: 'Google',
      value: 1
    }
  ],
  render: (row) => {
    const tags = (row?.authTypes || []).map((authType) => {
      return h(
        NTag,
        {
          class: '!mr-2',
          bordered: false
        },
        {
          default: () => authType,
          icon: () =>
            h(
              NIcon,
              {
                size: '14',
                class: 'mr-0.5'
              },
              () => {
                switch (authType) {
                  case AuthType[0]:
                    return h(GitHubIcon, {
                      class: 'scale-125'
                    })
                  case AuthType[1]:
                    return h(GoogleIcon)
                  default:
                    return undefined
                }
              }
            )
        }
      )
    })
    return tags
  }
}

const columns = ref<DataTableBaseColumn<User>[]>([
  {
    title: 'ID',
    key: 'id',
    width: 50,
    titleAlign: 'center',
    align: 'center',
    sorter: true
  },
  {
    title: () => t('User.Username'),
    key: 'username',
    width: 120,
    ellipsis: {
      tooltip: true
    },
    fixed: !BrowserUtils.isMobileDevice() ? 'left' : undefined
  },
  {
    title: () => t('User.Name'),
    key: 'name',
    width: 100,
    ellipsis: {
      tooltip: true
    }
  },
  authTypeColumn,
  {
    title: () => t('Common.Operation'),
    key: 'operation',
    width: 120,
    titleAlign: 'center',
    align: 'center',
    fixed: !BrowserUtils.isMobileDevice() ? 'right' : undefined,
    render: () =>
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
              onPositiveClick: () => {
                message.success(t('Message.Delete.Success'))
              }
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
              default: () => `${t('Common.Delete')}`
            }
          )
        ]
      )
  }
])

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

  UserAPI.getUsers(params)
    .then((res) => {
      const { data, total } = res || {}
      users.value = data
      pagination.itemCount = total
    })
    .catch(() => {
      message.error(t('Common.LoadingDataError'))
      users.value = []
    })
    .finally(() => loadingDispatcher.loaded())
}

const handleSorterChange = (options: DataTableSortState | null) => {
  if (!options) {
    return
  }
  if (options.order) {
    queryParams.sorters = [
      {
        key: options.columnKey as string,
        order: OrderType[options.order]
      }
    ]
  } else {
    queryParams.sorters = []
  }
  queryList()
}

const handleFiltersChange = (filters: DataTableFilterState) => {
  const { authTypes } = filters
  if (authTypes && Array.isArray(authTypes) && authTypes.length > 0) {
    queryParams.authTypes = authTypes.join()
  } else {
    queryParams.authTypes = ''
  }
  queryList()
}

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
  isEdit.value = false
  showDialog.value = true
}

const handleConfirmDialog = () => {}

const handleCannelDialog = () => {}

watch(
  () => locale.value,
  () => queryList()
)

onMounted(() => queryList())
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
              @keydown.enter="() => queryList()"
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
              @click="() => queryList()"
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
        <div class="flex w-full justify-end space-x-3 sm:items-center">
          <NTooltip>
            <template #trigger>
              <NButton
                circle
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
          <NButton @click="handleCreateUser">
            {{ t('UserManagement.CreateUser') }}
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
      :data="users"
      :loading="loading"
      :pagination="{
        ...pagination,
        simple: isMobileDevice(),
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
      @update:sorter="handleSorterChange"
      @update:filters="handleFiltersChange"
    />
    <NModal
      v-model:show="showDialog"
      preset="dialog"
      :title="t(isEdit ? 'Common.Edit' : 'Common.Create')"
      :loading="showDialogLoading"
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
      <NForm> ...... </NForm>
    </NModal>
  </DataTableLayout>
</template>
