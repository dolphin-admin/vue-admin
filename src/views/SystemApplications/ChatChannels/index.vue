<script setup lang="ts">
import type { MessageSchema } from '@/types'
import ArrowLeftIcon from '~icons/ic/round-keyboard-arrow-left'
import UilEllipsisHIcon from '~icons/uil/ellipsis-h'

import { ChannelList, ChatList, UserList } from './components'

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
      currentPage.value = ChannelList
      break
    case 'Online':
      currentPage.value = UserList
      break
    default:
      break
  }
}

const currentPage = ref(ChatList)

const handleReturn = () => {
  currentPage.value = ChatList
}

const isMobileDevice = computed(() => BrowserUtils.isMobileDevice())
</script>

<template>
  <main class="relative flex w-full justify-between">
    <div class="hidden w-52 shrink-0 border border-gray-300 sm:block">
      <ChannelList />
    </div>
    <div class="relative flex w-full flex-col border-gray-300 sm:flex-1 sm:border-y">
      <div class="visible flex justify-between sm:invisible sm:h-2">
        <NIcon
          size="20"
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
            :component="UilEllipsisHIcon"
          />
        </NDropdown>
      </div>
      <component :is="isMobileDevice ? currentPage : ChatList" />
    </div>
    <div class="hidden w-52 shrink-0 border border-gray-300 sm:block">
      <UserList />
    </div>
  </main>
</template>
