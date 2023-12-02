<script setup lang="ts">
const langStore = useLangStore()
const themeStore = useThemeStore()
</script>

<template>
  <NConfigProvider
    :locale="langStore.locale"
    :date-locale="langStore.dateLocale"
    :theme="themeStore.naiveTheme"
    :theme-overrides="
      themeStore.isLightTheme ? themeStore.lightThemeOverrides : themeStore.darkThemeOverrides
    "
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
