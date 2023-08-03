<script setup lang="ts">
import type { MessageSchema } from '@/types'
import TrophyIcon from '~icons/emojione/trophy'

import { columns, data, DefaultHTMLStr } from './private'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const printRef = ref<HTMLDivElement | null>()
const printContent = ref('')
const htmlStr = ref(DefaultHTMLStr)

const handlePrintDOM = () => {
  printContent.value = printRef.value!.outerHTML ?? ''

  nextTick(() => {
    // 1s 后打印，避免动态图标未加载完成
    setTimeout(() => {
      window.print()
      printContent.value = ''
    }, 1000)
  })
}

const handlePrintHTMLStr = () => {
  printContent.value = htmlStr.value ?? ''

  nextTick(() => {
    setTimeout(() => {
      window.print()
      printContent.value = ''
    })
  })
}
</script>

<template>
  <main class="space-y-4">
    <NCard
      hoverable
      footer-style="text-align: center;"
      :title="t('Print.DOM')"
    >
      <template #footer>{{ t('Print.ExpireTip') }}</template>
      <div
        ref="printRef"
        class="print-dom flex flex-col"
      >
        <div class="print-dom-title mb-4 flex items-center space-x-1 text-base">
          <NIcon :component="TrophyIcon" />
          <span>{{ t('Print.FrontendFrameworkLeaderboard') }}</span>
        </div>
        <NDataTable
          :columns="columns"
          :data="data"
          :scroll-x="800"
        />
      </div>
      <div class="mt-4 flex justify-center">
        <NButton
          type="primary"
          @click="handlePrintDOM"
        >
          {{ t('Common.Print') }}
        </NButton>
      </div>
    </NCard>

    <NCard
      hoverable
      :title="t('Print.HTMLStr')"
    >
      <div class="flex flex-col">
        <NInput
          v-model:value="htmlStr"
          type="textarea"
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
            @click="handlePrintHTMLStr"
          >
            {{ t('Common.Print') }}
          </NButton>
        </div>
      </div>
    </NCard>

    <DHTMLPrinter :content="printContent" />
  </main>
</template>

<style scoped lang="scss">
@media print {
  .print-dom {
    .print-dom-title {
      margin: 8px;
      justify-content: center;
    }
  }
}
</style>
