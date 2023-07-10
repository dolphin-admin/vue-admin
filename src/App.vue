<script setup lang="ts">
const themeStore = useThemeStore()
</script>

<template>
  <NConfigProvider
    :locale="themeStore.locale"
    :date-locale="themeStore.dateLocale"
    :theme="themeStore.theme"
    :theme-overrides="themeStore.themeOverrides"
    abstract
    inline-theme-disabled
  >
    <NLoadingBarProvider>
      <NMessageProvider>
        <RouterView v-slot="{ Component }">
          <Transition
            name="router"
            mode="out-in"
          >
            <component
              :is="Component"
              class="text-base"
            />
          </Transition>
        </RouterView>
      </NMessageProvider>
    </NLoadingBarProvider>
    <NGlobalStyle />
  </NConfigProvider>
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
</style>
