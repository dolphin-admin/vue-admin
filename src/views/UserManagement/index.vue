<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { NButton, NPopconfirm, NTag } from 'naive-ui'

import { UserApi } from '@/api'
import { BasePageModel } from '@/constants'
import { useLoading } from '@/hooks'
import type { User } from '@/types'
import { formatTime } from '@/utils'
import CheckIcon from '~icons/ic/baseline-check'
import UserManagementIcon from '~icons/mdi/account-cog-outline'

import { UserFormModal } from './components'

const [loading, loadingDispatcher] = useLoading()

// @ts-ignore
const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const queryParams = reactive({
  searchText: ''
})
const tableRef = ref()
const userFormModalRef = ref()
const users = ref<User[]>([])
const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0
})

const userFormData = ref({})
const isEdit = ref(true)

const queryList = (shouldLoading = true) => {
  if (shouldLoading) loadingDispatcher.loading()

  const params = new BasePageModel({
    page: pagination.page,
    pageSize: pagination.pageSize,
    searchText: queryParams.searchText
  })

  UserApi.getUsers(params)
    .then((res) => {
      const { data, total } = res || {}
      users.value = data
      pagination.itemCount = total
    })
    .catch(() => {
      users.value = []
    })
    .finally(() => {
      if (shouldLoading) loadingDispatcher.loaded()
    })
}

const handlePageChange = () => queryList()

const Operation = [
  t('UserManagement.Edit'),
  t('UserManagement.Enabled'),
  t('UserManagement.disabled'),
  t('UserManagement.ResetPassword')
]
const columns = ref<DataTableColumns<User>>([
  {
    title: 'ID',
    key: 'id',
    width: 50,
    titleAlign: 'center',
    align: 'center'
  },
  {
    title: t('UserManagement.UserName'),
    key: 'username',
    width: 120
  },
  {
    title: t('UserManagement.PhoneNumber'),
    key: 'phoneNumber',
    width: 120
  },
  {
    title: t('UserManagement.Email'),
    key: 'email',
    width: 100,
    resizable: true,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: t('UserManagement.Name'),
    key: 'name',
    width: 100
  },
  {
    title: t('UserManagement.LastName'),
    key: 'lastName',
    width: 70
  },
  {
    title: t('UserManagement.FirstName'),
    key: 'firstName',
    width: 70
  },
  {
    title: t('UserManagement.NickName'),
    key: 'nickName',
    width: 120,
    resizable: true,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: t('UserManagement.Gender'),
    key: 'genderLabel',
    width: 50,
    titleAlign: 'center',
    align: 'center'
  },
  {
    title: t('UserManagement.BirthDate'),
    key: 'birthDate',
    width: 100,
    titleAlign: 'center',
    align: 'center',
    render: (row) => (row.birthDate ? formatTime(row.birthDate, 'YYYY/MM/DD') : '')
  },
  {
    title: t('UserManagement.Country'),
    key: 'country',
    width: 80
  },
  {
    title: t('UserManagement.City'),
    key: 'city',
    width: 80
  },
  {
    title: t('UserManagement.Address'),
    key: 'address',
    width: 120,
    resizable: true,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: t('UserManagement.Biography'),
    key: 'biography',
    width: 200,
    resizable: true,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: t('UserManagement.Verified'),
    key: 'verified',
    width: 80,
    titleAlign: 'center',
    align: 'center',
    render: (row) =>
      row.verified &&
      h(CheckIcon, {
        class: 'inline'
      })
  },
  {
    title: t('UserManagement.Enabled'),
    key: 'enabled',
    width: 80,
    titleAlign: 'center',
    align: 'center',
    render: (row) =>
      row.enabled &&
      h(CheckIcon, {
        class: 'inline'
      })
  },
  {
    title: t('UserManagement.CreatedAt'),
    key: 'createdAt',
    width: 120,
    titleAlign: 'center',
    align: 'center',
    render: (row) => (row.createdAt ? formatTime(row.createdAt) : '')
  },
  {
    title: t('UserManagement.roles'),
    key: 'roles',
    width: 200,
    render: (row) => {
      const tags = (row?.roles || []).map((role) => {
        return h(
          NTag,
          {
            class: '!mr-2',
            type: 'primary',
            bordered: false
          },
          {
            default: () => role
          }
        )
      })
      return tags
    }
  },
  {
    title: t('UserManagement.Operation'),
    key: 'option',
    width: 220,
    titleAlign: 'center',
    align: 'center',
    render: (rowData) =>
      h(
        'div',
        {
          class: 'space-x-3 flex justify-center'
        },
        {
          default: () =>
            Operation.map((text) => {
              if (text === Operation[1] || text === Operation[2]) {
                return h(
                  NPopconfirm,
                  {
                    showIcon: false,
                    negativeText: t('Common.Cancer'),
                    positiveText: t('Common.Confirm')
                  },
                  {
                    trigger: () => h(NButton, { type: 'default', size: 'small' }, { default: () => text }),
                    default: () => `是否${text}`
                  }
                )
              }

              return h(
                NButton,
                {
                  type: 'default',
                  size: 'small',
                  onClick: () => {
                    isEdit.value = true
                    userFormModalRef.value.handleShowModal()
                    userFormData.value = rowData
                  }
                },
                {
                  default: () => text
                }
              )
            })
        }
      )
  }
])

const handleCreateUser = () => {
  isEdit.value = false
  userFormModalRef.value.handleShowModal()
  userFormData.value = {}
}
onMounted(() => {
  queryList()
})
</script>

<template>
  <div class="h-[calc(100%-112px)]">
    <div class="flex items-center justify-between">
      <div class="ml-1 flex items-center space-x-2 text-2xl">
        <UserManagementIcon width="28" />
        <span>{{ t('UserManagement.UserManagement') }}</span>
      </div>
      <div>
        <n-button @click="handleCreateUser">{{ t('UserManagement.CreateUser') }}</n-button>
      </div>
    </div>
    <NDataTable
      ref="tableRef"
      class="mt-4 h-[calc(100%-48px)]"
      remote
      flex-height
      size="small"
      :scroll-x="3000"
      :columns="columns"
      :data="users"
      :loading="loading"
      :pagination="{
        ...pagination,
        showQuickJumper: true,
        showSizePicker: true,
        pageSlot: 9,
        pageSizes: [
          {
            label: '10 每页',
            value: 10
          },
          {
            label: '20 每页',
            value: 20
          },
          {
            label: '30 每页',
            value: 30
          },
          {
            label: '40 每页',
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
        }
      }"
      @update:page="handlePageChange"
    />
    <UserFormModal
      ref="userFormModalRef"
      :is-edit="isEdit"
      :user-form-data="userFormData"
    />
  </div>
</template>
