<script setup lang="ts">
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

import type { MessageSchema } from '@/types'

const { t, locale } = useI18n<{ message: MessageSchema }>({})
const userStore = useUserStore()
const NMessage = useMessage()

const inputValue = ref('')

const isConnecting = ref(false)

const socket = ref<Socket>(
  io('/demo', {
    autoConnect: false // 禁止自动连接
  })
)

/**
 * 获取当前需要发送的信息
 * @param userMessage 用户消息
 */
const getSendInfo = (userMessage?: string) => ({
  id: userStore.user.id,
  username: userStore.user.username,
  ...(userMessage && { message: userMessage })
})

/**
 * 建立连接
 */
const handleConnect = () => {
  isConnecting.value = true
  socket.value.connect()
  socket.value.emit('join', getSendInfo())
}

/**
 * 断开连接
 */
const handleDisconnect = () => {
  socket.value.emit('leave', getSendInfo())
  socket.value.disconnect()
}

/**
 * 发送消息
 */
const handleSendMessage = () => {
  if (!socket.value.connected) {
    NMessage.error(t('TEMP.WebSocket.NotConnected'))
    return
  }
  if (!inputValue.value.trim()) {
    NMessage.error(t('TEMP.WebSocket.ContentIsEmpty'))
    return
  }
  socket.value.emit('message', getSendInfo(inputValue.value))
  NMessage.success(t('TEMP.WebSocket.SendSuccess'))
  inputValue.value = ''
}

onBeforeMount(() => {
  // 监听连接
  socket.value.on('connect', () => {
    isConnecting.value = false
    NMessage.info(t('TEMP.WebSocket.Established'))
  })
  // 监听断开连接
  socket.value.on('disconnect', () => NMessage.info(t('TEMP.WebSocket.Disconnected')))
  /**
   * NOTE: 服务端发送的信息为多语言 object，所以需要根据当前语言环境进行判断
   * 例如：
   * {
   *   zh_CN: 'xxx',
   *   en_US: 'xxx'
   * }
   */
  // 监听服务端发送的消息
  socket.value.on('message', (data) => NMessage.success(data[locale.value]))
  // 监听用户加入
  socket.value.on('join', (data) => NMessage.info(data[locale.value]))
  // 监听用户离开
  socket.value.on('leave', (data) => NMessage.info(data[locale.value]))
})

// 组件销毁时断开连接
onBeforeUnmount(() => handleDisconnect())
</script>

<template>
  <main>
    <NCard hoverable>
      <NBlockquote>{{ t('TEMP.WebSocket.Tip') }}</NBlockquote>
      <div class="flex flex-col space-y-3">
        <div class="flex items-center space-x-4">
          <NButton
            :type="socket.connected ? 'default' : 'primary'"
            :disabled="socket.connected"
            :loading="isConnecting"
            @click="handleConnect"
          >
            {{ t('TEMP.WebSocket.Establish') }}
          </NButton>
          <NButton
            secondary
            :type="socket.connected ? 'error' : 'default'"
            :disabled="socket.disconnected"
            @click="handleDisconnect"
          >
            {{ t('TEMP.WebSocket.Disconnect') }}
          </NButton>
        </div>
        <div class="flex items-center space-x-4">
          <NInput
            v-model:value="inputValue"
            type="text"
            clearable
            show-count
            maxlength="50"
            @keydown.enter="handleSendMessage"
          />
          <NButton
            :type="socket.connected ? 'success' : 'default'"
            :disabled="socket.disconnected"
            @click="handleSendMessage"
          >
            {{ t('TEMP.WebSocket.SendMessage') }}
          </NButton>
        </div>
      </div>
    </NCard>
  </main>
</template>
