<script setup lang="ts">
import { menuOptions, menuOptionsFlat } from '@/constants'
import type { MessageSchema } from '@/types'
import PlusIcon from '~icons/ic/outline-plus'

import { IconItem } from './components'

const message = useMessage()

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const keys = ref<any>([])
const menuOptionsData = ref<any>(menuOptions)
const showModal = ref(false)
const currentValue = ref('')

const handleUpdateValue = (value: string) => {
  currentValue.value = value
}

const onNegativeClick = () => {
  message.success(t('Common.Cancel'))
  showModal.value = false
}

const onPositiveClick = () => {
  const LocalStorage = NavigationUtils.getAddShortcut()
  if (!currentValue.value || LocalStorage.includes(currentValue.value)) {
    showModal.value = true
    return
  }
  NavigationUtils.setAddShortcut(currentValue.value)
  const newLocalStorage = NavigationUtils.getAddShortcut()
  keys.value = menuOptionsFlat.filter((item) => newLocalStorage.includes(item.key))
}

const handleStatusClose = (status: string) => {
  console.log(status)
  NavigationUtils.setReductionShortcut(status)
  keys.value = keys.value.filter((item: any) => item.key !== status)
}

onMounted(() => {
  const LocalStorageData = NavigationUtils.getAddShortcut()
  keys.value = menuOptionsFlat.filter((item) => LocalStorageData.includes(item.key))
  console.log(menuOptionsData)
})
</script>

<template>
  <main class="flex items-center justify-center">
    <div class="flex w-[80%] flex-col items-center space-y-2 sm:w-[500px]">
      <div class="animate-pulse text-4xl text-blue-600">Bit Ocean</div>
      <!-- <Search /> -->
      <div class="grid w-full grid-cols-3 grid-rows-3 p-2 sm:grid-cols-4 sm:grid-rows-2">
        <div
          v-for="(item, index) in keys"
          :key="index"
        >
          <template v-if="index <= 9">
            <IconItem
              :data="item"
              @status:close="handleStatusClose"
            />
          </template>
        </div>
        <div
          class="flex w-[1/4] flex-col items-center justify-center space-y-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-500 sm:h-[112px] sm:w-[112px]"
          @click="
            () => {
              showModal = true
            }
          "
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-black">
            <NIcon
              :component="PlusIcon"
              class="cursor-pointer"
              :size="24"
            />
          </div>
          <div>
            {{ t('Navigation.AddShortcut') }}
          </div>
        </div>
      </div>
    </div>
    <NModal
      v-model:show="showModal"
      :mask-closable="false"
      preset="dialog"
      :title="t('Navigation.AddShortcut')"
      :positive-text="t('Common.Confirm')"
      :negative-text="t('Common.Cancel')"
      @positive-click="onPositiveClick"
      @negative-click="onNegativeClick"
    >
      <NTreeSelect
        default-expand-all
        :options="menuOptionsData"
        check-strategy="child"
        @update:value="handleUpdateValue"
      />
    </NModal>
  </main>
</template>
