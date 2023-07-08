<script setup lang="ts">
import type { MessageSchema } from '@/types'
const message = useMessage()

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const clipboardValue = ref(
  '散落的月光穿过了云  躲着人群 铺成大海的鳞 海浪打湿白裙 试图推你回去 海浪清洗血迹 妄想温暖你 往海的深处听 谁的哀鸣在指引 灵魂没入寂静 无人将你吵醒 你喜欢海风咸咸的气息 踩着湿湿的沙砾 你说人们的骨灰应该撒进海里'
)
const clipText = () => {
  BrowserUtils.setClipBoardText(clipboardValue.value)
  message.success(t('Message.Copy.CopySuccessfully'))
}
</script>

<template>
  <main>
    <NCard>
      <NInput
        v-model:value="clipboardValue"
        class="min-h-[100px]"
        type="textarea"
        autofocus
        clearable
        autosize
      />
      <NButton
        type="primary"
        class="!mt-3"
        @click="clipText"
        >{{ t('Clipboard.CopyToClipboard') }}</NButton
      >
    </NCard>
  </main>
</template>
