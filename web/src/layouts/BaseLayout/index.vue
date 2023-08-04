<script setup lang="ts">
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

// 若没有授权，则显示系统 loading
const loading = ref(true)

// 检查登录状态
const checkLogin = async () => {
  // 如果有 token，获取用户信息
  if (AuthUtils.isAuthenticated()) {
    if (!userStore.hasData()) {
      const { data } = (await UserAPI.getUserInfo()) || {}
      userStore.setUser(data)
    }
    loading.value = false
  } else {
    // 否则清除用户信息并跳转到登录页
    userStore.clearUser()
    router.replace({
      path: '/login',
      query: {
        redirect: route.fullPath
      }
    })
  }
}

onBeforeMount(() => checkLogin())
</script>

<template>
  <template v-if="loading">
    <BaseGlobalLoading />
  </template>
  <template v-else>
    <main class="h-screen w-full overflow-hidden">
      <ReportUserTrafficProvider>
        <div class="flex h-full w-full">
          <BaseSidebar />
          <div class="relative h-full flex-1 overflow-y-auto overflow-x-hidden">
            <BaseHeader />
            <BaseTabs />
            <RouterView v-slot="{ Component }">
              <Transition
                name="slide-fade"
                mode="out-in"
              >
                <component
                  :is="Component"
                  class="relative min-h-[calc(100%-144px)] w-full p-2 sm:p-4"
                />
              </Transition>
            </RouterView>
            <BaseFooter />
          </div>
        </div>
      </ReportUserTrafficProvider>
    </main>
  </template>
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
