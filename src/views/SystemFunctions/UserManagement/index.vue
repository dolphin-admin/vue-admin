<script setup lang="ts">
import type { Lang, MessageSchema, User } from '@/types'
import { AuthType } from '@/types'
import GitHubIcon from '~icons/ant-design/github-outlined'
import UserAvatarIcon from '~icons/carbon/user-avatar-filled-alt'
import CheckIcon from '~icons/ic/baseline-check'
import ResetIcon from '~icons/ic/round-refresh'
import ResetPasswordIcon from '~icons/ic/sharp-power-settings-new'
import SearchIcon from '~icons/line-md/search'
import GoogleIcon from '~icons/logos/google-icon'

import { UserFormModal } from './components'

const { t, locale } = useI18n<{ message: MessageSchema }, Lang>({ useScope: 'global' })

const message = useMessage()
const [loading, loadingDispatcher] = useLoading()

const resetPasswordRules: FormRules = {
  password: [
    {
      required: true,
      trigger: ['blur', 'input'],
      message: () => t('Validation.Password'),
      renderMessage: () => t('Validation.Password')
    },
    {
      validator: (_: FormItemRule, value: string) => value.length >= 6,
      trigger: ['blur', 'input'],
      message: () => t('Validation.PasswordLength'),
      renderMessage: () => t('Validation.PasswordLength')
    }
  ]
}

const tableRef = ref()
const resetPasswordRef = ref<FormInst | null>(null)
const userFormModalRef = ref()

const queryParams = reactive({
  searchText: '',
  daterange: null
})
const users = ref<User[]>([])
const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0
})
const resetPasswordData = reactive({
  password: AuthUtils.DEFAULT_PASSWORD
})

const currentId = ref()
const userFormData = ref({})
const isEdit = ref(true)

const isResetPassword = ref(false)

const queryList = (shouldLoading = true) => {
  if (loading.value) {
    return
  }

  if (shouldLoading) {
    loadingDispatcher.loading()
  }

  const params = new BasePageModel({
    page: pagination.page,
    pageSize: pagination.pageSize,
    searchText: queryParams.searchText
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
    .finally(() => {
      if (shouldLoading) {
        loadingDispatcher.loaded()
      }
    })
}

const handleReset = () => {
  queryParams.searchText = ''
  queryParams.daterange = null
  pagination.page = 1
  pagination.pageSize = 10
  pagination.itemCount = 0
  queryList()
}

const columns = ref<DataTableBaseColumn<User>[]>([
  {
    title: 'ID',
    key: 'id',
    width: 50,
    titleAlign: 'center',
    align: 'center'
  },
  {
    title: () => t('User.Avatar'),
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
          ? () =>
              h(NImage, {
                width: 40,
                lazy: true,
                src: row.avatarUrl,
                class: 'rounded-full'
              })
          : () =>
              h(NIcon, {
                size: '40',
                depth: '3',
                component: UserAvatarIcon
              })
      )
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
    title: () => t('User.PhoneNumber'),
    key: 'phoneNumber',
    width: 120
  },
  {
    title: () => t('User.Email'),
    key: 'email',
    width: 100,
    resizable: true,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: () => t('User.Name'),
    key: 'name',
    width: 100
  },
  {
    title: () => t('User.LastName'),
    key: 'lastName',
    width: 80
  },
  {
    title: () => t('User.FirstName'),
    key: 'firstName',
    width: 80
  },
  {
    title: () => t('User.NickName'),
    key: 'nickName',
    width: 120,
    resizable: true,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: () => t('User.Gender'),
    key: 'genderLabel',
    width: 60,
    titleAlign: 'center',
    align: 'center'
  },
  {
    title: () => t('User.BirthDate'),
    key: 'birthDate',
    width: 100,
    titleAlign: 'center',
    align: 'center',
    render: (row) => (row.birthDate ? TimeUtils.formatTime(row.birthDate, 'YYYY/MM/DD') : '')
  },
  {
    title: () => t('User.Country'),
    key: 'country',
    width: 80
  },
  {
    title: () => t('User.Province'),
    key: 'province',
    width: 80
  },
  {
    title: () => t('User.City'),
    key: 'city',
    width: 80
  },
  {
    title: () => t('User.Address'),
    key: 'address',
    width: 120,
    resizable: true,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: () => t('User.Biography'),
    key: 'biography',
    width: 200,
    resizable: true,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: () => t('UserManagement.VerifyOrNot'),
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
    title: () => t('UserManagement.EnableOrNot'),
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
  {
    title: () => t('UserManagement.EnterTime'),
    key: 'createdAt',
    width: 140,
    titleAlign: 'center',
    align: 'center',
    render: (row) => (row.createdAt ? TimeUtils.formatTime(row.createdAt) : '')
  },
  {
    title: () => t('User.AuthType'),
    key: 'authTypes',
    width: 200,
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
                    h(GoogleIcon)
                  )
              }
            )
          default:
            return undefined
        }
      })
      return tags
    }
  },
  {
    title: () => t('User.Roles'),
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
    title: () => t('Common.Operation'),
    key: 'operation',
    width: 320,
    titleAlign: 'center',
    align: 'center',
    fixed: !BrowserUtils.isMobileDevice() ? 'right' : undefined,
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
              default: () => t('Common.Edit')
            }
          ),
          h(
            NPopconfirm,
            {
              showIcon: false,
              negativeText: t('Common.Cancel'),
              positiveText: t('Common.Confirm'),
              onPositiveClick: () => {
                UserAPI.enableUser(row.id!)
                  .then((res) => {
                    message.success(res.message!)
                    queryList()
                  })
                  .catch((err) => message.error(err?.message))
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
                  { default: () => t('Common.Enable') }
                ),
              default: () => `${t('Common.IsOrNot')}${t('Common.Enable')}`
            }
          ),
          h(
            NPopconfirm,
            {
              showIcon: false,
              negativeText: t('Common.Cancel'),
              positiveText: t('Common.Confirm'),
              onPositiveClick: () => {
                UserAPI.disableUser(row.id!)
                  .then((res) => {
                    message.success(res.message!)
                    queryList()
                  })
                  .catch((err) => message.error(err?.message))
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
                  { default: () => t('Common.Disable') }
                ),
              default: () => `${t('Common.IsOrNot')}${t('Common.Disable')}`
            }
          ),
          h(
            NButton,
            {
              type: 'default',
              size: 'small',
              onClick: () => {
                isResetPassword.value = true
                currentId.value = row.id
              }
            },
            {
              default: () => t('UserManagement.ResetPassword')
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
  resetPasswordData.password = AuthUtils.DEFAULT_PASSWORD
}

const handleConfirmPassword = () => {
  resetPasswordRef.value!.validate((errors) => {
    if (errors) {
      message.error(errors[0][0].message!)
      return
    }
    UserAPI.resetPassword(currentId.value, resetPasswordData.password)
      .then((res) => {
        message.success(res.message!)
      })
      .catch((err) => {
        message.error(err.message!)
      })
      .finally(() => {
        handleResetPassword()
      })
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
            >
              {{ t('Common.Search') }}</NButton
            >
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
          prefix: (info) => t('Common.TotalPage', {totalPage: info.itemCount})
        }"
      @update:page="() => queryList()"
    />

    <NModal
      v-model:show="isResetPassword"
      preset="dialog"
      :title="t('UserManagement.ResetPassword')"
      :positive-text="t('Common.Confirm')"
      :negative-text="t('Common.Cancel')"
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
          :label="t('User.Password')"
        >
          <NInput
            v-model:value="resetPasswordData.password"
            type="password"
            :placeholder="t('User.Password')"
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
