<template>
  <main class="flex h-screen w-full">
    <BaseSidebar />
    <div class="relative h-full flex-1 overflow-y-auto">
      <BaseHeader />
      <RouterView v-slot="{ Component }">
        <component
          :is="Component"
          class="relative min-h-[calc(100%-112px)] w-full p-2 sm:p-4"
        />
      </RouterView>
      <BaseFooter />
    </div>
  </main>
</template>
