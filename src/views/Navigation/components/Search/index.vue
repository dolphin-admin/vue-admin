<script setup lang="ts">
import { menuOptionsFlat } from '@/constants'
import type { MessageSchema } from '@/types'
import SearchIcon from '~icons/ic/round-search'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const router = useRouter()

const searchText = ref('')
const isShowMenuOptions = ref(true)
const isShowRound = ref(false)

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
    isShowMenuOptions.value = true
    isShowRound.value = false
  }, 100)
}

const handleFocus = () => {
  setTimeout(() => {
    isShowMenuOptions.value = false
    isShowRound.value = true
  }, 100)
}

const handleEnter = () => {
  if (!searchText.value.trim()) {
    return
  }
  menuOptionsFlat.forEach((item: any) => {
    if (item.label().children.default().toLowerCase() === searchText.value.trim().toLowerCase()) {
      router.push({ name: item.key as string })
    }
  })
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
        class="h-11 w-[100%] rounded-t-3xl border pl-10 outline-none transition-all dark:bg-none"
        :class="{ 'rounded-b-3xl': !isShowRound }"
        type="text"
        required
        :placeholder="t('Common.KeywordSearch')"
        @blur="handleBlur"
        @focus="handleFocus"
        @keyup.enter="handleEnter"
      />
    </div>

    <div
      class="absolute left-0 top-8 z-50 h-[166px] w-full overflow-y-auto rounded-b-2xl border-x border-b bg-white px-2 transition-all dark:bg-[#3B3B3B]"
      :class="[isShowMenuOptions ? 'hidden' : 'block']"
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
