<script setup lang="ts">
import type { MessageSchema } from '@/types'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const showModal = ref<boolean>(false)

const openModal = () => {
  showModal.value = true
}

const toggleShowModal = (e: boolean) => {
  showModal.value = e
}
</script>

<template>
  <div>
    <span @click="() => openModal()">
      {{ t('打开弹窗') }}
    </span>
    <DolphinModalDialog
      v-model:show-modal="showModal"
      @update:show-modal="toggleShowModal"
    >
      {{ t('弹窗内容') }}
    </DolphinModalDialog>
  </div>
</template>
