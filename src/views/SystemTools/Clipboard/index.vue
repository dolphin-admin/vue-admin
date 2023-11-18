<script setup lang="ts">
import { Lang } from '@dolphin-admin/utils'

import type { MessageSchema } from '@/types'

import { ChineseLyrics, EnglishLyrics } from './private'

const { t, locale } = useI18n<{ message: MessageSchema }, Lang>({})

const message = useMessage()

const clipboardValue = ref('')

/**
 * 复制文本
 */
const handleCopy = async () => {
  try {
    await BrowserUtils.setClipBoardText(clipboardValue.value)
    message.success(t('TEMP.Message.Copy.Success'))
  } catch {
    message.error(t('TEMP.Message.Copy.Failed'))
  }
}

// 监听语言变化，给予默认值
watch(
  () => locale.value,
  () => {
    switch (locale.value) {
      case Lang['zh-CN']:
        clipboardValue.value = ChineseLyrics
        break
      case Lang['en-US']:
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
  <main class="absolute inset-0 flex">
    <NCard
      class="flex w-full flex-col space-y-2"
      hoverable
    >
      <NInput
        v-model:value="clipboardValue"
        class="h-[calc(100%-46px)]"
        type="textarea"
        show-count
        clearable
        hoverable
      />
      <div class="flex items-center justify-center">
        <NButton
          type="primary"
          class="!mt-3"
          @click="handleCopy"
        >
          {{ t('COMMON.Copy') }}
        </NButton>
      </div>
    </NCard>
  </main>
</template>
