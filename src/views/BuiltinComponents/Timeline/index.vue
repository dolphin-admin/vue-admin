<script setup lang="ts">
import TimelineIcon from '~icons/ic/baseline-timeline'

const timelineData = [
  {
    time: '2023-01-01',
    content: '事件1',
    color: 'red'
  },
  {
    time: '2023-03-01',
    content: '事件2',
    color: 'green'
  },
  {
    time: '2023-06-01',
    content: '事件3',
    color: 'pink'
  },
  {
    time: '2023-09-01',
    content: '事件4',
    color: '#333'
  }
]
</script>

<template>
  <main>
    <NCard
      hoverable
      bordered
    >
      <NTimeline
        class="flex justify-start items-center"
        :icon-size="20"
        horizontal
      >
        <NTimelineItem
          v-for="(item, index) in timelineData"
          :color="item.color"
          :content="item.content"
          :time="item.time"
        >
          <template #icon>
            <component :is="TimelineIcon"></component>
          </template>
        </NTimelineItem>
      </NTimeline>
    </NCard>
  </main>
</template>
