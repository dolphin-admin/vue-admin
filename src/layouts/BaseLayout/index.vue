<template>
  <main class="h-screen w-full overflow-hidden">
    <AuthProvider>
      <div class="flex h-full w-full">
        <BaseSidebar />
        <div class="relative h-full flex-1 overflow-y-auto overflow-x-hidden">
          <BaseHeader />
          <BaseTab />
          <RouterView v-slot="{ Component }">
            <Transition
              name="slide-fade"
              mode="out-in"
            >
              <component
                :is="Component"
                class="relative min-h-[calc(100%-112px)] w-full p-2 sm:p-4"
              />
            </Transition>
          </RouterView>
          <BaseFooter />
        </div>
      </div>
    </AuthProvider>
  </main>
</template>

<style scoped lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
