<script setup lang="ts">
import type { Props } from './private'

// TODO: 如果 Duration 设置较大，仍然可能出现问题

const props = defineProps<{
  TimelineRoute: Props[]
}>()

import type { MessageSchema } from '@/types'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const { isMobileDevice } = BrowserUtils
</script>

<template>
  <main>
    <NCard
      class="sm:!w-fit"
      hoverable
      bordered
      :title="t('Timeline.WebDevRoadmap')"
    >
      <NTimeline
        :horizontal="!isMobileDevice()"
        item-placement="left"
        :icon-size="40"
      >
        <NTimelineItem
          v-for="(item, index) in props.TimelineRoute"
          :key="index"
          :color="item.color"
          :content="item.content"
          :time="item.time"
        >
          <template #icon>
            <component :is="item.icon" />
          </template>
        </NTimelineItem>
      </NTimeline>
    </NCard>
  </main>
</template>
