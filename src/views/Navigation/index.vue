<script setup lang="ts">
const { APP_NAME, TEAM_NAME } = AppMetadata
</script>

<template>
  <main class="flex items-center justify-center">
    <div class="flex w-[80%] flex-col items-center space-y-4 sm:w-[500px]">
      <div class="flex w-full flex-col items-center justify-center space-y-4 text-blue-600">
        <div class="whitespace-nowrap text-4xl">{{ APP_NAME }}</div>
        <div class="flex items-center space-x-1.5">
          <img
            class="cursor-pointer transition-all active:scale-105 active:opacity-75"
            src="@/assets/images/bit_ocean.png"
            alt=""
            loading="eager"
            width="14"
            height="14"
          />
          <span class="text-sm text-gray-600">{{ TEAM_NAME }}</span>
        </div>
      </div>
    </div>
  </main>
</template>
