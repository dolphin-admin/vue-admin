<script setup lang="ts">
import type { MessageSchema } from '@/types'
import UserAvatarIcon from '~icons/carbon/user-avatar-filled-alt'

enum UserAction {
  'USER.INFO',
  'CHANGE.PASSWORD',
  'QUIT'
}
const { t } = useI18n<{ message: MessageSchema }>()
const router = useRouter()
const userStore = useUserStore()
const NMessage = useMessage()
const userOptions = ref([
  {
    label: () => t('TEMP.Menu.UserInfo'),
    key: UserAction['USER.INFO']
  },
  {
    label: () => t('TEMP.Header.ChangePassword'),
    key: UserAction['CHANGE.PASSWORD']
  },
  {
    label: () => t('TEMP.Header.Logout'),
    key: UserAction.QUIT
  }
])

/**
 * 退出登录
 */
const logout = () =>
  router.replace('/login').then(() => {
    NMessage.success(t('TEMP.Logout.Success'))
    userStore.clearUser()
    AuthUtils.clearAccessToken()
    AuthUtils.clearRefreshToken()
  })

/**
 * 选择用户下拉框选项
 * @param key 选项的 key
 */
const selectUserOption = (key: UserAction) => {
  switch (key) {
    case UserAction['USER.INFO']:
      router.push('/user-info')
      break
    case UserAction['CHANGE.PASSWORD']:
      router.push('/change-password')
      break
    case UserAction.QUIT:
      logout()
      break
    default:
      break
  }
}
</script>

<template>
  <template v-if="userStore.hasData()">
    <NDropdown
      trigger="hover"
      :options="userOptions"
      @select="selectUserOption"
    >
      <template v-if="userStore.user.avatarUrl">
        <NAvatar
          class="cursor-pointer shadow-md !transition-all hover:opacity-90 active:opacity-70"
          round
          size="small"
          :src="userStore.user.avatarUrl"
        />
      </template>
      <template v-else>
        <NIcon
          class="cursor-pointer"
          size="22"
          :component="UserAvatarIcon"
        />
      </template>
    </NDropdown>
  </template>
</template>
