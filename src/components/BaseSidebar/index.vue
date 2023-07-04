<script setup lang="ts">
import type { CustomMenuOption, Lang } from '@/types'
import CollapseIcon from '~icons/line-md/chevron-triple-left'

import { menuOptions } from './models'

const themeStore = useThemeStore()
const sidebarStore = useSidebarStore()
const route = useRoute()
const router = useRouter()

// @ts-ignore
const { t, locale } = useI18n<{ message: MessageSchema }, Lang>({ useScope: 'global' })

const menuData = ref<any>(menuOptions)

const currentRouteName = computed(() => route.name as string)

const getLabel = (menuItem: CustomMenuOption) => {
  const { menuType, label, labelKey, path } = menuItem || {}
  const exactLabel = labelKey ? t(labelKey) : label
  switch (menuType) {
    case 'label':
      return exactLabel
    case 'routerLink':
      return () =>
        h(
          RouterLink,
          {
            to: path ?? '/'
          },
          {
            default: () => exactLabel as string
          }
        )
    default:
      return label
  }
}

watch(
  () => locale.value,
  () => {
    menuData.value = menuOptions.map((item: any) => {
      const currentItem = item as CustomMenuOption
      return {
        ...item,
        label: getLabel(currentItem),
        children: item.children?.map((childItem: any) => {
          const currentChildItem = childItem as CustomMenuOption
          return {
            ...currentChildItem,
            label: getLabel(currentChildItem)
          }
        })
      }
    })
  }
)
</script>

<template>
  <div
    class="absolute inset-0 z-[75] bg-black opacity-40 sm:hidden"
    :class="sidebarStore.isDisplay ? 'block' : 'hidden'"
    @click="() => sidebarStore.toggleSidebarDisplay()"
  />
  <div
    class="absolute inset-y-0 left-0 z-[100] h-full border-r border-gray-300 bg-light-default shadow-sm transition-[width] dark:border-gray-950 dark:bg-dark-default sm:static"
    :class="[sidebarStore.isDisplay ? (sidebarStore.isCollapse ? 'w-16' : 'w-56') : 'w-0']"
  >
    <div class="flex h-16 w-full select-none items-center justify-center">
      <img
        class="animate-pulse cursor-pointer select-none"
        width="36"
        height="36"
        src="@/assets/images/favicon.png"
        alt=""
        loading="eager"
        @click="() => themeStore.changeThemeMode(themeStore.themeMode === 'light' ? 'dark' : 'light')"
      />
      <span
        class="cursor-pointer whitespace-nowrap text-sm tracking-wide transition-all"
        :class="[sidebarStore.isDisplay ? (sidebarStore.isCollapse ? 'ml-0 hidden' : 'ml-3 w-auto') : 'hidden']"
        @click="() => router.push('/')"
      >
        {{ t('App.Name') }}
      </span>
    </div>
    <div class="h-[calc(100%-112px)]">
      <NScrollbar :size="10">
        <NMenu
          :collapsed-icon-size="20"
          :collapsed="sidebarStore.isCollapse"
          :options="menuData"
          :collapsed-width="64"
          :root-indent="18"
          :indent="26"
          :value="currentRouteName"
        />
      </NScrollbar>
    </div>
    <div class="h-12 w-full p-1">
      <div
        class="flex h-full w-full cursor-pointer items-center justify-center rounded-sm transition-all hover:bg-gray-200 active:opacity-75 dark:hover:bg-gray-600"
        @click="() => sidebarStore.toggleSidebarCollapse()"
      >
        <CollapseIcon
          class="dark:text-white"
          :class="[sidebarStore.isCollapse ? 'rotate-180' : 'rotate-0']"
          width="20"
        />
      </div>
    </div>
  </div>
</template>
