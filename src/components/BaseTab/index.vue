<script setup lang="ts">
import type { MessageSchema, Tag } from '@/types'

const tagStore = useTagStore()
const route = useRoute()
const router = useRouter()
const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const handleClose = (tag: Tag, index: number) => {
  tagStore.removeTagItem(index)
  const baseTagDataLength = tagStore.tags.length
  if (baseTagDataLength === 1) {
    router.push('/')
  }
  if (tag === tagStore.tags[baseTagDataLength - 1]) {
    router.push(tag.href)
  }
}

const handleTagsJump = (tag: Tag) => router.push(tag.href)
</script>

<template>
  <main class="flex h-9 w-full items-center justify-start space-x-2 px-2 shadow dark:border-b">
    <NTag
      v-for="(tagItem, index) in tagStore.tags"
      :key="index"
      closable
      :type="route.path === tagItem.href ? 'primary' : 'default'"
      @click="handleTagsJump(tagItem)"
      @close="handleClose(tagItem, index)"
    >
      {{ t(tagItem.labelKey) }}
    </NTag>
  </main>
</template>
