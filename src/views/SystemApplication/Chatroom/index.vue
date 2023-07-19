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
const isMobileDevice = computed(() => BrowserUtils.isMobileDevice())

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
      <div class="visible flex justify-between font-bold sm:invisible">
        <NIcon
          size="20"
          color="#5865F2"
          :component="ArrowLeftIcon"
          @click="handleReturn"
        />
        <NDropdown
          trigger="hover"
          :options="options"
          @select="handleSelect"
        >
          <NIcon
            size="20"
            color="#5865F2"
            :component="UilEllipsisHIcon"
          />
        </NDropdown>
      </div>
      <component :is="isMobileDevice ? currentPage : Chatroom" />
    </div>
    <div class="hidden w-52 shrink-0 border border-gray-300 sm:block">
      <Online />
    </div>
  </main>
</template>
