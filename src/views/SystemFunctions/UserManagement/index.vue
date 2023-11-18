<script setup lang="ts">
import type { Lang } from '@dolphin-admin/utils'
import type { DataTableFilterState, DataTableSortState } from 'naive-ui'

import type { MessageSchema, Sorter, User } from '@/types'
import { AuthType, OrderType } from '@/types'
import GitHubIcon from '~icons/ant-design/github-outlined'
import UserAvatarIcon from '~icons/carbon/user-avatar-filled-alt'
import CheckIcon from '~icons/ic/baseline-check'
import ResetIcon from '~icons/ic/round-refresh'
import ResetPasswordIcon from '~icons/ic/sharp-power-settings-new'
import SearchIcon from '~icons/line-md/search'
import GoogleIcon from '~icons/logos/google-icon'

import { UserFormModal } from './components'
import { UserPageModel } from './private'

const { t, locale } = useI18n<{ message: MessageSchema }, Lang>({})

const idColumn: DataTableBaseColumn<User> = {
  title: 'ID',
  key: 'id',
  width: 50,
  titleAlign: 'center',
  align: 'center',
  sorter: true
}

const createdAtColumn: DataTableBaseColumn<User> = {
  title: () => t('TEMP.UserManagement.EnterTime'),
  key: 'createdAt',
  width: 140,
  titleAlign: 'center',
  align: 'center',
  sorter: true,
  render: (row) => (row.createdAt ? TimeUtils.formatTime(row.createdAt) : '')
}

const authTypeColumn: DataTableBaseColumn<User> = {
  title: () => t('TEMP.User.AuthType'),
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
      switch (authType) {
        case AuthType[0]:
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
                  () =>
                    h(GitHubIcon, {
                      class: 'scale-125'
                    })
                )
            }
          )
        case AuthType[1]:
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
                  () => h(GoogleIcon)
                )
            }
          )
        default:
          return undefined
      }
    })
    return tags
  }
}

const message = useMessage()
const [loading, loadingDispatcher] = useLoading()
const [resetPasswordLoading, resetPasswordLoadingDispatcher] = useLoading()
const [enableLoading, enableLoadingDispatcher] = useLoading()
const [disableLoading, disableLoadingDispatcher] = useLoading()
const isMobile = useMobile()

const resetPasswordRules: FormRules = {
  password: [
    {
      required: true,
      trigger: ['blur', 'input'],
      message: () => t('TEMP.Validation.Password'),
      renderMessage: () => t('TEMP.Validation.Password')
    },
    {
      validator: (_: FormItemRule, value: string) => value.length >= 6,
      trigger: ['blur', 'input'],
      message: () => t('TEMP.Validation.PasswordLength'),
      renderMessage: () => t('TEMP.Validation.PasswordLength')
    }
  ]
}

const tableRef = ref()
const resetPasswordRef = ref<FormInst | null>(null)
const userFormModalRef = ref()

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
const resetPasswordData = reactive({
  password: AuthUtils.DEFAULT_ADMIN_USERNAME
})
const idColumnReactive = reactive(idColumn)
const createdAtColumnReactive = reactive(createdAtColumn)
const authTypeColumnReactive = reactive(authTypeColumn)

const currentId = ref()
const userFormData = ref({})
const isEdit = ref(true)

const showResetPasswordDialog = ref(false)

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
    params.startDate = TimeUtils.dayjs(startDate).startOf('day').toISOString()
    params.endDate = TimeUtils.dayjs(endDate).endOf('day').toISOString()
  }

  UserAPI.getUsers(params)
    .then((res) => {
      const { data, total } = res || {}
      users.value = data
      pagination.itemCount = total
    })
    .catch(() => {
      message.error(t('COMMON.LoadingDataError'))
      users.value = []
    })
    .finally(() => loadingDispatcher.loaded())
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
  idColumnReactive.sortOrder = false
  createdAtColumnReactive.sortOrder = false
  queryParams.authTypes = ''
  authTypeColumnReactive.filterOptionValues = []
  queryList()
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

