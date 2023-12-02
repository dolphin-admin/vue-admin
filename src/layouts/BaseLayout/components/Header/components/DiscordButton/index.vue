<script setup lang="ts">
import DiscordIcon from '~icons/line-md/discord'

const { DISCORD_URL } = AppMetadata
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
        color="#5865F2"
        :component="DiscordIcon"
        @click="() => BrowserUtils.openNewWindow(DISCORD_URL)"
      />
    </template>
    Discord
  </NTooltip>
</template>
