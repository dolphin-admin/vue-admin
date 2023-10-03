<script setup lang="ts">
import LoadingIcon from '~icons/svg-spinners/blocks-shuffle-3'

const { APP_NAME } = AppConfig
</script>

<template>
  <main class="flex h-screen flex-col items-center justify-center">
    <NIcon
      :component="LoadingIcon"
      size="60"
      class="text-blue-200 dark:text-blue-400"
    />
    <span class="mb-1 mt-4 text-xl">{{ APP_NAME }}</span>
    <NGradientText type="primary">Powered by Bit Ocean</NGradientText>
  </main>
</template>
