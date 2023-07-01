<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { NButton, NTag } from 'naive-ui'

import { UserApi } from '@/api'
import { BasePageModel } from '@/constants'
import { useLoading } from '@/hooks'
import type { User } from '@/types'
import { formatTime } from '@/utils'
import CheckIcon from '~icons/ic/baseline-check'
import UserManagementIcon from '~icons/mdi/account-cog-outline'

const columns = ref<DataTableColumns<User>>([
  {
    title: 'ID',
    key: 'id',
    width: 50,
    titleAlign: 'center',
    align: 'center'
  },
  {
    title: '用户名',
    key: 'username',
    width: 120
  },
  {
    title: '电话',
    key: 'phoneNumber',
    width: 120
  },
  {
    title: '邮箱',
    key: 'email',
    width: 100,
    resizable: true,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '姓名',
    key: 'name',
    width: 100
  },
  {
    title: '姓',
    key: 'lastName',
    width: 70
  },
  {
    title: '名',
    key: 'firstName',
    width: 70
  },
  {
    title: '昵称',
    key: 'nickName',
    width: 120,
    resizable: true,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '性别',
    key: 'genderLabel',
    width: 50,
    titleAlign: 'center',
    align: 'center'
  },
  {
    title: '出生日期',
    key: 'birthDate',
    width: 100,
    titleAlign: 'center',
    align: 'center',
    render: (row) => (row.birthDate ? formatTime(row.birthDate, 'YYYY/MM/DD') : '')
  },
  {
    title: '国家',
    key: 'country',
    width: 80
  },
  {
    title: '城市',
    key: 'city',
    width: 80
  },
  {
    title: '地址',
    key: 'address',
    width: 120,
    resizable: true,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '简介',
    key: 'biography',
    width: 200,
    resizable: true,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '是否验证',
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
    title: '是否启用',
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
    title: '进入系统时间',
    key: 'createdAt',
    width: 120,
    titleAlign: 'center',
    align: 'center',
    render: (row) => (row.createdAt ? formatTime(row.createdAt) : '')
  },
  {
    title: '角色',
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
    title: '操作',
    key: 'option',
    width: 220,
    titleAlign: 'center',
    align: 'center',
    render: () =>
      h(
        'div',
        {
          class: 'space-x-3 flex'
        },
        {
          default: () =>
            ['编辑', '启用', '禁用', '重置密码'].map((text) => {
              return h(
                NButton,
                {
                  type: 'default',
                  size: 'small'
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

const [loading, loadingDispatcher] = useLoading()

const queryParams = reactive({
  searchText: ''
})
const tableRef = ref()
const users = ref<User[]>([])
const pagination = reactive({
  page: 1,
  pageSize: 10,
  pageCount: 1,
  itemCount: 0,
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
  prefix: ({ itemCount }: { itemCount?: number }) => `共计 ${itemCount ?? 0} 条`,
  onUpdatePage: (page: number) => {
    pagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.page = 1
    pagination.pageSize = pageSize
  }
})

const queryList = () => {
  loadingDispatcher.loading()

  const params = new BasePageModel({
    pageSize: pagination.pageSize,
    pageCount: pagination.pageCount,
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
      loadingDispatcher.loaded()
    })
}

const handlePageChange = () => queryList()

watch(
  () => [pagination.page, pagination.pageSize],
  () => queryList()
)

onMounted(() => {
  queryList()
})
</script>

<template>
  <div class="h-[calc(100%-112px)]">
    <div class="mb-2 ml-1 flex items-center space-x-2 text-2xl">
      <UserManagementIcon width="28" />
      <span>用户管理</span>
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
      :pagination="pagination"
      @update:page="handlePageChange"
    />
  </div>
</template>
