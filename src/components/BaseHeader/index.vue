<script setup lang="ts">
import { UserApi } from '@/api'
import { useThemeStore } from '@/store'
import type { MessageSchema, User } from '@/types'
import { clearLang, clearTheme, clearToken } from '@/utils'
import NotificationIcon from '~icons/ic/baseline-notifications-none'
import LanguageIcon from '~icons/ion/language-outline'
import SunIcon from '~icons/line-md/moon-to-sunny-outline-transition'
import MoonIcon from '~icons/line-md/sunny-filled-loop-to-moon-alt-filled-loop-transition'
import FullScreenIcon from '~icons/material-symbols/fullscreen'

const themeStore = useThemeStore()
const router = useRouter()
const message = useMessage()
// @ts-ignore
const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const userInfo = reactive<Partial<User>>({})

const logout = () => {
  clearToken()
  clearLang()
  clearTheme()
  message.success(t('Logout.Success'))
  router.replace('/login')
}

onBeforeMount(() => {
  const loadingMessage = message.loading(t('UserInfo.Fetching'))
  UserApi.getUserInfo()
    .then((res) => {
      const { data } = res || {}
      const userKeys = Object.keys(data) as (keyof User)[]
      userKeys.forEach((key) => {
        userInfo[key] = data[key] as any
      })
    })
    .catch(() => message.error(t('UserInfo.FetchError')))
    .finally(() => loadingMessage.destroy())
})
</script>

<template>
  <header
    class="z-50 flex h-16 w-full items-center justify-between border-b border-gray-300 bg-light-default p-4 shadow-sm dark:border-gray-950 dark:bg-dark-default"
  >
    <div class="flex h-full items-center justify-start"></div>

    <div class="flex h-full items-center justify-end space-x-4">
      <NotificationIcon class="cursor-pointer dark:text-white" />

      <FullScreenIcon
        class="cursor-pointer dark:text-white"
        height="24"
        width="24"
      />

      <LanguageIcon class="cursor-pointer dark:text-white" />

      <SunIcon
        v-if="themeStore.themeMode === 'light'"
        class="cursor-pointer dark:text-white"
        @click="() => themeStore.changeThemeMode(themeStore.themeMode === 'light' ? 'dark' : 'light')"
      />
      <MoonIcon
        v-else
        class="cursor-pointer dark:text-white"
        @click="() => themeStore.changeThemeMode(themeStore.themeMode === 'light' ? 'dark' : 'light')"
      />

      <div
        v-if="userInfo.id"
        class="flex select-none items-center space-x-3"
      >
        <img
          v-if="userInfo.avatarUrl"
          class="h-8 w-8 cursor-pointer rounded-full"
          :src="userInfo.avatarUrl"
          alt=""
          @click="() => logout()"
        />
        <span class="text-sm">{{ userInfo.username }}</span>
      </div>
    </div>
  </header>
</template>
