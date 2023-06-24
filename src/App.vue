<script setup lang="ts">
import { UserApi } from '@/api/user'
import { useThemeStore, useUserStore } from '@/store'

const themeStore = useThemeStore()
const userStore = useUserStore()

onMounted(() => {
  if (!userStore.haveUserInfo()) {
    UserApi.getUserInfo()
      .then((res) => {
        userStore.setUserInfo(res.data)
      })
      .catch(() => {})
  }
})
</script>

<template>
  <NConfigProvider
    :locale="themeStore.locale"
    :date-locale="themeStore.dateLocale"
    :theme="themeStore.theme"
    :theme-overrides="themeStore.themeOverrides"
    preflight-style-disabled
  >
    <NLoadingBarProvider>
      <NMessageProvider>
        <RouterView v-slot="{ Component }">
          <Transition
            name="router"
            mode="out-in"
          >
            <KeepAlive>
              <component
                :is="Component"
                class="dark:text-white"
              />
            </KeepAlive>
          </Transition>
        </RouterView>
      </NMessageProvider>
    </NLoadingBarProvider>
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
