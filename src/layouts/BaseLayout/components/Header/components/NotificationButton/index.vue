<script setup lang="ts">
import type { MessageSchema } from '@/types'
import NotificationIcon from '~icons/ic/baseline-notifications-none'

const { t } = useI18n<{ message: MessageSchema }>()

const userStore = useUserStore()
const NNotification = useNotification()

const messageCount = ref(0)
const list = ref<any>([])

const handleClickNotification = () => {
  if (list.value.length > 0) {
    list.value.forEach((item: any) => {
      setTimeout(() => {
        NNotification.success({
          title: '新的通知',
          content: item.message,
          duration: 1000
        })
        list.value = list.value.filter((i: any) => i.message !== item.message)
        messageCount.value -= 1
      }, 500)
    })
  }
}

onMounted(() => {
  const eventSource = new EventSource(`/base-api/sse/notification?userId=${userStore.user.id}`)
  eventSource.addEventListener('notification', ({ data, type }) => {
    console.log(data, type)
    if (type === 'notification') {
      messageCount.value += 1
      list.value.push(JSON.parse(data))
    }
  })
})
</script>

<template>
  <NPopover trigger="click">
    <template #trigger>
      <NTooltip
        placement="bottom"
        trigger="hover"
      >
        <template #trigger>
          <NIcon
            class="cursor-pointer"
            size="20"
            @click="handleClickNotification"
          >
            <NBadge
              :value="messageCount"
              type="default"
              processing
              show-zero
              class="!absolute -right-3 -top-2 scale-[0.7]"
            />
            <NotificationIcon />
          </NIcon>
        </template>
        {{ t('COMMON.NOTIFICATION') }}
      </NTooltip>
    </template>
  </NPopover>
</template>
