<script setup lang="ts">
import { UserApi } from '@/api'
import { useSidebarStore, useThemeStore } from '@/store'
import type { Lang, MessageSchema, User } from '@/types'
import { clearLang, clearTheme, clearToken, setLang } from '@/utils'
import NotificationIcon from '~icons/ic/baseline-notifications-none'
import LanguageIcon from '~icons/ion/language-outline'
import MenuFoldLeftIcon from '~icons/line-md/menu-fold-left'
import SunIcon from '~icons/line-md/moon-alt-to-sunny-outline-loop-transition'
import MoonIcon from '~icons/line-md/sunny-filled-loop-to-moon-alt-filled-loop-transition'
import FullScreenIcon from '~icons/material-symbols/fullscreen'
import SettingIcon from '~icons/material-symbols/settings-outline-rounded'

const themeStore = useThemeStore()
const sidebarStore = useSidebarStore()
const router = useRouter()
const message = useMessage()
// @ts-ignore
const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const userInfo = reactive<Partial<User>>({})
const options = [
  { label: 'English', key: 'en_US' },
  { label: '简体中文', key: 'zh_CN' }
]
const optionsUser = [
  {
    label: '锁定屏幕',
    key: 'marina bay sands'
  },
  {
    label: '退出系统',
    key: 'marina bay sands'
  }
]
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

const handleUpdateLocale = (lang: Lang) => {
  themeStore.changeLocale(lang)
  setLang(lang)
  // locale.value = lang
}

const handleCollapseMenu = () => {
  sidebarStore.changeSidebarStatus(true)
}
</script>

<template>
  <header
    class="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-gray-300 bg-light-default p-4 shadow-sm dark:border-gray-950 dark:bg-dark-default"
  >
    <div
      class="flex h-full items-center justify-start"
      @click="handleCollapseMenu"
    >
      <component :is="MenuFoldLeftIcon"></component>
    </div>

    <div class="flex h-full items-center justify-end space-x-4">
      <NTooltip
        placement="bottom"
        trigger="hover"
      >
        <template #trigger>
          <NotificationIcon class="cursor-pointer dark:text-white" />
        </template>
        <span class="dark:text-white">{{ t('HeaderInfo.Notification') }}</span>
      </NTooltip>
      <NTooltip
        placement="bottom"
        trigger="hover"
      >
        <template #trigger>
          <FullScreenIcon
            class="cursor-pointer dark:text-white"
            height="24"
            width="24"
          />
        </template>
        <span class="dark:text-white">{{ t('HeaderInfo.FullScreen') }}</span>
      </NTooltip>
      <NDropdown
        trigger="click"
        :options="options"
        @select="handleUpdateLocale"
      >
        <NTooltip
          placement="bottom"
          trigger="hover"
        >
          <template #trigger>
            <LanguageIcon class="cursor-pointer dark:text-white" />
          </template>
          <span class="dark:text-white">{{ t('HeaderInfo.language') }}</span>
        </NTooltip>
      </NDropdown>
      <NTooltip
        placement="bottom"
        trigger="hover"
      >
        <template #trigger>
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
        </template>
        <span class="dark:text-white">{{ t('HeaderInfo.SwitchingTheme') }}</span>
      </NTooltip>
      <NDropdown
        :options="optionsUser"
        trigger="hover"
      >
        <div class="flex select-none items-center space-x-3">
          <img
            v-if="userInfo.avatarUrl"
            class="h-8 w-8 cursor-pointer rounded-full"
            :src="userInfo.avatarUrl"
            alt=""
            @click="() => logout()"
          />
          <span class="text-sm">{{ userInfo.username }}</span>
        </div>
      </NDropdown>
      <NTooltip
        placement="bottom"
        trigger="hover"
      >
        <template #trigger>
          <SettingIcon class="cursor-pointer dark:text-white" />
        </template>
        <span class="dark:text-white">{{ t('HeaderInfo.Setting') }}</span>
      </NTooltip>
    </div>
  </header>
</template>
