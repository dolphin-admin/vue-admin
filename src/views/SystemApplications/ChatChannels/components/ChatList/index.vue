<script setup lang="ts">
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

import type { MessageSchema } from '@/types'

const { t, locale } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })
const userStore = useUserStore()
const message = useMessage()

interface ChatListDataItem {
  name: string
  avatarUrl: string
  time: string
  emitData: string
}

const socket = ref<Socket>(
  io(`${GlobalEnvConfig.BASE_API_PROXY}/demo`, {
    autoConnect: false
  })
)

const emitData = ref('')

const chatListData = ref<ChatListDataItem[]>([])

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
  if (!emitData.value.trim()) {
    message.error(t('WebSocket.ContentIsEmpty'))
    return
  }
  socket.value.emit('message', getSendInfo(emitData.value))
  chatListData.value.push({
    name: userStore.user.username!,
    avatarUrl: userStore.user.avatarUrl!,
    time: TimeUtils.formatTime(new Date().getTime(), 'HH:mm:ss'),
    emitData: emitData.value
  })
  emitData.value = ''
}

onBeforeMount(() => {
  handleConnect()
  // 监听连接
  socket.value.on('connect', () => message.info(t('WebSocket.Established')))
  // 监听断开连接
  socket.value.on('disconnect', () => message.info(t('WebSocket.Disconnected')))
  // 监听服务端发送的消息
  socket.value.on('message', (data) => message.success(data[locale.value]))
})

// 组件销毁时断开连接
onBeforeUnmount(() => handleDisconnect())
</script>

<template>
  <div class="h-full w-full">
    <div class="flex h-[calc(100%-56px)] w-full flex-col space-y-2 px-2">
      <NScrollbar style="max-height: 100%">
        <div
          v-for="(item, index) in chatListData"
          :key="index"
          class="flex w-full"
        >
          <div class="h-14 w-14 shrink-0">
            <img
              class="cursor-pointer select-none rounded-full border"
              width="50"
              height="50"
              :src="item.avatarUrl"
              alt=""
              loading="eager"
            />
          </div>
          <div class="w-[calc(100%-56px)]">
            <span class="mr-1 inline-block text-sm">{{ item.name }}</span
            ><small>{{ item.time }}</small>
            <p class="break-words">
              {{ item.emitData }}
            </p>
          </div>
        </div>
      </NScrollbar>
    </div>
    <div class="absolute bottom-0 mt-2 w-[100%] p-2 dark:bg-black">
      <NInput
        v-model:value="emitData"
        clearable
        show-count
        size="large"
        @keydown.enter="handleSendMessage"
      ></NInput>
    </div>
  </div>
</template>
