<script setup lang="ts">
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

const userStore = useUserStore()
const message = useMessage()

const socket = ref<Socket | null>(null)

const handleSendMessage = () => {
  const sendMessage = `你好，我是${userStore.user.username}，我刚刚给你发送了一条信息`
  socket.value!.emit('message', sendMessage)
  message.success('您成功发送了一条消息')
}

onBeforeMount(() => {
  socket.value = io(GlobalEnvConfig.BASE_API_PROXY + '/websocket')
  socket.value.on('connect', () => {
    console.log('connect')
  })
  socket.value.on('disconnect', () => {
    console.log('disconnect')
  })
  socket.value.on('message', (data) => {
    console.log(data)
    message.success(data)
  })
})

onBeforeUnmount(() => socket.value!.disconnect())
</script>

<template>
  <main>
    <NButton @click="handleSendMessage">发送信息</NButton>
  </main>
</template>
