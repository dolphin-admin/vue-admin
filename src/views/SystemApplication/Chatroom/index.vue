<script setup lang="ts">
import type { MessageSchema } from '@/types'
import ArrowLeftIcon from '~icons/ic/round-keyboard-arrow-left'
import UilEllipsisHIcon from '~icons/uil/ellipsis-h'

import { Channel, Chatroom, Online } from './components'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

type OptionKey = 'Channel' | 'Online'

const options = [
  {
    label: t('频道选择'),
    key: 'Channel'
  },
  {
    label: t('在线人数'),
    key: 'Online'
  }
]

const handleSelect = (key: OptionKey) => {
  switch (key) {
    case 'Channel':
      currentPage.value = Channel
      break
    case 'Online':
      currentPage.value = Online
      break
    default:
      break
  }
}

const currentPage = ref(Chatroom)

const handleReturn = () => {
  currentPage.value = Chatroom
}
</script>

<template>
  <main class="relative flex w-full justify-between">
    <div class="hidden w-52 shrink-0 border border-gray-300 sm:block">
      <Channel />
    </div>
    <div class="relative flex w-full flex-col border-gray-300 sm:flex-1 sm:border-y">
      <div class="visible flex justify-between sm:invisible">
        <NIcon @click="handleReturn"><component :is="ArrowLeftIcon" /></NIcon>
        <NDropdown
          trigger="hover"
          :options="options"
          @select="handleSelect"
        >
          <NIcon> <component :is="UilEllipsisHIcon" /></NIcon>
        </NDropdown>
      </div>
      <component :is="currentPage" />
    </div>
    <div class="hidden w-52 shrink-0 border border-gray-300 sm:block">
      <Online />
    </div>
  </main>
</template>
