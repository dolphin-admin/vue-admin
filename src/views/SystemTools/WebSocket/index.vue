<script setup lang="ts">
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

const userStore = useUserStore()
const message = useMessage()

const socket = ref<Socket>(
  io(`${GlobalEnvConfig.BASE_API_PROXY}/demo`, {
    autoConnect: false // 禁止自动连接
  })
)

/**
 * 建立连接
 */
const handleConnect = () => {
  socket.value.connect()
  socket.value.emit('join', `${userStore.user.username} 已建立连接`)
}

/**
 * 断开连接
 */
const handleDisconnect = () => {
  socket.value.emit('leave', `${userStore.user.username} 已断开连接`)
  socket.value.disconnect()
}

/**
 * 发送消息
 */
const handleSendMessage = () => {
  const sendMessage = `你好，我是${userStore.user.username}，我刚刚给你发送了一条信息`
  socket.value!.emit('message', sendMessage)
  message.success('您成功发送了一条消息')
}

onBeforeMount(() => {
  // 监听连接
  socket.value.on('connect', () => {
    message.success('已建立 socket 连接')
  })
  // 监听断开连接
  socket.value.on('disconnect', () => {
    message.success('已断开 socket 连接')
  })
  // 监听服务端发送的消息
  socket.value.on('message', (data) => {
    message.success(data)
  })
  // 监听用户加入
  socket.value.on('join', (data) => {
    message.success(data)
  })
  // 监听用户离开
  socket.value.on('leave', (data) => {
    message.success(data)
  })
})

// 组件销毁时断开连接
onBeforeUnmount(() => socket.value.disconnect())
</script>

<template>
  <main>
    <NCard hoverable>
      <div class="flex items-center space-x-4">
        <NButton
          :disabled="socket.connected"
          @click="handleConnect"
        >
          建立连接
        </NButton>
        <NButton
          :disabled="socket.disconnected"
          @click="handleDisconnect"
        >
          断开连接
        </NButton>
        <NButton
          :disabled="socket.disconnected"
          @click="handleSendMessage"
        >
          发送信息
        </NButton>
      </div>
    </NCard>
  </main>
</template>
