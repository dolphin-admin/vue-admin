<script setup lang="ts">
import { Lang } from '@dolphin-admin/utils'

import type { MessageSchema } from '@/types'
import UserAvatarIcon from '~icons/carbon/user-avatar-filled-alt'
import NotificationIcon from '~icons/ic/baseline-notifications-none'
import SettingIcon from '~icons/ic/outline-settings'
import FullScreenIcon from '~icons/ic/round-fullscreen'
import ExitFullscreenIcon from '~icons/ic/round-fullscreen-exit'
import LanguageIcon from '~icons/ion/language-outline'
import DiscordIcon from '~icons/line-md/discord'
import DocsIcon from '~icons/line-md/document-list'
import GithubIcon from '~icons/line-md/github-loop'
import HideMenuIcon from '~icons/line-md/menu-fold-left'
import ShowMenuIcon from '~icons/line-md/menu-fold-right'
import SunIcon from '~icons/line-md/moon-alt-to-sunny-outline-loop-transition'
import MoonIcon from '~icons/line-md/sunny-filled-loop-to-moon-alt-filled-loop-transition'

enum UserAction {
  'USER.INFO',
  'CHANGE.PASSWORD',
  'QUIT'
}

defineOptions({
  name: 'BaseHeader'
})

const { t } = useI18n<{ message: MessageSchema }>()

const { REPO_GITHUB_URL, DISCORD_URL, DOCS_URL } = AppMetadata

const langStore = useLangStore()
const themeStore = useThemeStore()
const sidebarStore = useSidebarStore()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const message = useMessage()
const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()

const languages = ref([
  { label: 'English', key: Lang['en-US'], disabled: false },
  { label: '简体中文', key: Lang['zh-CN'], disabled: false }
])

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
 * 重置语言选项，当前语言不可选
 */
const resetLanguageOptions = (lang: string) =>
  setTimeout(() => {
    languages.value = languages.value.map((language) => ({
      ...language,
      disabled: language.key === lang
    }))
  }, 150)

/**
 * 更新语言
 * @param lang 语言
 * @description
 * - 为了更好的用户体验（因为下拉框选项消失的过渡动画），这里延迟 150ms 执行更新语言的操作
 * - 更新 Document 的标题
 * - 将选择的语言存储到 localStorage 中，以便下次进入应用时加载上次选择的语言
 */
const handleUpdateLang = (lang: string) => {
  resetLanguageOptions(lang)
  langStore.setLang(lang)
  SiteUtils.setDocumentTitle(route.meta.title)
}

/**
 * 退出登录
 */
const logout = () =>
  router.replace('/login').then(() => {
    message.success(t('TEMP.Logout.Success'))
    userStore.clearUser()
    AuthUtils.clearToken()
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

onMounted(() => resetLanguageOptions(langStore.lang))
</script>

<template>
  <header
    class="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-y border-gray-300 bg-default-light p-2 dark:border-gray-950 dark:bg-default-dark sm:p-4"
  >
    <div class="flex h-full items-center justify-start space-x-3">
      <NTooltip
        placement="bottom"
        trigger="hover"
      >
        <template #trigger>
          <NIcon
            class="cursor-pointer"
            size="20"
            :component="sidebarStore.isDisplay ? HideMenuIcon : ShowMenuIcon"
            @click="sidebarStore.toggleDisplay"
          />
        </template>
        {{ sidebarStore.isDisplay ? t('TEMP.Sidebar.Hide') : t('TEMP.Sidebar.Show') }}
      </NTooltip>

      <BaseBreadcrumb />
    </div>

    <div class="flex h-full items-center justify-end space-x-4">
      <NTooltip
        placement="bottom"
        trigger="hover"
      >
        <template #trigger>
          <NIcon
            class="cursor-pointer"
            size="20"
            color="#5865F2"
            :component="DiscordIcon"
            @click="() => BrowserUtils.openNewWindow(DISCORD_URL)"
          />
        </template>
        Discord
      </NTooltip>

      <NTooltip
        placement="bottom"
        trigger="hover"
      >
        <template #trigger>
          <NIcon
            class="cursor-pointer"
            size="20"
            :component="GithubIcon"
            @click="() => BrowserUtils.openNewWindow(REPO_GITHUB_URL)"
          />
        </template>
        GitHub
      </NTooltip>

      <NTooltip
        placement="bottom"
        trigger="hover"
      >
        <template #trigger>
          <NIcon
            class="cursor-pointer"
            size="20"
            :component="DocsIcon"
            @click="() => BrowserUtils.openNewWindow(DOCS_URL)"
          />
        </template>
        {{ t('COMMON.Docs') }}
      </NTooltip>

      <template v-if="false">
        <NTooltip
          placement="bottom"
          trigger="hover"
        >
          <template #trigger>
            <NIcon
              class="cursor-pointer"
              size="20"
              :component="NotificationIcon"
            />
          </template>
          {{ t('TEMP.Header.Notification') }}
        </NTooltip>
      </template>

      <NTooltip
        placement="bottom"
        trigger="hover"
      >
        <template #trigger>
          <NIcon
            class="hidden cursor-pointer sm:block"
            size="24"
            :component="isFullscreen ? ExitFullscreenIcon : FullScreenIcon"
            @click="toggleFullscreen"
          />
        </template>
        {{ t(isFullscreen ? 'TEMP.Header.ExitFullScreen' : 'TEMP.Header.FullScreen') }}
      </NTooltip>

      <NDropdown
        trigger="hover"
        :options="languages"
        @select="handleUpdateLang"
      >
        <NIcon
          class="cursor-pointer"
          size="20"
          :component="LanguageIcon"
        />
      </NDropdown>

      <NTooltip
        placement="bottom"
        trigger="hover"
      >
        <template #trigger>
          <NIcon
            class="cursor-pointer"
            size="20"
            :color="themeStore.isLightTheme ? '#FDC022' : '#FED736'"
            :component="themeStore.isDarkTheme ? SunIcon : MoonIcon"
            @click="() => themeStore.toggleTheme()"
          />
        </template>
        {{ t('TEMP.Header.SwitchTheme') }}
      </NTooltip>

      <template v-if="false">
        <NTooltip
          placement="bottom"
          trigger="hover"
        >
          <template #trigger>
            <NIcon
              class="cursor-pointer"
              size="20"
              :component="SettingIcon"
            />
          </template>
          {{ t('TEMP.Header.Settings') }}
        </NTooltip>
      </template>

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
    </div>
  </header>
</template>
