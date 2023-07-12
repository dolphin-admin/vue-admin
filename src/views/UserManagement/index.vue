<script setup lang="ts">
import type { Lang, MessageSchema, User } from '@/types'
import UserAvatarIcon from '~icons/carbon/user-avatar-filled-alt'
import CheckIcon from '~icons/ic/baseline-check'
import RefreshIcon from '~icons/ic/round-refresh'
import ResetPasswordIcon from '~icons/ic/sharp-power-settings-new'

import { UserFormModal } from './components'
import { userColumnsI18nKeyMap } from './private'

const { t, locale } = useI18n<{ message: MessageSchema }, Lang>({ useScope: 'global' })

const message = useMessage()
const [loading, loadingDispatcher] = useLoading()

const resetPasswordRules: FormRules = {
  password: [
    {
      required: true,
      trigger: ['blur', 'input'],
      message: t('Validation.Password'),
      renderMessage: () => t('Validation.Password')
    },
    {
      validator: (_: FormItemRule, value: string) => value.length >= 6,
      trigger: ['blur', 'input'],
      message: t('Validation.PasswordLength'),
      renderMessage: () => t('Validation.PasswordLength')
    }
  ]
}

const operationKeys = ['Common.Edit', 'Common.Enable', 'Common.Disable', 'UserManagement.ResetPassword']

const tableRef = ref()
const resetPasswordRef = ref<FormInst | null>(null)
const userFormModalRef = ref()

const queryParams = reactive({
  searchText: ''
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

const processOptionColumnWidth = () => (locale.value === 'zh_CN' ? 200 : 280)

const columns = ref<DataTableBaseColumn<User>[]>([
  {
    title: 'ID',
    key: 'id',
    width: 50,
    titleAlign: 'center',
    align: 'center'
  },
  {
    title: t('User.Avatar'),
    key: 'avatar',
    width: 50,
    titleAlign: 'center',
    align: 'center',
    render: (row) =>
      h(
        'div',
        {
          class: 'flex align-center justify-center'
        },
        row.avatarUrl
          ? h(NImage, {
              width: 40,
              lazy: true,
              src: row.avatarUrl,
              class: 'rounded-full'
            })
          : h(NIcon, {
              size: '40',
              depth: '3',
              component: UserAvatarIcon
            })
      )
  },
  {
    title: t('User.Username'),
    key: 'username',
    width: 120,
    fixed: !BrowserUtils.isMobileDevice() ? 'left' : undefined
  },
  {
    title: t('User.PhoneNumber'),
    key: 'phoneNumber',
    width: 120
  },
  {
    title: t('User.Email'),
    key: 'email',
    width: 100,
    resizable: true,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: t('User.Name'),
    key: 'name',
    width: 100
  },
  {
    title: t('User.LastName'),
    key: 'lastName',
    width: 70
  },
  {
    title: t('User.FirstName'),
    key: 'firstName',
    width: 70
  },
  {
    title: t('User.NickName'),
    key: 'nickName',
    width: 120,
    resizable: true,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: t('User.Gender'),
    key: 'genderLabel',
    width: 50,
    titleAlign: 'center',
    align: 'center'
  },
  {
    title: t('User.BirthDate'),
    key: 'birthDate',
    width: 100,
    titleAlign: 'center',
    align: 'center',
    render: (row) => (row.birthDate ? TimeUtils.formatTime(row.birthDate, 'YYYY/MM/DD') : '')
  },
  {
    title: t('User.Country'),
    key: 'country',
    width: 80
  },
  {
    title: t('User.Province'),
    key: 'province',
    width: 80
  },
  {
    title: t('User.City'),
    key: 'city',
    width: 80
  },
  {
    title: t('User.Address'),
    key: 'address',
    width: 120,
    resizable: true,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: t('User.Biography'),
    key: 'biography',
    width: 200,
    resizable: true,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: t('UserManagement.VerifyOrNot'),
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
    title: t('UserManagement.EnableOrNot'),
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
    title: t('UserManagement.EnterTime'),
    key: 'createdAt',
    width: 120,
    titleAlign: 'center',
    align: 'center',
    render: (row) => (row.createdAt ? TimeUtils.formatTime(row.createdAt) : '')
  },
  {
    title: t('User.Roles'),
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
    title: t('Common.Operation'),
    key: 'operation',
    width: processOptionColumnWidth(),
    titleAlign: 'center',
    align: 'center',
    fixed: !BrowserUtils.isMobileDevice() ? 'right' : undefined,
    render: (row) =>
      h(
        'div',
        {
          class: 'space-x-3 flex justify-center'
        },
        {
          default: () =>
            operationKeys.map((key) => {
              if (key === operationKeys[1] || key === operationKeys[2]) {
                return h(
                  NPopconfirm,
                  {
                    showIcon: false,
                    negativeText: t('Common.Cancel'),
                    positiveText: t('Common.Confirm'),
                    onPositiveClick: () => {
                      if (key === operationKeys[1]) {
                        UserAPI.enableUsers(row.id!)
                          .then((res) => {
                            message.success(res.message!)
                            queryList()
                          })
                          .catch((err) => {
                            message.success(err.message!)
                          })
                      }
                      if (key === operationKeys[2]) {
                        UserAPI.disableUsers(row.id!)
                          .then((res) => {
                            message.success(res.message!)
                            queryList()
                          })
                          .catch((err) => {
                            message.success(err.message!)
                          })
                      }
                    }
                  },
                  {
                    trigger: () => h(NButton, { type: 'default', size: 'small' }, { default: () => t(key) }),
                    default: () => `${t('Common.IsOrNot')}${t(key)}`
                  }
                )
              }
              return h(
                NButton,
                {
                  type: 'default',
                  size: 'small',
                  onClick: () => {
                    if (key === operationKeys[3]) {
                      isResetPassword.value = true
                      currentId.value = row.id
                    }
                    if (key === operationKeys[0]) {
                      isEdit.value = true
                      userFormModalRef.value.handleShowModal()
                      userFormData.value = row
                    }
                  }
                },
                {
                  default: () => t(key)
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

watch(
  () => locale.value,
  () => {
    columns.value = columns.value.map((column) => {
      const { key, width } = column
      const i18nKey = userColumnsI18nKeyMap.get(key.toString())
      return {
        ...column,
        // 重写多语言
        title: i18nKey ? t(i18nKey) : column.title,
        // 处理操作列宽度
        width: key === 'operation' ? processOptionColumnWidth() : width
      }
    })
    queryList()
  }
)

onMounted(() => queryList())
</script>

<template>
  <DataTableLayout class="relative">
    <template #operate>
      <div class="flex items-center space-x-3">
        <NTooltip>
          <template #trigger>
            <NButton
              circle
              :disabled="loading"
              @click="() => queryList()"
            >
              <template #icon>
                <NIcon :component="RefreshIcon" />
              </template>
            </NButton>
          </template>
          {{ t('Common.Refresh') }}
        </NTooltip>
        <NButton @click="handleCreateUser">
          {{ t('UserManagement.CreateUser') }}
        </NButton>
      </div>
    </template>

    <NDataTable
      ref="tableRef"
      class="h-[calc(100%-42px)]"
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
