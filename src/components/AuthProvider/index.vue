<script setup lang="ts">
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

onBeforeMount(() => {
  if (AuthUtils.isAuthenticated()) {
    UserAPI.getUserInfo().then((res) => {
      const { data } = res || {}
      userStore.setUser(data)
    })
  } else {
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
