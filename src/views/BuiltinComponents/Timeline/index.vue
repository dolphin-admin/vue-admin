<script setup lang="ts">
import { webLearnRoute } from './private'
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
          v-for="(item, index) in webLearnRoute"
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
