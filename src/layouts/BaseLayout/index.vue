<script setup lang="ts">
import type { Lang } from '@dolphin-admin/utils'

import bitOceanSrc from '@/assets/images/bit_ocean.png'
import type { MessageSchema } from '@/types'

const { t } = useI18n<{ message: MessageSchema }, Lang>({
  useScope: 'global'
})

const { REPO_GITHUB_URL } = AppMetadata

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const notification = useNotification()

// 若没有授权，则显示系统 loading
const loading = ref(true)

/**
 * 发送 GitHub Social 通知
 */
const sendSystemNotification = () => {
  setTimeout(() => {
    const n = notification.create({
      title: () => t('Notification.System.Title'),
      description: () => t('Notification.Team.From'),
      avatar: () =>
        h(NAvatar, {
          size: 'small',
          round: true,
          src: bitOceanSrc,
          alt: ''
        }),
      content: () => t('Notification.System.Content'),
      duration: 5000,
      keepAliveOnHover: true,
      meta: TimeUtils.formatTime(Date.now()),
      action: () =>
        h(
          NButton,
          {
            text: true,
            type: 'success',
            onClick: () => {
              BrowserUtils.openNewWindow(REPO_GITHUB_URL)
              n.destroy()
            }
          },
          {
            default: () => `${t('Common.Goto')} GitHub`
          }
        )
    })
  }, 800)
}

// 检查登录状态
const checkLogin = async () => {
  // 如果有 token，获取用户信息
  if (AuthUtils.isAuthenticated()) {
    if (!userStore.hasData()) {
      const { data } = (await UserAPI.getUserInfo()) || {}
      userStore.setUser(data)
    }
    loading.value = false
    sendSystemNotification()
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
