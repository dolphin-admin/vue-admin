<script setup lang="ts">
import type { MessageSchema } from '@/types'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const message = useMessage()

type Song = {
  no: number
  title: string
  length: string
}

const columns = [
  {
    title: 'No',
    key: 'no'
  },
  {
    title: 'Title',
    key: 'title'
  },
  {
    title: 'Length',
    key: 'length'
  }
]

const data: Song[] = [
  { no: 3, title: 'Wonderwall', length: '4:18' },
  { no: 4, title: "Don't Look Back in Anger", length: '4:48' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' }
]

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

const handlePrintText = () => {
  if (!printText.value) {
    message.warning(t('Message.Print.Failed'))
    return
  }
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
      class="space-y-4"
      hoverable
    >
      <div
        ref="printRef"
        id="print"
      >
        <NDataTable
          :columns="columns"
          :data="data"
        />
      </div>
      <div class="flex justify-end pt-2">
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
            size="medium"
            :style="{ width: '33%' }"
            v-model:value="printText"
            clearable
          />
          <NButton
            type="primary"
            ghost
            @click="handlePrintText"
          >
            {{ t('Common.Print') }}
          </NButton>
        </NInputGroup>
      </div>
    </NCard>

    <HTMLPrinter :content="printContent" />
  </main>
</template>
