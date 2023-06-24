<template>
  <main class="h-screen w-full">
    <BaseHeader />
    <div class="flex h-[calc(100%-64px)]">
      <BaseSidebar />
      <div class="relative h-full w-[calc(100%-160px)] overflow-y-scroll">
        <div class="min-h-full w-full">
          <RouterView v-slot="{ Component }">
            <component :is="Component" />
          </RouterView>
        </div>
        <BaseFooter />
      </div>
    </div>
  </main>
</template>
