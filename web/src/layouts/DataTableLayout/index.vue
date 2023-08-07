<template>
  <main class="flex h-[calc(100%-144px)] flex-col">
    <NCard
      class="!flex h-full"
      hoverable
      :content-style="{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column'
      }"
    >
      <div class="mb-2 sm:mb-3">
        <NCard
          embedded
          :content-style="{ padding: '12px' }"
        >
          <slot name="operate" />
        </NCard>
      </div>
      <slot />
    </NCard>
  </main>
</template>

<style scoped lang="scss">
:deep(.n-data-table) {
  flex-grow: 1 !important;
}
</style>
