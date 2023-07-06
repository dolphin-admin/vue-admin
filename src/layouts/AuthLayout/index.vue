<script setup lang="ts">
import Favicon from '@/assets/images/favicon.png'

const { version } = siteMetaData

const userStore = useUserStore()
const router = useRouter()
// @ts-ignore
const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })

onBeforeMount(() => {
  // 如果已经登录，直接跳转到首页，否则清除用户信息
  if (AuthUtils.isAuthenticated()) {
    router.replace('/')
  } else {
    userStore.clearUser()
  }
})
</script>

<template>
  <main class="flex h-screen w-screen">
    <div class="invisible relative w-0 bg-blue-200 dark:bg-gray-600 sm:visible sm:w-1/2">
      <div class="absolute inset-0 m-auto flex h-fit w-fit select-none flex-col space-y-2 text-center font-mono">
        <NImage
          :src="Favicon"
          alt=""
          width="180"
          height="180"
        />
        <span class="text-xl font-semibold">{{ t('App.Name') }}</span>
        <span class="text-base">v{{ version }}</span>
      </div>
    </div>

    <div class="relative w-full bg-blue-300 dark:bg-gray-700 sm:w-1/2">
      <RouterView v-slot="{ Component }">
        <component
          :is="Component"
          class="animation-switch"
        />
      </RouterView>
    </div>
    <DolphinThemeSwitchDevTool />
  </main>
</template>

<style scoped lang="scss">
.animation-switch {
  animation: switch 1s;
}

@keyframes switch {
  0% {
    transform: translateY(-1000px);
    opacity: 0;
  }
  50% {
    transform: translateY(0px);
  }
  75% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
