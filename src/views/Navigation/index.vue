<script setup lang="ts">
import type { TreeSelectOption } from 'naive-ui'

import { menuOptions, menuOptionsFlat } from '@/constants'
import type { MessageSchema } from '@/types'
import IcBaselinePlusIcon from '~icons/ic/baseline-plus'
import IcRoundSearchIcon from '~icons/ic/round-search'

import { IconItem } from './components'

const message = useMessage()

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const keys = ref<TreeSelectOption[]>([])
const menuOptionsData = ref<any>(menuOptions)
const showModal = ref(false)
const currentValue = ref('')

const handleUpdateValue = (value: string) => {
  currentValue.value = value
}

const onNegativeClick = () => {
  message.success('Cancel')
  showModal.value = false
}

const onPositiveClick = () => {
  const LocalStorage = getLocalStorage()
  if (!currentValue.value || LocalStorage.includes(currentValue.value)) {
    showModal.value = true
    return
  }
  LocalStorage.push(currentValue.value)
  keys.value = menuOptionsFlat.filter((item) => LocalStorage.includes(item.key))
  localStorage.setItem('AddShortcut', JSON.stringify(LocalStorage))
  showModal.value = false
}

// 获取localStorage的数据
const getLocalStorage = () => {
  const addShortcut = localStorage.getItem('AddShortcut')
  const keysList = addShortcut ? JSON.parse(addShortcut) : []
  return keysList
}

onMounted(() => {
  const LocalStorageData = getLocalStorage()
  keys.value = menuOptionsFlat.filter((item) => LocalStorageData.includes(item.key))
})
</script>

<template>
  <main class="flex items-center justify-center">
    <div class="flex w-[80%] flex-col items-center space-y-2 sm:w-[500px]">
      <div class="animate-pulse text-4xl text-blue-600">Bit Ocean</div>

      <NInput
        class="w-[561px] shadow-sm"
        size="large"
        round
        :placeholder="t('Common.KeywordSearch')"
      >
        <template #prefix>
          <NIcon
            :component="IcRoundSearchIcon"
            size="24"
          />
        </template>
      </NInput>
      <div class="grid w-full grid-cols-3 grid-rows-3 p-2 sm:grid-cols-4 sm:grid-rows-2">
        <div
          v-for="(item, index) in keys"
          :key="index"
        >
          <template v-if="index <= 9">
            <IconItem :item="item" />
          </template>
        </div>
        <div
          class="flex w-[1/4] flex-col items-center justify-center space-y-2 rounded-md hover:bg-gray-200 sm:h-[112px] sm:w-[112px]"
          @click="
            () => {
              showModal = true
            }
          "
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <NIcon
              :component="IcBaselinePlusIcon"
              class="cursor-pointer"
              :size="24"
            />
          </div>
          <div>
            {{ t('添加快捷方式') }}
          </div>
        </div>
      </div>
    </div>
    <NModal
      v-model:show="showModal"
      :mask-closable="false"
      preset="dialog"
      :title="t('添加快捷方式')"
      :positive-text="t('确认')"
      :negative-text="t('取消')"
      @positive-click="onPositiveClick"
      @negative-click="onNegativeClick"
    >
      <NTreeSelect
        default-expand-all
        :options="menuOptionsData"
        @update:value="handleUpdateValue"
      />
    </NModal>
  </main>
</template>
