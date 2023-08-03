<script setup lang="ts">
import type { MessageSchema } from '@/types'

import { webLearnRoute } from './private'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

const isMobile = useMobile()
</script>

<template>
  <main>
    <NCard
      class="sm:!w-fit"
      hoverable
      bordered
      :title="t('Timeline.WebDevRoadmap')"
    >
      <DTimeline
        :data="webLearnRoute"
        :horizontal="!isMobile"
        :icon-size="28"
      />
    </NCard>
  </main>
</template>
