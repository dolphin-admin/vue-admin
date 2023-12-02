<script setup lang="ts">
import type { MessageSchema } from '@/types'
import HideMenuIcon from '~icons/line-md/menu-fold-left'
import ShowMenuIcon from '~icons/line-md/menu-fold-right'

const { t } = useI18n<{ message: MessageSchema }>()
const sidebarStore = useSidebarStore()
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
        :component="sidebarStore.isDisplay ? HideMenuIcon : ShowMenuIcon"
        @click="sidebarStore.toggleDisplay"
      />
    </template>
    {{ sidebarStore.isDisplay ? t('TEMP.Sidebar.Hide') : t('TEMP.Sidebar.Show') }}
  </NTooltip>
</template>
