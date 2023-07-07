<script setup lang="ts">
// @ts-ignore
const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const baseTagStore = useBaseTagStore()

const route = useRoute()
const router = useRouter()

const handleClose = (item: any) => {
  baseTagStore.reduceBaseTagData(item)
  const baseTagDataLength = baseTagStore.baseTagData.length
  if (baseTagDataLength === 1) {
    router.push('/')
  }
  if (item === baseTagStore.baseTagData[baseTagDataLength - 1]) {
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
      v-for="(item, index) in baseTagStore.baseTagData"
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
