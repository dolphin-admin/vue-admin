<script setup lang="ts">
import { menuOptionsFlat } from '@/constants'
import type { MessageSchema } from '@/types'
import SearchIcon from '~icons/ic/round-search'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const router = useRouter()

const searchText = ref('')
const isInput = ref(true)

const searchMenuOptionsFlat = computed(() => {
  if (!searchText.value) {
    return menuOptionsFlat
  }
  return menuOptionsFlat.filter((item: any) => {
    const menuKey = item.label().children.default().toLowerCase()
    return menuKey.includes(searchText.value.trim().toLowerCase())
  })
})

const handleBlur = () => {
  setTimeout(() => {
    isInput.value = true
  }, 100)
}

const handleFocus = () => {
  setTimeout(() => {
    isInput.value = false
  }, 100)
}
</script>

<template>
  <div class="relative w-[100%] space-y-2 rounded-sm">
    <div class="relative cursor-pointer">
      <span>
        <NIcon
          :component="SearchIcon"
          size="24"
          color="#999"
          class="!absolute left-2 top-3"
        />
      </span>
      <input
        v-model="searchText"
        class="h-11 w-full rounded-t-3xl border pl-10 outline-none transition-all dark:bg-none"
        :class="{ 'rounded-b-3xl': isInput }"
        type="text"
        :placeholder="t('Common.KeywordSearch')"
        @blur="handleBlur"
        @focus="handleFocus"
      />
    </div>

    <div
      class="absolute left-0 top-8 z-50 h-[166px] w-full overflow-y-auto rounded-b-2xl border-x border-b bg-white px-2 transition-all dark:bg-[#3B3B3B]"
      :class="[isInput ? 'hidden' : 'block']"
    >
      <NScrollbar>
        <div
          v-for="(item, index) in searchMenuOptionsFlat"
          :key="index"
          class="space-x-2 hover:bg-gray-100 dark:hover:bg-black"
          @click="router.push({ name: item.key as string })"
        >
          <template v-if="item.show">
            <component :is="item.icon as any" />
            <component :is="item.label" />
          </template>
        </div>
      </NScrollbar>
    </div>
  </div>
</template>
