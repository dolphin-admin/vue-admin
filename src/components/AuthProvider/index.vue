<script setup lang="ts">
import { UserApi } from '@/api'
import { useUserStore } from '@/store'
import { isAuthenticated } from '@/utils'

const userStore = useUserStore()
const router = useRouter()

onBeforeMount(() => {
  if (isAuthenticated()) {
    UserApi.getUserInfo().then((res) => {
      const { data } = res || {}
      userStore.setUser(data)
    })
  } else {
    userStore.clearUser()
    router.replace('/login')
  }
})
</script>

<template>
  <slot />
</template>
