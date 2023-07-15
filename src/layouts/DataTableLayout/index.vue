<template>
  <div class="flex h-[calc(100%-144px)] flex-col">
    <div class="mb-4">
      <slot name="operate" />
    </div>
    <slot />
  </div>
</template>

<style scoped lang="scss">
:deep(.n-data-table) {
  flex-grow: 1;
}
</style>
