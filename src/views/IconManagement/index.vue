<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

import { IconApi } from '@/api'
import { iconSetList } from '@/constants'
import { useLoading } from '@/hooks'
import type { IconItem, MessageSchema } from '@/types'
import SearchIcon from '~icons/ic/sharp-search'

const iconList = ref<IconItem[]>([])
const searchParams = reactive({
  iconSet: '',
  searchText: ''
})

const message = useMessage()
const [fetchLoading, fetchLoadingDispatcher] = useLoading()
// @ts-ignore
const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const handleSearch = (value: string) => {}

const getIcons = () => {
  fetchLoadingDispatcher.loading()
  IconApi.getIconsBySet(searchParams.iconSet)
    .then((res) => {
      const { uncategorized } = res
      iconList.value =
        uncategorized
          ?.filter((_, index) => index < 10)
          .map((item) => {
            const path = `~icons/${searchParams.iconSet}/${item}`
            return {
              label: item,
              component: shallowRef(defineAsyncComponent(() => import(/* @vite-ignore */ path)))
            }
          }) ?? []
    })
    .finally(() => {
      fetchLoadingDispatcher.loaded()
    })
}

const handleIconSetChange = (key: string) => {
  if (key === searchParams.iconSet) return
  if (fetchLoading.value) {
    message.warning('正在获取图标数据...')
    return
  }
  searchParams.iconSet = key
  getIcons()
}

onBeforeMount(() => {
  // iconData.value = iconList.map((item) => ({
  //   ...item,
  //   component: shallowRef(defineAsyncComponent(() => import('~icons/line-md/account')))
  // })) as any
  searchParams.iconSet = iconSetList[0].key
  getIcons()
})
</script>

<template>
  <div class="flex w-full flex-col items-center space-y-4">
    <div class="flex items-center justify-start space-x-4 pt-2">
      <NTag
        v-for="(iconSetItem, index) in iconSetList"
        :key="index"
        class="!cursor-pointer !transition-transform hover:scale-110"
        :type="searchParams.iconSet === iconSetItem.key ? 'primary' : 'default'"
        @click="() => handleIconSetChange(iconSetItem.key)"
      >
        {{ iconSetItem.label }}
      </NTag>
    </div>
    <div class="w-full px-2 sm:w-3/5">
      <NInput
        size="large"
        :placeholder="t('IconManagement.Tip.Search')"
        clearable
        autofocus
        @input="handleSearch"
      >
        <template #prefix>
          <NIcon
            size="20"
            :component="SearchIcon"
          />
        </template>
      </NInput>
    </div>

    <div class="flex w-full flex-row flex-wrap items-center">
      <div
        v-for="(iconItem, index) in iconList"
        :key="index"
        class="mb-5 h-16 w-1/2 cursor-pointer px-3 md:w-1/3 lg:w-1/4"
      >
        <div
          class="flex h-full w-full items-center justify-start space-x-3 rounded-md bg-gray-200 pl-3 shadow-sm dark:bg-gray-700"
        >
          <component
            :is="iconItem.component"
            class="h-6 w-6 shrink-0"
          />
          <div class="space-y-1">
            <div>material</div>
            <div class="text-xs">{{ iconItem.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
