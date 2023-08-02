<script setup lang="ts">
import { menuOptions, menuOptionsFlat } from '@/constants'
import type { MessageSchema } from '@/types'
import PlusIcon from '~icons/ic/outline-plus'

import { Search, ShortcutItem } from './components'

const { teamName } = siteMetaData

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const keys = ref<any>([])
const showModal = ref(false)
const currentValue = ref('')
const record = reactive({
  current: -1,
  replace: -1
})
const menuOptionsData = ref<any>([])
const isDragging = ref(false)

const recursiveMenuOption = (options: any) => {
  const shortcuts = NavigationUtils.getShortcuts()
  const filteredOptions: any[] = []
  options.forEach((item: any) => {
    const newItem = { ...item }
    if (newItem.children) {
      const children = recursiveMenuOption(newItem.children)
      newItem.children = children
    }
    // 菜单项不显示的时候
    if (newItem.show !== false) {
      filteredOptions.push(newItem)
    }
    if (shortcuts.includes(newItem.key)) {
      newItem.disabled = true
    }
  })
  return filteredOptions
}

const handleUpdateValue = (value: string) => {
  currentValue.value = value
}

const onPositiveClick = () => {
  const localStorage = NavigationUtils.getShortcuts()
  if (!currentValue.value || localStorage.includes(currentValue.value)) {
    showModal.value = true
    return
  }
  NavigationUtils.addShortcut(currentValue.value)
  menuOptionsFlat.forEach((item) => {
    if (item.key === currentValue.value) {
      keys.value.push(item)
      menuOptionsData.value = recursiveMenuOption(menuOptions)
    }
  })
}

const handleStatusClose = (status: string) => {
  NavigationUtils.removeShortcut(status)
  keys.value = keys.value.filter((item: any) => item.key !== status)
  menuOptionsData.value = recursiveMenuOption(menuOptions)
}

const reorder = (value: any, current: number, replace: number) => {
  if (current === -1 || replace === -1) {
    return
  }
  const [removedValue] = value.splice(current, 1)
  value.splice(replace, 0, removedValue)
}

const dragStart = (index: number) => {
  record.current = index
  isDragging.value = true
}

const dragEnter = (index: number) => {
  record.replace = index
  isDragging.value = false
}

const drop = () => reorder(keys.value, record.current, record.replace)

onMounted(() => {
  const shortcuts = NavigationUtils.getShortcuts()
  keys.value = menuOptionsFlat.filter((item) => shortcuts.includes(item.key))
  menuOptionsData.value = recursiveMenuOption(menuOptions)
})
</script>

<template>
  <main class="flex items-center justify-center">
    <div class="flex w-[80%] flex-col items-center space-y-4 sm:w-[500px]">
      <div
        class="flex w-full flex-col items-center justify-center space-y-1 text-blue-600"
      >
        <div class="text-xl">{{ t('App.Name') }}</div>
        <div class="flex space-x-2">
          <span class="text-sm text-gray-600">{{ teamName }}</span>
          <img
            class="-mb-2 cursor-pointer pb-2 transition-all hover:-translate-y-1 hover:scale-110 active:-translate-y-0 active:scale-105 active:opacity-75"
            src="@/assets/images/bit_ocean.png"
            alt=""
            loading="eager"
            width="18"
            height="18"
          />
        </div>
      </div>
      <Search />
      <div
        class="grid w-full grid-cols-3 grid-rows-3 sm:grid-cols-4 sm:grid-rows-2"
        @drop.prevent="drop"
        @dragover.prevent
      >
        <div
          v-for="(item, index) in keys"
          :key="index"
          class="hover:cursor-pointer active:cursor-grabbing"
          :class="{ 'cursor-move': isDragging }"
          :draggable="true"
          @dragstart="dragStart(index)"
          @dragenter="dragEnter(index)"
        >
          <ShortcutItem
            :data="item"
            @close="handleStatusClose"
          />
        </div>
        <div
          class="flex w-[1/4] cursor-pointer flex-col items-center justify-center space-y-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-500 sm:h-[112px] sm:w-[112px]"
          @click="showModal = true"
        >
          <div
            class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-black"
          >
            <NIcon
              :component="PlusIcon"
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
      preset="dialog"
      :title="t('Navigation.AddShortcut')"
      :positive-text="t('Common.Confirm')"
      :negative-text="t('Common.Cancel')"
      @positive-click="onPositiveClick"
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
