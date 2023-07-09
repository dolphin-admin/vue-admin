<script setup lang="ts">
import type { Lang, MessageSchema } from '@/types'

const message = useMessage()
const [loading, loadingDispatcher] = useLoading(false)
const { t, locale } = useI18n<{ message: MessageSchema }, Lang>({ useScope: 'global' })

const clipboardValue = ref('')

const handleCopyText = async () => {
  loadingDispatcher.loading()
  try {
    BrowserUtils.setClipBoardText(clipboardValue.value)
    message.success(t('Message.Copy.Success'))
  } catch {
    message.error(t('Message.Copy.Failed'))
  }
  loadingDispatcher.loaded()
}

watch(
  () => locale.value,
  () => {
    if (locale.value === 'zh_CN') {
      clipboardValue.value =
        '散落的月光穿过了云，躲着人群，铺成大海的鳞，海浪打湿白裙，试图推你回去，海浪清洗血迹，妄想温暖你，往海的深处听，谁的哀鸣在指引，灵魂没入寂静，无人将你吵醒，你喜欢海风咸咸的气息，踩着湿湿的沙砾，你说人们的骨灰应该撒进海里。'
    } else {
      clipboardValue.value =
        'I have this thing where I get older, but just never wiser Midnights become my afternoons. When my depression works the graveyard shift, all of the people. I have ghosted stand there in the room.I should not be left to my own devices. They come with prices and vices'
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
