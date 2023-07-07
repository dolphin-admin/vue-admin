<script setup lang="ts">
import type { MessageSchema, Tab } from '@/types'
import MenuIcon from '~icons/ic/round-grid-view'
import ArrowIcon from '~icons/line-md/arrow-left'

const tabStore = useTabStore()
const route = useRoute()
const router = useRouter()
const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

type TabsOptionKey = 'CLEAR_ALL_TAGS'

const options = [
  {
    label: t('Tab.Clear'),
    key: 'CLEAR_ALL_TAGS'
  }
]

const handleCloseTab = (tab: Tab, index: number) => {
  const baseTabLength = tabStore.tabs.length
  if (baseTabLength === 1) {
    router.push(tab.href)
    return
  }
  router.push(tabStore.tabs[index - 1].href)
  tabStore.removeTabItem(index)
}

const handleClearAllTabs = () => tabStore.clearAllTabs(route.path)

const selectTabsOption = (key: TabsOptionKey) => {
  switch (key) {
    case 'CLEAR_ALL_TAGS':
      handleClearAllTabs()
      break
    default:
      break
  }
}
</script>

<template>
  <main
    class="flex h-12 w-full items-center justify-between border-b border-gray-300 bg-light-default px-2 py-1 shadow dark:border-gray-950 dark:bg-dark-default sm:px-4"
  >
    <NScrollbar x-scrollable>
      <NTag
        v-for="(tagItem, index) in tabStore.tabs"
        :key="index"
        closable
        class="!cursor-pointer !select-none"
        :type="route.path === tagItem.href ? 'primary' : 'default'"
        @click="() => router.push(tagItem.href)"
        @close="() => handleCloseTab(tagItem, index)"
      >
        {{ t(tagItem.labelKey) }}
        <template #icon>
          <NIcon :component="tagItem.icon" />
        </template>
      </NTag>
    </NScrollbar>

    <NDivider
      vertical
      class="mx-2 sm:mx-4"
    />

    <div class="flex shrink-0 items-center space-x-0 sm:space-x-4">
      <div class="hidden h-fit cursor-pointer items-center sm:flex">
        <NIcon
          size="18"
          :component="ArrowIcon"
        />
      </div>

      <div class="hidden !rotate-180 cursor-pointer items-center sm:flex">
        <NIcon
          size="18"
          :component="ArrowIcon"
        />
      </div>

      <NDropdown
        trigger="hover"
        :options="options"
        @select="selectTabsOption"
      >
        <NIcon
          size="20"
          class="cursor-pointer"
          :component="MenuIcon"
        />
      </NDropdown>
    </div>
  </main>
</template>

<style scoped lang="scss">
:deep(.n-scrollbar-content) {
  height: 100%;
  display: flex;
  align-items: center;
  > :not([hidden]) ~ :not([hidden]) {
    margin-left: 8px;
  }
}

:deep(.n-scrollbar) {
  > .n-scrollbar-rail.n-scrollbar-rail--horizontal {
    bottom: -2px !important;
  }
}
</style>
