<script setup lang="ts">
import type { MessageSchema } from '@/types'
import LoadingIcon from '~icons/svg-spinners/blocks-shuffle-3'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

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
        <RouterView 
          v-slot="{ Component }"
          class="display-content"
        >
          <template v-if="Component">
            <Transition
              name="router"
              mode="out-in"
            >
              <Suspense>
                <component
                  :is="Component"
                  class="text-base"
                />
                <template #fallback>
                  <main class="flex h-screen flex-col items-center justify-center">
                    <NIcon
                      :component="LoadingIcon"
                      size="60"
                      class="text-blue-200 dark:text-blue-400"
                    />
                    <span class="mb-1 mt-4 text-xl">{{ t('App.Name') }}</span>
                    <NGradientText type="primary">Powered by Bit Ocean</NGradientText>
                  </main>
                </template>
              </Suspense>
            </Transition>
          </template>
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

@media print {
  .display-content {
    display: none;
  }
}
</style>
