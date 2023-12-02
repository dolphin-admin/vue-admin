<script setup lang="ts">
import type { MessageSchema } from '@/types'
import NotificationIcon from '~icons/ic/baseline-notifications-none'
import SettingIcon from '~icons/ic/outline-settings'

import {
  Breadcrumb,
  DiscordButton,
  DocsButton,
  FullScreenButton,
  GitHubButton,
  LanguageButton,
  MenuVisibilityToggle,
  ThemeToggle,
  UserAvatar
} from './components'

const { t } = useI18n<{ message: MessageSchema }>()
</script>

<template>
  <header
    class="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-y border-gray-300 bg-default-light p-2 dark:border-gray-950 dark:bg-default-dark sm:p-4"
  >
    <div class="flex h-full items-center justify-start space-x-3">
      <MenuVisibilityToggle />
      <Breadcrumb />
    </div>

    <div class="flex h-full items-center justify-end space-x-4">
      <DiscordButton />
      <GitHubButton />
      <DocsButton />
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
      <FullScreenButton />
      <LanguageButton />
      <ThemeToggle />
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
      <UserAvatar />
    </div>
  </header>
</template>
