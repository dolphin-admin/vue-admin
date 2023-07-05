<script setup lang="ts">
import type { Lang } from '@/types'
import UserAvatarIcon from '~icons/carbon/user-avatar-filled-alt'
import NotificationIcon from '~icons/ic/baseline-notifications-none'
import LanguageIcon from '~icons/ion/language-outline'
import HideMenuIcon from '~icons/line-md/menu-fold-left'
import ShowMenuIcon from '~icons/line-md/menu-fold-right'
import SunIcon from '~icons/line-md/moon-alt-to-sunny-outline-loop-transition'
import MoonIcon from '~icons/line-md/sunny-filled-loop-to-moon-alt-filled-loop-transition'
import SettingIcon from '~icons/material-symbols/settings-outline-rounded'
import FullScreenIcon from '~icons/mdi/fullscreen'
import FullscreenExitIcon from '~icons/mdi/fullscreen-exit'
import GithubIcon from '~icons/mdi/github'

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
const message = useMessage()
// @ts-ignore
const { t, locale } = useI18n<{ message: MessageSchema }, Lang>({ useScope: 'global' })

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

const isChangePassword = ref(false)
const changePasswordRef = ref<FormInst | null>(null)
const changePasswordData = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const changePasswordRules: FormRules = {
  oldPassword: [
    {
      required: true,
      message: t('Common.OldPassword'),
      trigger: ['blur', 'input']
    }
  ],
  newPassword: [
    {
      required: true,
      message: t('Common.Validation.Password'),
      trigger: ['blur', 'input']
    },
    {
      validator: (rule: FormItemRule, value: string) => value.length >= 6,
      trigger: ['blur', 'input'],
      message: t('Common.Validation.PasswordLength')
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: t('Common.Validation.ConfirmPassword'),
      trigger: ['blur', 'input']
    },
    {
      validator: (rule: FormItemRule, value: string) => value === changePasswordData.newPassword,
      message: t('Common.Validation.ConfirmPasswordNotMatch')
    }
  ]
}

const logout = () => {
  AuthUtils.clearToken()
  LangUtils.clearLang()
  ThemeUtils.clearTheme()
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
      isChangePassword.value = true
      break
    default:
      break
  }
}

const handleChangePassword = () => {
  changePasswordRef.value!.validate((errors) => {
    if (errors) {
      message.error(errors[0][0].message!)
      return
    }
    UserAPI.changePassword(userStore.user.id!, changePasswordData)
      .then((res) => {
        message.success(res.message!)
      })
      .catch((err) => {
        message.error(err.message!)
      })
  })
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
          <component
            :is="sidebarStore.isDisplay ? HideMenuIcon : ShowMenuIcon"
            class="cursor-pointer"
            @click="() => sidebarStore.toggleSidebarDisplay()"
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
          <GithubIcon
            class="cursor-pointer dark:text-white"
            @click="() => openNewWindow(repoGitHubURL)"
          />
        </template>
        <span class="dark:text-white">{{ t('Header.Github') }}</span>
      </NTooltip>
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
          <component
            :is="isFullscreen ? FullscreenExitIcon : FullScreenIcon"
            class="hidden cursor-pointer dark:text-white sm:block"
            height="24"
            width="24"
            @click="toggleFullscreen"
          />
        </template>
        <span class="dark:text-white">{{ t(isFullscreen ? 'Header.ExitFullScreen' : 'Header.FullScreen') }} </span>
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

      <NTooltip
        placement="bottom"
        trigger="hover"
      >
        <template #trigger>
          <SettingIcon class="cursor-pointer dark:text-white" />
        </template>
        <span class="dark:text-white">{{ t('Header.Settings') }}</span>
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
            <NAvatar
              class="cursor-pointer select-none shadow-md"
              round
              object-fit="cover"
              size="small"
              style="background-color: inherit"
            >
              <NIcon size="24">
                <UserAvatarIcon class="text-black dark:text-white" />
              </NIcon>
            </NAvatar>
          </template>
        </NDropdown>
      </template>
    </div>
  </header>
  <NModal
    v-model:show="isChangePassword"
    preset="dialog"
    :title="t('Common.ChangePassword')"
    :positive-text="t('Common.Confirm')"
    :negative-text="t('Common.Cancer')"
    @positive-click="handleChangePassword"
  >
    <NForm
      ref="changePasswordRef"
      :model="changePasswordData"
      :rules="changePasswordRules"
    >
      <NFormItem
        path="oldPassword"
        :label="t('Common.OldPassword')"
      >
        <NInput
          v-model:value="changePasswordData.oldPassword"
          type="password"
          :placeholder="t('Common.Password')"
          show-password-on="click"
          :input-props="{ autocomplete: 'oldPassword' }"
          @keydown.enter="handleChangePassword"
        />
      </NFormItem>
      <NFormItem
        path="newPassword"
        :label="t('Common.NewPassword')"
      >
        <NInput
          v-model:value="changePasswordData.newPassword"
          type="password"
          :placeholder="t('Common.Password')"
          show-password-on="click"
          :input-props="{ autocomplete: 'new-password' }"
          @keydown.enter="handleChangePassword"
        />
      </NFormItem>
      <NFormItem
        path="confirmPassword"
        :label="t('Common.ConfirmPassword')"
      >
        <NInput
          v-model:value="changePasswordData.confirmPassword"
          type="password"
          :placeholder="t('Common.Password')"
          show-password-on="click"
          @keydown.enter="handleChangePassword"
        />
      </NFormItem>
    </NForm>
  </NModal>
</template>
