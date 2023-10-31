<script setup lang="ts">
const { APP_NAME, VERSION, TEAM_NAME, TEAM_GITHUB_URL } = AppMetadata

const { openNewWindow } = BrowserUtils
</script>

<template>
  <footer
    class="z-50 flex h-10 w-full items-center justify-center space-x-2 border-y border-gray-300 bg-default-light text-xs shadow-sm dark:border-gray-950 dark:bg-default-dark"
  >
    <span>{{ APP_NAME }} - v{{ VERSION }}</span>
    <span>©</span>
    <img
      class="-mb-2 cursor-pointer pb-2 transition-all hover:-translate-y-1 hover:scale-110 active:-translate-y-0 active:scale-105 active:opacity-75"
      src="@/assets/images/bit_ocean.png"
      alt=""
      loading="eager"
      width="18"
      @click="openNewWindow(TEAM_GITHUB_URL)"
    />
    <span>{{ TEAM_NAME }}</span>
  </footer>
</template>
