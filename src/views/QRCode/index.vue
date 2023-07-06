<script setup lang="ts">
const message = useMessage()
// @ts-ignore
const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })
const [loading, loadingDispatcher] = useLoading(false)

const userInput = ref('')
const generatedResult = ref('')

const makeQRCode = async () => {
  if (!userInput.value) {
    message.error(t('QRCode.Tip.Input'))
    return
  }
  loadingDispatcher.loading()
  try {
    const qrcodeContent = await QRCodeUtils.generateQRCode(userInput.value, {
      width: 200,
      errorCorrectionLevel: 'L'
    })
    generatedResult.value = qrcodeContent
    message.success(t('QRCode.Generate.Success'))
  } catch (err) {
    message.error(t('QRCode.Generate.Failed'))
  }
  loadingDispatcher.loaded()
}

const downloadFile = () => BrowserUtils.downloadFile(generatedResult.value, 'qrcode.png')
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
            :placeholder="t('QRCode.Tip.Input')"
            maxlength="420"
            show-count
            clearable
            :loading="loading"
            :autosize="{
              minRows: 8,
              maxRows: 20
            }"
          />
          <div class="mt-4 text-center">
            <NButton
              type="primary"
              :loading="loading"
              :disabled="loading"
              @click="() => makeQRCode()"
            >
              {{ t('QRCode.Generate.Text') }}
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
              @click="() => downloadFile()"
            >
              {{ t('Common.Download') }}
            </NButton>
          </div>
        </NCard>
      </div>
    </div>
  </main>
</template>
