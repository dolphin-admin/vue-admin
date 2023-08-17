<script setup lang="ts">
import type { MessageSchema } from '@/types'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const listData = new Array(100000)
  .fill(null)
  .map((_item, i) => ({ id: i + 1, data: '列表项' }))
</script>

<template>
  <main>
    <NCard
      class="sm:!w-fit"
      hoverable
      bordered
      :title="t('Menu.VirtualList')"
    >
      <DVirtualList
        :data="listData"
        :show-num="20"
        :item-height="20"
        class="w-[400px]"
      />
    </NCard>
  </main>
</template>
