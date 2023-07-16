<script setup lang="ts">
import { webLearnRoute } from './private'
import type { MessageSchema } from '@/types'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })
</script>

<template>
  <main>
    <Timeline :TimelineRoute="webLearnRoute" />
  </main>
</template>
