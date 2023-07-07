<script setup lang="ts">
import type { Lang, MessageSchema } from '@/types'
import UserAvatarIcon from '~icons/carbon/user-avatar-filled-alt'
import NotificationIcon from '~icons/ic/baseline-notifications-none'
import SettingIcon from '~icons/ic/outline-settings'
import FullScreenIcon from '~icons/ic/round-fullscreen'
import ExitFullscreenIcon from '~icons/ic/round-fullscreen-exit'
import LanguageIcon from '~icons/ion/language-outline'
import GithubIcon from '~icons/line-md/github-loop'
import HideMenuIcon from '~icons/line-md/menu-fold-left'
import ShowMenuIcon from '~icons/line-md/menu-fold-right'
import SunIcon from '~icons/line-md/moon-alt-to-sunny-outline-loop-transition'
import MoonIcon from '~icons/line-md/sunny-filled-loop-to-moon-alt-filled-loop-transition'

const { repoGitHubURL } = siteMetaData
const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()
const { openNewWindow } = BrowserUtils

const languageOptions = [
  { label: 'English', key: 'en_US' },
  { label: '简体中文', key: 'zh_CN' }
]

type UserOptionKey = 'Lock' | 'Quit' | 'UserInfo' | 'ChangePassword'

const themeStore = useThemeStore()
const sidebarStore = useSidebarStore()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n<{ message: MessageSchema }, Lang>({ useScope: 'global' })
const message = useMessage()

const userOptions = [
  {
    label: t('Header.UserCenter'),
    key: 'UserInfo'
  },
  {
    label: t('Header.ChangePassword'),
    key: 'ChangePassword'
  },
  {
    label: t('Header.LockScreen'),
    key: 'Lock'
  },
  {
    label: t('Header.Logout'),
    key: 'Quit'
  }
]

const logout = () => {
  AuthUtils.clearLocalStorage()
  userStore.clearUser()
  message.success(t('Logout.Success'))
  router.replace('/login')
}

const handleUpdateLocale = (lang: Lang) => {
  setTimeout(() => {
    locale.value = lang
    document.title = route.path === '/' ? t('App.Name') : `${t((route.meta?.title ?? '') as string)} | ${t('App.Name')}`
  }, 150)
  themeStore.changeLocale(lang)
  LangUtils.setLang(lang)
}

const selectUserOption = (key: UserOptionKey) => {
  switch (key) {
    case 'Lock':
      break
    case 'Quit':
      logout()
      break
    case 'UserInfo':
      router.push('/user-info')
      break
    case 'ChangePassword':
      router.push('/change-password')
      break
    default:
      break
  }
}

const currentLanguageOptions = computed(() =>
  locale.value === 'zh_CN' ? languageOptions : [languageOptions[1], languageOptions[0]]
)
</script>

<template>
  <header
    class="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-gray-300 bg-light-default p-4 shadow-sm dark:border-gray-950 dark:bg-dark-default"
  >
    <div class="flex h-full items-center justify-start space-x-3">
      <NTooltip
        placement="bottom"
        trigger="hover"
      >
        <template #trigger>
          <NIcon
            size="20"
            class="cursor-pointer"
            @click="() => sidebarStore.toggleSidebarDisplay()"
          >
            <component :is="sidebarStore.isDisplay ? HideMenuIcon : ShowMenuIcon" />
          </NIcon>
        </template>
        {{ t(sidebarStore.isDisplay ? 'Sidebar.Hide' : 'Sidebar.Show') }}
      </NTooltip>
    </div>

    <div class="flex h-full items-center justify-end space-x-4">
      <NTooltip
        placement="bottom"
        trigger="hover"
      >
        <template #trigger>
          <NIcon
            size="20"
            class="cursor-pointer"
            @click="() => openNewWindow(repoGitHubURL)"
          >
            <GithubIcon />
          </NIcon>
        </template>
        GitHub
      </NTooltip>

      <NTooltip
        placement="bottom"
        trigger="hover"
      >
        <template #trigger>
          <NIcon
            size="20"
            class="cursor-pointer"
          >
            <NotificationIcon />
          </NIcon>
        </template>
        {{ t('Header.Notification') }}
      </NTooltip>

      <NTooltip
        placement="bottom"
        trigger="hover"
      >
        <template #trigger>
          <NIcon
            size="24"
            class="hidden cursor-pointer sm:block"
            @click="toggleFullscreen"
          >
            <component :is="isFullscreen ? ExitFullscreenIcon : FullScreenIcon" />
          </NIcon>
        </template>
        {{ t(isFullscreen ? 'Header.ExitFullScreen' : 'Header.FullScreen') }}
      </NTooltip>

      <NDropdown
        trigger="hover"
        :options="currentLanguageOptions"
        @select="handleUpdateLocale"
      >
        <NIcon
          size="20"
          class="cursor-pointer"
        >
          <LanguageIcon />
        </NIcon>
      </NDropdown>

      <NTooltip
        placement="bottom"
        trigger="hover"
      >
        <template #trigger>
          <NIcon
            size="20"
            class="cursor-pointer"
          >
            <component
              :is="themeStore.themeMode === 'light' ? SunIcon : MoonIcon"
              @click="() => themeStore.changeThemeMode(themeStore.themeMode === 'light' ? 'dark' : 'light')"
            />
          </NIcon>
        </template>
        {{ t('Header.SwitchTheme') }}
      </NTooltip>

      <NTooltip
        placement="bottom"
        trigger="hover"
      >
        <template #trigger>
          <NIcon
            size="20"
            class="cursor-pointer"
          >
            <SettingIcon />
          </NIcon>
        </template>
        {{ t('Header.Settings') }}
      </NTooltip>

      <template v-if="userStore.hasData()">
        <NDropdown
          :options="userOptions"
          trigger="hover"
          @select="selectUserOption"
        >
          <template v-if="userStore.user.avatarUrl">
            <NAvatar
              class="cursor-pointer select-none shadow-md !transition-all hover:opacity-90 active:opacity-70"
              round
              size="small"
              :src="userStore.user.avatarUrl"
            />
          </template>
          <template v-else>
            <NIcon
              size="22"
              class="cursor-pointer"
            >
              <UserAvatarIcon />
            </NIcon>
          </template>
        </NDropdown>
      </template>
    </div>
  </header>
</template>
