<script setup lang="ts">
import type { MessageSchema } from '@/types'

const tagStore = useTagStore()
const route = useRoute()
const router = useRouter()
const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const handleClose = (item: any) => {
  tagStore.removeTagItem(item)
  const baseTagDataLength = tagStore.tags.length
  if (baseTagDataLength === 1) {
    router.push('/')
  }
  if (item === tagStore.tags[baseTagDataLength - 1]) {
    router.push(item.path)
  }
}

const handleTagsJump = (item: any) => {
  router.push(item.path)
}
</script>

<template>
  <main class="flex h-9 w-full items-center justify-start space-x-2 px-2 shadow dark:border-b">
    <NTag
      v-for="(item, index) in tagStore.tags"
      :key="index"
      :closable="item.key === 'Home' ? false : true"
      :type="t(route.meta.title as string) === t('Menu.' + item.key) ? 'info' : 'default' "
      @close="handleClose(item!)"
      @click="handleTagsJump(item)"
    >
      {{ t('Menu.' + item.key) }}
    </NTag>
  </main>
</template>
