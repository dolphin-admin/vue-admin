<script setup lang="ts">
import type { MessageSchema, Tab } from '@/types'
import MenuIcon from '~icons/ic/round-grid-view'
import ArrowIcon from '~icons/line-md/arrow-left'

import type { ScrollDirection, TabsOptionKey } from './private'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const route = useRoute()
const router = useRouter()
const tabStore = useTabStore()

let scrollInterval: ReturnType<typeof setInterval> | null = null

const scrollbarRef = ref<HTMLElement | null>(null)

// 滚动动画 Id，配合 requestAnimationFrame 使用
let animationFrameId: number | null = null

const tabsOptions = [
  {
    label: t('Tab.Clear'),
    key: 'CLEAR_ALL_TAGS'
  }
]

const handleCloseTab = (tab: Tab, index: number) => {
  if (tab.href === route.path && tabStore.tabs.length > 1) {
    router.push(tabStore.tabs[index - 1].href)
  } else {
    router.push(tabStore.tabs[index + 1].href)
  }

  // 如果标签页为空，则跳转到首页
  if (tabStore.tabs.length === 1 && tab.href !== '/') {
    router.push('/')
  }

  tabStore.removeTabItem(index)
}

/**
 * 选项卡右侧下拉列表
 * @param key 选项key
 */
const selectTabsOption = (key: TabsOptionKey) => {
  switch (key) {
    case 'CLEAR_ALL_TABS':
      tabStore.clearAllTabs(route.path)
      break
    default:
      break
  }
}

/**
 * 向左滚动
 */
const scrollLeft = () => {
  if (scrollbarRef.value) {
    const currentScrollLeft = scrollbarRef.value.scrollLeft
    animationFrameId = BrowserUtils.smoothScroll({
      element: scrollbarRef.value,
      target: currentScrollLeft - 100,
      animationFrameId
    })
  }
}

/**
 * 向右滚动
 */
const scrollRight = () => {
  if (scrollbarRef.value) {
    const currentScrollLeft = scrollbarRef.value.scrollLeft
    animationFrameId = BrowserUtils.smoothScroll({
      element: scrollbarRef.value,
      target: currentScrollLeft + 100,
      animationFrameId
    })
  }
}

/**
 * 处理滚动
 * @param direction 滚动方向
 */
const handleScroll = (direction: ScrollDirection) => {
  switch (direction) {
    case 'left':
      scrollLeft() // 立即调用一次，满足场景：点击一下，滚动一下
      scrollInterval = setInterval(() => scrollLeft(), 100)
      break
    case 'right':
      scrollRight() // 立即调用一次，满足场景：点击一下，滚动一下
      scrollInterval = setInterval(() => scrollRight(), 100)
      break
    default:
      break
  }
}

/**
 * 停止滚动
 * @description
 * 1. 清除定时器
 * 2. 清除动画帧
 */
const scrollStop = () => {
  if (scrollInterval) {
    clearInterval(scrollInterval)
  }
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

/**
 * 计算属性：判断是否有滚动条
 */
const haveScrollBar = () => {
  if (scrollbarRef.value) {
    return scrollbarRef.value.scrollWidth > scrollbarRef.value.clientWidth
  }
  return false
}
</script>

<template>
  <main
    class="flex h-12 w-full items-center justify-between border-b border-gray-300 bg-light-default px-2 py-1 shadow dark:border-gray-950 dark:bg-dark-default sm:px-4"
  >
    <div
      ref="scrollbarRef"
      class="global_hide-scrollbar flex w-full items-center space-x-2 overflow-x-auto"
    >
      <NTag
        v-for="(tagItem, index) in tabStore.tabs"
        :key="index"
        class="!cursor-pointer !select-none"
        :type="route.path === tagItem.href ? 'primary' : 'default'"
        :closable="!(tabStore.tabs.length === 1 && tagItem.href === '/')"
        @click="() => router.push(tagItem.href)"
        @close="() => handleCloseTab(tagItem, index)"
      >
        {{ t(tagItem.labelKey) }}
        <template #icon>
          <NIcon :component="tagItem.icon" />
        </template>
      </NTag>
    </div>

    <NDivider
      vertical
      class="mx-2 sm:mx-4"
    />

    <div class="flex shrink-0 items-center space-x-0 sm:space-x-4">
      <div
        class="hidden h-fit cursor-pointer items-center sm:flex"
        :class="[haveScrollBar() ? 'sm:flex' : 'sm:hidden']"
        @mousedown="handleScroll('left')"
        @mouseleave="scrollStop"
        @mouseup="scrollStop"
      >
        <NIcon
          size="18"
          :component="ArrowIcon"
        />
      </div>

      <div
        class="hidden !rotate-180 cursor-pointer items-center sm:flex"
        :class="[haveScrollBar() ? 'sm:flex' : 'sm:hidden']"
        @mousedown="handleScroll('right')"
        @mouseleave="scrollStop"
        @mouseup="scrollStop"
      >
        <NIcon
          size="18"
          :component="ArrowIcon"
        />
      </div>

      <NDropdown
        trigger="hover"
        :options="tabsOptions"
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
