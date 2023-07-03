<script setup lang="ts">
const route = useRoute()
// @ts-ignore
const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })
</script>

<template>
  <div class="h-[calc(100%-112px)]">
    <div class="mb-4 flex items-center space-x-2 pl-1 text-2xl">
      <template v-if="route.meta?.icon">
        <component :is="route.meta.icon" />
      </template>
      <template v-if="route.meta?.title">
        <span>{{ t(route.meta.title as string) }}</span>
      </template>
    </div>
    <slot />
  </div>
</template>
