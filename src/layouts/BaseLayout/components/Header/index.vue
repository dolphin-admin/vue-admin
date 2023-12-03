<script setup lang="ts">
import {
  Breadcrumb,
  DiscordButton,
  DocsButton,
  FullScreenButton,
  GitHubButton,
  LanguageButton,
  MenuVisibilityToggle,
  NotificationButton,
  SettingsButton,
  ThemeToggle,
  UserAvatar
} from './components'
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
      <FullScreenButton />
      <LanguageButton />
      <ThemeToggle />
      <NotificationButton />
      <SettingsButton />
      <UserAvatar />
    </div>
  </header>
</template>
