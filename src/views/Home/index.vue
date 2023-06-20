<script setup lang="ts">
import { siteMetaData } from '@/constants'
</script>

<template>
  <main class="absolute inset-0 m-auto">
    <div class="absolute inset-0 m-auto flex h-fit w-1/3 flex-col items-center space-y-4 pb-20 text-center">
      <img
        class="animate-pulse cursor-pointer select-none"
        width="160"
        height="160"
        src="@/assets/images/favicon.png"
        alt=""
      />
      <div class="flex flex-col space-y-2">
        <span class="text-2xl font-semibold">{{ siteMetaData.appName }}</span>
        <span class="text-base tracking-wider">v{{ siteMetaData.version }}</span>
      </div>
    </div>
  </main>
</template>