const columns = ref<DataTableBaseColumn<User>[]>([
  idColumn,
  {
    title: () => t('TEMP.User.Avatar'),
    key: 'avatar',
    width: 55,
    titleAlign: 'center',
    align: 'center',
    render: (row) =>
      h(
        'div',
        {
          class: 'flex align-center justify-center'
        },
        row.avatarUrl
          ? h(NAvatar, {
              src: row.avatarUrl,
              round: true,
              lazy: true,
              class: 'my-1'
            })
          : h(NIcon, {
              size: '40',
              depth: '3',
              component: UserAvatarIcon
            })
      )
  },
  {
    title: () => t('TEMP.User.Username'),
    key: 'username',
    width: 120,
    ellipsis: {
      tooltip: true
    },
    fixed: !isMobile.value ? 'left' : undefined
  },
  {
    title: () => t('TEMP.User.PhoneNumber'),
    key: 'phoneNumber',
    width: 120,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: () => t('TEMP.User.Email'),
    key: 'email',
    width: 100,
    resizable: true,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: () => t('TEMP.User.Name'),
    key: 'name',
    width: 100,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: () => t('TEMP.User.LastName'),
    key: 'lastName',
    width: 80,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: () => t('TEMP.User.FirstName'),
    key: 'firstName',
    width: 80,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: () => t('TEMP.User.NickName'),
    key: 'nickName',
    width: 120,
    resizable: true,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: () => t('TEMP.User.Gender'),
    key: 'genderLabel',
    width: 60,
    titleAlign: 'center',
    align: 'center'
  },
  {
    title: () => t('TEMP.User.BirthDate'),
    key: 'birthDate',
    width: 100,
    titleAlign: 'center',
    align: 'center',
    render: (row) => (row.birthDate ? TimeUtils.formatTime(row.birthDate, 'YYYY/MM/DD') : '')
  },
  {
    title: () => t('TEMP.User.Country'),
    key: 'country',
    width: 80
  },
  {
    title: () => t('TEMP.User.Province'),
    key: 'province',
    width: 80
  },
  {
    title: () => t('TEMP.User.City'),
    key: 'city',
    width: 80
  },
  {
    title: () => t('TEMP.User.Address'),
    key: 'address',
    width: 120,
    resizable: true,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: () => t('TEMP.User.Biography'),
    key: 'biography',
    width: 200,
    resizable: true,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: () => t('TEMP.UserManagement.VerifyOrNot'),
    key: 'verified',
    width: 100,
    titleAlign: 'center',
    align: 'center',
    render: (row) =>
      row.verified &&
      h(CheckIcon, {
        class: 'inline'
      })
  },
  {
    title: () => t('TEMP.UserManagement.EnableOrNot'),
    key: 'enabled',
    width: 100,
    titleAlign: 'center',
    align: 'center',
    render: (row) =>
      row.enabled &&
      h(CheckIcon, {
        class: 'inline'
      })
  },
  createdAtColumn,
  authTypeColumn,
  {
    title: () => t('TEMP.User.Roles'),
    key: 'roles',
    width: 200,
    render: (row) => {
      const tags = (row?.roles || []).map((role) =>
        h(
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
      )
      return tags
    }
  },
  {
    title: () => t('COMMON.Operation'),
    key: 'operation',
    width: 320,
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
                userFormModalRef.value.handleShowModal()
                userFormData.value = row
              }
            },
            {
              default: () => t('COMMON.Edit')
            }
          ),
          h(
            NPopconfirm,
            {
              showIcon: false,
              positiveButtonProps: {
                loading: enableLoading.value,
                disabled: enableLoading.value
              },
              positiveText: t('COMMON.Confirm'),
              negativeText: t('COMMON.Cancel'),
              onPositiveClick: async () => {
                if (!row.id) {
                  return
                }
                enableLoadingDispatcher.loading()
                await UserAPI.enableUser(row.id)
                  .then((res) => {
                    if (res.message) {
                      message.success(res.message)
                    }
                    queryList()
                  })
                  .catch((err) => {
                    if (err instanceof Error) {
                      message.error(err.message)
                    }
                  })
                  .finally(() => enableLoadingDispatcher.loaded())
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
                  { default: () => t('COMMON.Enable') }
                ),
              default: () => `${t('COMMON.IsOrNot')}${t('COMMON.Enable')}`
            }
          ),
          h(
            NPopconfirm,
            {
              showIcon: false,
              positiveText: t('COMMON.Confirm'),
              negativeText: t('COMMON.Cancel'),
              positiveButtonProps: {
                loading: disableLoading.value,
                disabled: disableLoading.value
              },
              onPositiveClick: async () => {
                if (!row.id) {
                  return
                }
                disableLoadingDispatcher.loading()
                await UserAPI.disableUser(row.id)
                  .then((res) => {
                    if (res.message) {
                      message.success(res.message)
                    }
                    queryList()
                  })
                  .catch((err) => {
                    if (err instanceof Error) {
                      message.error(err.message)
                    }
                  })
                  .finally(() => disableLoadingDispatcher.loaded())
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
                  { default: () => t('COMMON.Disable') }
                ),
              default: () => `${t('COMMON.IsOrNot')}${t('COMMON.Disable')}`
            }
          ),
          h(
            NButton,
            {
              type: 'default',
              size: 'small',
              onClick: () => {
                showResetPasswordDialog.value = true
                currentId.value = row.id
              }
            },
            {
              default: () => t('TEMP.UserManagement.ResetPassword')
            }
          )
        ]
      )
  }
])

