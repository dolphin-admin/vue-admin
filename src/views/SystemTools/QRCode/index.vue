<script setup lang="ts">
import type { MessageSchema } from '@/types'

const { t } = useI18n<{ message: MessageSchema }>()

const message = useMessage()

const userInput = ref('')
const generatedResult = ref('')

/**
 * 生成二维码
 */
const makeQRCode = async () => {
  if (!userInput.value) {
    message.error(t('TEMP.Validation.QRCodeContent'))
    return
  }
  try {
    const qrcodeContent = await QRCodeUtils.generateQRCode(userInput.value, {
      width: 200,
      errorCorrectionLevel: 'L'
    })
    generatedResult.value = qrcodeContent
    message.success(t('TEMP.Message.GenerateTEMP.QRCode.Success'))
  } catch (err) {
    message.error(t('TEMP.Message.GenerateTEMP.QRCode.Failed'))
  }
}

/**
 * 下载二维码
 */
const handleDownload = () => BrowserUtils.downloadFile(generatedResult.value, 'qrcode.png')
</script>

<template>
  <main>
    <div class="flex w-full flex-wrap">
      <div class="flex w-full flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
        <NCard
          class="grow"
          hoverable
          content-style="width: 100%;"
        >
          <NInput
            v-model:value="userInput"
            class="!w-full"
            type="textarea"
            :placeholder="t('TEMP.QRCode.ContentPlaceholder')"
            show-count
            clearable
            hoverable
            :autosize="{
              minRows: 8,
              maxRows: 20
            }"
          />
          <div class="mt-4 text-center">
            <NButton
              type="primary"
              @click="makeQRCode"
            >
              {{ t('TEMP.QRCode.Generate') }}
            </NButton>
          </div>
        </NCard>

        <NCard
          v-show="generatedResult"
          class="w-full sm:!w-fit"
          hoverable
          content-style="display: flex;justify-content: center;align-items: center;flex-direction: column;"
        >
          <NImage
            v-if="generatedResult"
            class="shadow-lg"
            width="200"
            :src="generatedResult"
            alt=""
            show-toolbar-tooltip
          />
          <div class="mt-4 text-center">
            <NButton
              type="primary"
              @click="handleDownload"
            >
              {{ t('COMMON.Download') }}
            </NButton>
          </div>
        </NCard>
      </div>
    </div>
  </main>
</template>
