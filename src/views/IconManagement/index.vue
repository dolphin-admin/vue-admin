<script setup lang="ts">
import { iconMap, iconMapName } from '@/constants'
const originIconData = [...iconMap]
const filterIconData = ref([...iconMap])
const handleFilterIcon = (value: string) => {
  filterIconData.value = originIconData.filter((item) => {
    const valueToLowercase = value.toLowerCase()
    return item[0].toLowerCase().includes(valueToLowercase)
  })
}
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
        @input="handleFilterIcon"
      />
    </div>
    <div class="flex w-full flex-row flex-wrap items-center justify-center">
      <div
        v-for="(item, index) in filterIconData"
        :key="index"
        class="mb-5 h-16 w-1/2 cursor-pointer px-3 md:w-1/3 lg:w-1/4"
      >
        <div class="flex h-full w-full items-center justify-start space-x-3 bg-gray-100 pl-3">
          <component
            :is="iconMap.get(item[0])"
            v-if="iconMap.get(item[0])"
            class="h-6 w-6 shrink-0"
          />
          <div class="space-y-1">
            <div class="text-sm">material</div>
            <div>{{ iconMapName.get(item[0]) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