const handleCreateUser = () => {
  isEdit.value = false
  userFormModalRef.value.handleShowModal()
  userFormData.value = {}
}

const handleResetPassword = () => {
  resetPasswordData.password = AuthUtils.DEFAULT_ADMIN_PASSWORD
}

const handleConfirmPassword = async () => {
  try {
    await resetPasswordRef.value!.validate()
  } catch (errors) {
    const errorMessage = (errors as FormValidationError[])[0][0].message
    if (errorMessage) {
      message.error(errorMessage)
    }
    return
  }

  resetPasswordLoadingDispatcher.loading()

  await UserAPI.resetPassword(currentId.value, resetPasswordData.password)
    .then((res) => {
      if (res.message) {
        message.success(res.message)
      }
    })
    .catch((err) => {
      if (err instanceof Error) {
        message.error(err.message)
      }
    })
    .finally(() => {
      resetPasswordLoadingDispatcher.loaded()
      handleResetPassword()
    })
}

// 切换语言时重新查询列表
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
              :placeholder="t('COMMON.KeywordSearch')"
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
              {{ t('COMMON.Search') }}
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
            {{ t('COMMON.Reset') }}
          </NTooltip>
          <NButton
            :size="isMobile ? 'small' : 'medium'"
            @click="handleCreateUser"
          >
            {{ t('COMMON.Create') }}
          </NButton>
        </div>
      </div>
    </template>

    <NDataTable
      ref="tableRef"
      remote
      flex-height
      size="small"
      :scroll-x="3000"
      :columns="columns"
      :data="users"
      :loading="loading"
      :pagination="{
        ...pagination,
        simple: isMobile,
        showQuickJumper: true,
        showSizePicker: true,
        pageSlot: 9,
        pageSizes: [
          {
            label: t('COMMON.EachPage', { count: 10 }),
            value: 10
          },
          {
            label: t('COMMON.EachPage', { count: 20 }),
            value: 20
          },
          {
            label: t('COMMON.EachPage', { count: 30 }),
            value: 30
          },
          {
            label: t('COMMON.EachPage', { count: 40 }),
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
        prefix: (info) => t('COMMON.TotalPage', { totalPage: info.itemCount })
      }"
      @update:sorter="handleSorterChange"
      @update:filters="handleFiltersChange"
      @update:page="() => queryList()"
    />

    <NModal
      v-model:show="showResetPasswordDialog"
      preset="dialog"
      :title="t('TEMP.UserManagement.ResetPassword')"
      :loading="resetPasswordLoading"
      :positive-text="t('COMMON.Confirm')"
      :negative-text="t('COMMON.Cancel')"
      @positive-click="handleConfirmPassword"
      @negative-click="handleResetPassword"
    >
      <template #icon>
        <NIcon
          size="24"
          :component="ResetPasswordIcon"
        />
      </template>
      <NForm
        ref="resetPasswordRef"
        :model="resetPasswordData"
        :rules="resetPasswordRules"
      >
        <input
          type="text"
          name="username"
          autocomplete="username"
          style="display: none"
        />
        <NFormItem
          path="password"
          :label="t('TEMP.User.Password')"
        >
          <NInput
            v-model:value="resetPasswordData.password"
            type="password"
            :placeholder="t('TEMP.User.Password')"
            maxlength="20"
            clearable
            show-password-on="click"
            :input-props="{ autocomplete: 'password' }"
            @keydown.enter="handleConfirmPassword"
          />
        </NFormItem>
      </NForm>
    </NModal>

    <UserFormModal
      ref="userFormModalRef"
      :is-edit="isEdit"
      :user-form-data="userFormData"
      @save="queryList"
    />
  </DataTableLayout>
</template>
