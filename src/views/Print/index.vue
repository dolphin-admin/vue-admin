<script setup lang="ts">
import type { MessageSchema } from '@/types'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

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

const printRef = ref()

function handlePrint() {
  // 缓存页面内容
  const bodyHtml = window.document.body.innerHTML
  // 获取要打印的dom
  const printContentHtml = printRef.value.innerHTML
  // 替换页面内容
  window.document.body.innerHTML = printContentHtml
  // 全局打印
  window.print()
  // 还原页面内容
  window.document.body.innerHTML = bodyHtml
}
</script>

<template>
  <main class="space-y-4">
    <div
      ref="printRef"
      id="print"
    >
      <NDataTable
        :columns="columns"
        :data="data"
      />
    </div>
    <NButton
      type="primary"
      @click="handlePrint"
    >
      {{ t('Common.Print') }}
    </NButton>
  </main>
</template>

<style scoped lang="scss" media="print">
@page {
  margin-left: 0.5in;
  margin-right: 0.5in;
  margin-top: 0.5in;
  margin-bottom: 0;
}
</style>
