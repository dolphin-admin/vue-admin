<script setup lang="ts">
import type { MessageSchema } from '@/types'

import { webLearnRoute } from './private'

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
      <Timeline
        :data="webLearnRoute"
        :horizontal="!isMobileDevice()"
        :icon-size="28"
      />
    </NCard>
  </main>
</template>
