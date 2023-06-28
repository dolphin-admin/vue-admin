<script setup lang="ts">
import { useSidebarStore, useThemeStore } from '@/store'
import type { CustomMenuOption, Lang } from '@/types'
import { renderRouterLink } from '@/utils'

import { menuOptions } from './model'

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
      return renderRouterLink(exactLabel as string, path ?? '/')
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
    class="absolute z-[100] h-full border-r border-gray-300 bg-light-default shadow-sm transition-[width] duration-500 dark:border-gray-950 dark:bg-dark-default sm:static"
    :class="[sidebarStore.isCollapse ? 'w-0 sm:w-16' : ' inset-y-0 left-0 w-56 sm:w-56']"
  >
    <div class="flex h-16 w-full select-none items-center justify-center space-x-3">
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
        v-show="!sidebarStore.isCollapse"
        class="cursor-pointer whitespace-nowrap text-sm tracking-wide"
        @click="() => router.push('/')"
      >
        {{ t('App.Name') }}
      </span>
    </div>
    <div class="h-[calc(100%-64px)]">
      <NScrollbar :size="10">
        <NMenu
          :collapsed-icon-size="20"
          :collapsed="sidebarStore.isCollapse"
          :options="menuData"
          :collapsed-width="64"
          :root-indent="18"
          :indent="28"
          :value="currentRouteName"
        />
      </NScrollbar>
    </div>
  </div>
  <div
    class="absolute inset-0 z-[75] bg-black opacity-40 sm:hidden"
    :class="sidebarStore.isCollapse ? 'hidden' : 'block'"
    @click="() => sidebarStore.toggleSidebarStatus()"
  ></div>
</template>
