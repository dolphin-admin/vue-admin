<script setup lang="ts">
const { APP_NAME, VERSION } = AppConfig

const userStore = useUserStore()
const router = useRouter()

const textMotion = ref({
  initial: {
    opacity: 0,
    y: 100
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 50,
      mass: 1
    }
  }
})

// 检查登录状态
const checkLogin = () => {
  // 如果已经登录，直接跳转到首页，否则清除用户信息
  if (AuthUtils.isAuthenticated()) {
    router.replace('/')
  } else {
    userStore.clearUser()
  }
}

onBeforeMount(() => checkLogin())
</script>

<template>
  <main class="flex h-screen w-screen">
    <div
      class="invisible relative w-0 bg-blue-200 dark:bg-gray-600 sm:visible sm:w-1/2"
    >
      <div
        class="absolute inset-0 m-auto flex h-fit w-fit select-none flex-col space-y-2 text-center font-mono"
      >
        <img
          src="@/assets/images/favicon.png"
          alt=""
          width="300"
          height="300"
          loading="eager"
          class="cursor-pointer transition-all duration-300 hover:scale-125"
        />
        <span
          v-motion="textMotion"
          class="text-xl font-semibold"
        >
          {{ APP_NAME }}
        </span>
        <span
          v-motion="textMotion"
          class="text-base"
        >
          v{{ VERSION }}
        </span>
      </div>
    </div>

    <div class="relative w-full bg-blue-300 dark:bg-gray-500 sm:w-1/2">
      <RouterView v-slot="{ Component }">
        <component
          :is="Component"
          class="animation-switch"
        />
      </RouterView>
    </div>
    <BaseThemeSwitchDevTool />
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
