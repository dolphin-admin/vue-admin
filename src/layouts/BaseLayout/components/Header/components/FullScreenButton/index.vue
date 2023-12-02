<script setup lang="ts">
import type { MessageSchema } from '@/types'
import FullScreenIcon from '~icons/ic/round-fullscreen'
import ExitFullscreenIcon from '~icons/ic/round-fullscreen-exit'

const { t } = useI18n<{ message: MessageSchema }>()
const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()
</script>

<template>
  <NTooltip
    placement="bottom"
    trigger="hover"
  >
    <template #trigger>
      <NIcon
        class="hidden cursor-pointer sm:block"
        size="24"
        :component="isFullscreen ? ExitFullscreenIcon : FullScreenIcon"
        @click="toggleFullscreen"
      />
    </template>
    {{ t(isFullscreen ? 'TEMP.Header.ExitFullScreen' : 'TEMP.Header.FullScreen') }}
  </NTooltip>
</template>
