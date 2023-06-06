<script setup lang="ts">
import type { AxiosResponse } from 'axios'

import type { User } from '@/api'
import { UserApi } from '@/api'
import { useLoading } from '@/hooks'
import LoadingIcon from '~icons/svg-spinners/blocks-wave'

const [loading, loadingDispatcher] = useLoading(false)

const users = ref<User[]>([])

onMounted(() => {
  loadingDispatcher.loading()
  UserApi.getUsers()
    .then((res) => {
      users.value = res.data
    })
    .catch((err: AxiosResponse) => {
      console.log(err)
    })
    .finally(() => loadingDispatcher.loaded())
})
</script>

<template>
  <main class="absolute inset-0 m-auto">
    <div class="absolute inset-0 m-auto flex h-fit w-1/3 flex-col items-center space-y-4 pb-20 text-center">
      <img
        class="animate-pulse cursor-pointer select-none"
        width="160"
        height="160"
        src="@/assets/images/favicon.png"
        alt=""
      />
      <div class="flex select-none flex-col space-y-2">
        <span class="text-2xl font-semibold">API</span>
        <div class="flex items-center space-x-2">
          <template v-if="loading">
            <LoadingIcon class="text-blue-400" />
            <span class="animate-pulse">Loading...</span>
          </template>
          <template v-if="users.length > 0">
            <div class="flex flex-col space-y-2">
              <div>Users loaded:</div>
              <div
                v-for="user in users"
                :key="user.uuid"
              >
                {{ user.username }}
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>
