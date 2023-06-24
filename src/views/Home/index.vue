<script setup lang="ts">
import { siteMetaData } from '@/constants'
import { useThemeStore } from '@/store'
import type { Lang, MessageSchema } from '@/types'
import { setLang } from '@/utils'

const themeStore = useThemeStore()
// @ts-ignore
const { t, locale } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const options = [
  { label: 'English', value: 'en_US' },
  { label: '简体中文', value: 'zh_CN' }
]

const handleUpdateLocale = (lang: Lang) => {
  themeStore.changeLocale(lang)
  setLang(lang)
}
</script>

<template>
  <main class="absolute inset-0 m-auto dark:bg-black">
    <div class="absolute inset-0 m-auto flex h-fit w-1/3 flex-col items-center space-y-4 pb-20 text-center">
      <img
        class="animate-pulse cursor-pointer select-none"
        width="160"
        height="160"
        src="@/assets/images/favicon.png"
        alt=""
        @click="() => themeStore.changeThemeMode(themeStore.themeMode === 'light' ? 'dark' : 'light')"
      />
      <div class="flex flex-col space-y-2">
        <span class="whitespace-nowrap text-2xl font-semibold">{{ t('App.Name') }}</span>
        <span class="text-base tracking-wider">v{{ siteMetaData.version }}</span>
      </div>
      <div class="flex items-center space-x-2 whitespace-nowrap">
        <span class="text-sm">{{ t('Language.Choose') }}</span>
        <NSelect
          v-model:value="locale"
          :options="options"
          :consistent-menu-width="false"
          size="small"
          @update:value="(e) => handleUpdateLocale(e)"
        />
      </div>
      <NDatePicker
        type="date"
        size="small"
      />
    </div>
  </main>
</template>
