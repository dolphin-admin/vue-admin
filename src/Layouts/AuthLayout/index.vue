<script setup lang="ts">
import { siteMetaData } from '@/constants'
const { appName, version } = siteMetaData
</script>

<template>
  <main class="flex h-screen w-screen">
    <div class="invisible relative w-0 bg-blue-200 sm:visible sm:w-1/2">
      <div class="absolute inset-0 m-auto flex h-fit w-fit select-none flex-col space-y-2 text-center font-mono">
        <img
          src="@/assets/images/favicon.png"
          alt=""
          width="180"
          height="180"
        />
        <span class="text-xl font-semibold">{{ appName }}</span>
        <span class="text-base">v{{ version }}</span>
      </div>
    </div>

    <div class="relative w-full bg-blue-300 sm:w-1/2">
      <router-view></router-view>
    </div>
  </main>
</template>
