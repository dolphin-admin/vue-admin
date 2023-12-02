<script setup lang="ts">
import type { Props } from './private'

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  horizontal: false,
  itemPlacement: 'left'
})

const isMobile = useMobile()
</script>

<template>
  <main>
    <NTimeline
      :horizontal="!isMobile"
      :item-placement="props.itemPlacement"
      :icon-size="props.iconSize"
    >
      <NTimelineItem
        v-for="(item, index) in props.data"
        :key="index"
        :color="item.color"
        :time="item.time"
        :title="item.title"
        :content="item.content"
        :line-type="item.lineType ?? 'default'"
        :type="item.type ?? 'default'"
      >
        <template #icon>
          <component :is="item.icon" />
        </template>
      </NTimelineItem>
    </NTimeline>
  </main>
</template>
