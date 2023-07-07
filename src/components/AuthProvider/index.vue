<script setup lang="ts">
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

onBeforeMount(() => {
  // 如果有 token，获取用户信息
  if (AuthUtils.isAuthenticated()) {
    UserAPI.getUserInfo().then((res) => {
      const { data } = res || {}
      userStore.setUser(data)
    })
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
})
</script>

<template>
  <slot />
</template>
