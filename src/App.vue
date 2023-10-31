<script setup lang="ts">
const themeStore = useThemeStore()
</script>

<template>
  <div class="display-content bg-layout-light dark:bg-layout-dark">
    <NConfigProvider
      :locale="themeStore.locale"
      :date-locale="themeStore.dateLocale"
      :theme="themeStore.theme"
      :theme-overrides="themeStore.themeOverrides"
      abstract
      inline-theme-disabled
    >
      <NLoadingBarProvider>
        <NNotificationProvider>
          <NMessageProvider>
            <RouterView v-slot="{ Component }">
              <template v-if="Component">
                <Transition
                  name="router"
                  mode="out-in"
                >
                  <component
                    :is="Component"
                    class="text-base"
                  />
                </Transition>
              </template>
            </RouterView>
          </NMessageProvider>
        </NNotificationProvider>
      </NLoadingBarProvider>
      <NGlobalStyle />
    </NConfigProvider>
  </div>
</template>

<style scoped lang="scss">
.router-enter-active,
.router-leave-active {
  transition: opacity 0.3s ease;
}
.router-enter-from,
.router-leave-to {
  opacity: 0;
}

@media print {
  .display-content {
    display: none;
  }
}
</style>
