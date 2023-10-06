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
        :show-num="15"
        :item-height="40"
        class="w-full sm:w-[250px]"
      />
    </NCard>
  </main>
</template>
