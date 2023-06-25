<template>
  <main class="flex h-screen w-full">
    <BaseSidebar />
    <div class="relative h-full flex-1 overflow-y-scroll">
      <BaseHeader />
      <div class="min-h-full w-full">
        <RouterView v-slot="{ Component }">
          <component :is="Component" />
        </RouterView>
      </div>
      <BaseFooter />
    </div>
  </main>
</template>
