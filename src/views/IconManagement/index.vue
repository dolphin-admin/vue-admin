<script setup lang="ts">
import { iconList } from '@/constants'
import type { IconItem } from '@/types'

const iconData = ref<IconItem[]>([])

const handleSearch = (value: string) => {
  iconData.value = iconData.value.filter((item) => item.label.includes(value))
}

onBeforeMount(() => {
  iconData.value = iconList.map((item) => {
    return {
      ...item,
      component: defineAsyncComponent(() => import('~icons/line-md/account'))
    }
  })
})
</script>

<template>
  <div class="flex w-full flex-col items-center space-y-4">
    <div class="w-3/5">
      <NInput
        size="large"
        round
        placeholder="搜索"
        clearable
        autofocus
        @input="handleSearch"
      />
    </div>
    <div class="flex w-full flex-row flex-wrap items-center justify-center">
      <div
        v-for="(item, index) in iconData"
        :key="index"
        class="mb-5 h-16 w-1/2 cursor-pointer px-3 md:w-1/3 lg:w-1/4"
      >
        <div
          class="flex h-full w-full items-center justify-start space-x-3 rounded-md bg-gray-200 pl-3 shadow-sm dark:bg-gray-700"
        >
          <component
            :is="item.component"
            class="h-6 w-6 shrink-0"
          />
          <div class="space-y-1">
            <div>material</div>
            <div class="text-xs">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
