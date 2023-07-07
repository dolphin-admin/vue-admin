<script setup lang="ts">
import type { MessageSchema, User } from '@/types'
import CheckIcon from '~icons/ic/baseline-check'

import { UserFormModal } from './components'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })
const message = useMessage()
const [loading, loadingDispatcher] = useLoading()

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
const resetPasswordRules: FormRules = {
  password: [
    {
      required: true,
      message: t('Validation.Password'),
      trigger: ['blur', 'input']
    },
    {
      validator: (_: FormItemRule, value: string) => value.length >= 6,
      trigger: ['blur', 'input'],
      message: t('Validation.PasswordLength')
    }
  ]
}
const currentId = ref()
const userFormData = ref({})
const isEdit = ref(true)

const Operation = [t('Common.Edit'), t('Common.Enable'), t('Common.Disable'), t('UserManagement.ResetPassword')]

const isResetPassword = ref(false)

const queryList = (shouldLoading = true) => {
  if (shouldLoading) loadingDispatcher.loading()

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
      users.value = []
    })
    .finally(() => {
      if (shouldLoading) loadingDispatcher.loaded()
    })
}

const handlePageChange = () => queryList()

const columns = ref<DataTableColumns<User>>([
  {
    title: 'ID',
    key: 'id',
    width: 50,
    titleAlign: 'center',
    align: 'center'
  },
  {
    title: t('User.Username'),
    key: 'username',
    width: 120
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
                    negativeText: t('Common.Cancel'),
                    positiveText: t('Common.Confirm'),
                    onPositiveClick: () => {
                      if (text === Operation[1]) {
                        UserAPI.enableUsers(rowData.id!)
                          .then((res) => {
                            message.success(res.message!)
                            queryList()
                          })
                          .catch((err) => {
                            message.success(err.message!)
                          })
                      }
                      if (text === Operation[2]) {
                        UserAPI.disableUsers(rowData.id!)
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
                    trigger: () => h(NButton, { type: 'default', size: 'small' }, { default: () => text }),
                    default: () => `${t('Common.IsOrNot')} ${text}`
                  }
                )
              }
              return h(
                NButton,
                {
                  type: 'default',
                  size: 'small',
                  onClick: () => {
                    if (text === Operation[3]) {
                      isResetPassword.value = true
                      currentId.value = rowData.id
                    }
                    if (text === Operation[0]) {
                      isEdit.value = true
                      userFormModalRef.value.handleShowModal()
                      userFormData.value = rowData
                    }
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
  queryList()
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

onMounted(() => queryList())
</script>

<template>
  <DataTableLayout class="relative">
    <template #operate>
      <NButton
        class="absolute right-0 top-0"
        @click="handleCreateUser"
        >{{ t('UserManagement.CreateUser') }}</NButton
      >
    </template>
    <template #table>
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
          }
        }"
        @update:page="handlePageChange"
      />
      <UserFormModal
        ref="userFormModalRef"
        :is-edit="isEdit"
        :user-form-data="userFormData"
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
        <NForm
          ref="resetPasswordRef"
          :model="resetPasswordData"
          :rules="resetPasswordRules"
        >
          <NFormItem
            path="password"
            :label="t('Common.ConfirmPassword')"
          >
            <NInput
              v-model:value="resetPasswordData.password"
              type="password"
              :placeholder="t('User.Password')"
              maxlength="20"
              clearable
              show-password-on="click"
              :input-props="{ autocomplete: 'new-password' }"
              @keydown.enter="handleConfirmPassword"
            />
          </NFormItem>
        </NForm>
      </NModal>
    </template>
  </DataTableLayout>
</template>
