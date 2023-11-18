<script setup lang="ts">
import { Icon } from '@iconify/vue'

import { iconSetList } from '@/constants'
import type { MessageSchema } from '@/types'
import SearchIcon from '~icons/ic/sharp-search'

const { t } = useI18n<{ message: MessageSchema }>()

const message = useMessage()
const [fetchLoading, fetchLoadingDispatcher] = useLoading()

const iconList = ref<string[]>([])
const searchIconList = ref<string[]>([])
const selectedIconSet = ref('')
const searchText = ref('')

const handleSearch = (value: string) => {
  searchIconList.value = iconList.value.filter((icon) =>
    icon.toLowerCase().includes(value.toLocaleLowerCase())
  )
}

const getIcons = () => {
  fetchLoadingDispatcher.loading()
  // IconAPI.getIconsBySet(selectedIconSet.value)
  //   .then((res) => {
  //     const { uncategorized } = res
  //     iconList.value = uncategorized ?? []
  //     searchIconList.value = iconList.value
  //   })
  //   .finally(() => {
  //     fetchLoadingDispatcher.loaded()
  //   })
}

const handleIconSetChange = (key: string) => {
  if (key === selectedIconSet.value) return
  if (fetchLoading.value) {
    message.loading(t('正在获取图标数据...'))
    return
  }
  selectedIconSet.value = key
  getIcons()
}

onBeforeMount(() => {
  selectedIconSet.value = iconSetList[0].key
  getIcons()
})
</script>

<template>
  <div class="flex w-full flex-col items-center space-y-4">
    <div class="flex w-full items-center justify-start space-x-4 sm:w-3/5">
      <NTag
        v-for="(iconSetItem, index) in iconSetList"
        :key="index"
        class="!cursor-pointer !transition-transform hover:scale-110"
        :type="selectedIconSet === iconSetItem.key ? 'primary' : 'default'"
        @click="() => handleIconSetChange(iconSetItem.key)"
      >
        {{ iconSetItem.label }}
      </NTag>
    </div>
    <div class="w-full px-2 sm:w-3/5">
      <NInput
        v-model:value="searchText"
        size="large"
        :placeholder="t('TEMP.Icon.SearchPlaceholder')"
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

    <div class="flex flex-wrap items-center justify-center gap-5">
      <Icon
        v-for="(iconItem, index) in searchIconList"
        :key="index"
        :icon="`${selectedIconSet}:${iconItem}`"
        width="26"
      />
    </div>
  </div>
</template>
