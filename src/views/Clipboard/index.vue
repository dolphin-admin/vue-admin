<script setup lang="ts">
import type { Lang, MessageSchema } from '@/types'

import { ChineseLyrics, EnglishLyrics } from './private'

const { t, locale } = useI18n<{ message: MessageSchema }, Lang>({ useScope: 'global' })

const message = useMessage()
const [loading, loadingDispatcher] = useLoading(false)

const clipboardValue = ref('')

const handleCopyText = async () => {
  loadingDispatcher.loading()
  try {
    await BrowserUtils.setClipBoardText(clipboardValue.value)
    message.success(t('Message.Copy.Success'))
  } catch {
    message.error(t('Message.Copy.Failed'))
  }
  loadingDispatcher.loaded()
}

watch(
  () => locale.value,
  () => {
    switch (locale.value) {
      case 'zh_CN':
        clipboardValue.value = ChineseLyrics
        break
      case 'en_US':
        clipboardValue.value = EnglishLyrics
        break
      default:
        break
    }
  },
  { immediate: true }
)
</script>

<template>
  <main>
    <NCard class="flex w-full flex-col space-y-2">
      <NInput
        v-model:value="clipboardValue"
        type="textarea"
        autofocus
        show-count
        clearable
        hoverable
        :autosize="{
          minRows: 8,
          maxRows: 20
        }"
      />
      <div class="flex items-center justify-center">
        <NButton
          type="primary"
          :loading="loading"
          :disabled="loading"
          class="!mt-3"
          @click="handleCopyText"
        >
          {{ t('Clipboard.CopyToClipboard') }}
        </NButton>
      </div>
    </NCard>
  </main>
</template>
