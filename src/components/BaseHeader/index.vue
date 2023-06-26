<script setup lang="ts">
import { UserApi } from '@/api'
import { useSidebarStore, useThemeStore } from '@/store'
import type { Lang, MessageSchema, User } from '@/types'
import { clearLang, clearTheme, clearToken, setLang } from '@/utils'
import NotificationIcon from '~icons/ic/baseline-notifications-none'
import LanguageIcon from '~icons/ion/language-outline'
import CollapseMenuIcon from '~icons/line-md/menu-fold-left'
import ExpandMenuIcon from '~icons/line-md/menu-fold-right'
import SunIcon from '~icons/line-md/moon-alt-to-sunny-outline-loop-transition'
import MoonIcon from '~icons/line-md/sunny-filled-loop-to-moon-alt-filled-loop-transition'
import FullScreenIcon from '~icons/material-symbols/fullscreen'
import SettingIcon from '~icons/material-symbols/settings-outline-rounded'

const languageOptions = [
  { label: 'English', key: 'en_US' },
  { label: '简体中文', key: 'zh_CN' }
]

const userOptions = [
  {
    label: '锁定屏幕',
    key: 'Lock'
  },
  {
    label: '退出登录',
    key: 'Quit'
  }
]

type UserOptionKey = 'Lock' | 'Quit'

const themeStore = useThemeStore()
const sidebarStore = useSidebarStore()
const router = useRouter()
const message = useMessage()
// @ts-ignore
const { t, locale } = useI18n<{ message: MessageSchema }, Lang>({ useScope: 'global' })

const userInfo = reactive<Partial<User>>({})

const handleCollapseMenu = () => sidebarStore.toggleSidebarStatus()

const logout = () => {
  clearToken()
  clearLang()
  clearTheme()
  message.success(t('Logout.Success'))
  router.replace('/login')
}

const handleUpdateLocale = (lang: Lang) => {
  setTimeout(() => {
    locale.value = lang
  }, 150)
  themeStore.changeLocale(lang)
  setLang(lang)
}

const selectUserOption = (key: UserOptionKey) => {
  switch (key) {
    case 'Lock':
      break
    case 'Quit':
      logout()
      break
    default:
      break
  }
}

const currentLanguageOptions = computed(() =>
  locale.value === 'zh_CN' ? languageOptions : [languageOptions[1], languageOptions[0]]
)

onMounted(() => {
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
    class="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-gray-300 bg-light-default p-4 shadow-sm dark:border-gray-950 dark:bg-dark-default"
  >
    <div
      class="flex h-full items-center justify-start"
      @click="handleCollapseMenu"
    >
      <NTooltip
        placement="bottom"
        trigger="hover"
      >
        <template #trigger>
          <component
            :is="sidebarStore.isCollapse ? ExpandMenuIcon : CollapseMenuIcon"
            class="cursor-pointer"
          />
        </template>
        <span class="dark:text-white">{{ t(sidebarStore.isCollapse ? 'Sidebar.Expand' : 'Sidebar.Collapse') }}</span>
      </NTooltip>
    </div>

    <div class="flex h-full items-center justify-end space-x-4">
      <NTooltip
        placement="bottom"
        trigger="hover"
      >
        <template #trigger>
          <NotificationIcon class="cursor-pointer dark:text-white" />
        </template>
        <span class="dark:text-white">{{ t('Header.Notification') }}</span>
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
        <span class="dark:text-white">{{ t('Header.FullScreen') }}</span>
      </NTooltip>

      <NDropdown
        trigger="click"
        :options="currentLanguageOptions"
        @select="handleUpdateLocale"
      >
        <NTooltip
          placement="bottom"
          trigger="hover"
        >
          <template #trigger>
            <LanguageIcon class="cursor-pointer dark:text-white" />
          </template>
          <span class="dark:text-white">{{ t('Header.Language') }}</span>
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
        <span class="dark:text-white">{{ t('Header.SwitchTheme') }}</span>
      </NTooltip>

      <NDropdown
        :options="userOptions"
        trigger="hover"
        @select="selectUserOption"
      >
        <div class="flex cursor-pointer select-none items-center space-x-3">
          <img
            v-if="userInfo.avatarUrl"
            class="h-8 w-8 cursor-pointer rounded-full"
            :src="userInfo.avatarUrl"
            alt=""
            loading="eager"
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
        <span class="dark:text-white">{{ t('Header.Settings') }}</span>
      </NTooltip>
    </div>
  </header>
</template>
