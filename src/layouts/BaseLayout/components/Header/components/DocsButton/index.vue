<script setup lang="ts">
import type { MessageSchema } from '@/types'
import DocsIcon from '~icons/line-md/document-list'

const { DOCS_URL } = AppMetadata

const { t } = useI18n<{ message: MessageSchema }>()
</script>

<template>
  <NTooltip
    placement="bottom"
    trigger="hover"
  >
    <template #trigger>
      <NIcon
        class="cursor-pointer"
        size="20"
        :component="DocsIcon"
        @click="() => BrowserUtils.openNewWindow(DOCS_URL)"
      />
    </template>
    {{ t('COMMON.Docs') }}
  </NTooltip>
</template>
