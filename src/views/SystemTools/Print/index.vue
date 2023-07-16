<script setup lang="ts">
import type { MessageSchema } from '@/types'

import { columns, data } from './private'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const printRef = ref<HTMLDivElement | null>()
const printContent = ref('')
const printText = ref('')

const handlePrint = () => {
  printContent.value = printRef.value!.outerHTML ?? ''

  nextTick(() => {
    window.print()
    printContent.value = ''
  })
}

const handlePrintStr = () => {
  printContent.value = printText.value ?? ''

  nextTick(() => {
    window.print()
    printContent.value = ''
  })
}
</script>

<template>
  <main class="space-y-4">
    <NCard
      hoverable
      :title="t('Print.FrontendFrameworkLeaderboard')"
    >
      <div ref="printRef">
        <NDataTable
          :columns="columns"
          :data="data"
        />
      </div>
      <div class="mt-4 flex justify-center">
        <NButton
          type="primary"
          @click="handlePrint"
        >
          {{ t('Common.Print') }}
        </NButton>
      </div>
    </NCard>

    <NCard>
      <div class="flex flex-col">
        <NInputGroup>
          <NInput
            v-model:value="printText"
            size="medium"
            :style="{ width: '33%' }"
            clearable
          />
          <NButton
            type="primary"
            ghost
            @click="handlePrintStr"
          >
            {{ t('Common.Print') }}
          </NButton>
        </NInputGroup>
      </div>
    </NCard>

    <HTMLPrinter :content="printContent" />
  </main>
</template>
